
const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users},null,4));
  //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const email = req.params.email;
  let filtered_users = users.filter((user)=>user.email === email);
  res.send(filtered_users);

  
});

router.get("/:lastName", (req,res)=>{
    const lastName = req.params.lastName;
    let filtered_users = users.filter((user) => user.lastName === lastName);
    res.send(filtered_users);
});

function getDateFromString(strDate){
    let [dd,mm,yyyy] = strDate.split('=');
    return new Date(yyyy+"/"+mm+"/"+dd);
}
//sort users by date of birth
router.get("/:sort", (req,res) => {

    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
            return d1-d2;

    });
    res.send(sorted_users);
});
// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
     users.push({
        "firstName":req.query.firstName,
        "lastName":req.query.lastName,
        "email":req.query.email,
        "DOB":req.query.DOB
     });
     res.send("The user"+ (' ')+ (req.query.firstName)+" Has beem added");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
    const email = req.params.email;
    //find the user and connect to the email
    let filtered_users = users.filter((user) => user.email === email);
   //if the user exist
    if (filtered_users.length > 0){
        let filtered_user = filtered_users[0];
        //request the JSON file updated
        let DOB = req.query.DOB;
        let email = req.query.email;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        //if DOB has changed
        if(DOB){
            filtered_user.DOB = DOB
        }
        //if other things  has changed

        if(firstName){
            filtered_user.firstName = firstName;

        }
        if(lastName){
            filtered_user.lastName = lastName;
        }
        users = users.filter((user)=> user.email != email);
        users.push(filtered_user);
        res.send('User with the email +'+ email +'updated');
    }
    else{
        res.send("unable to find user");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
    
    const email = req.params.email; 
    users = users.filter((user) => user.email != email);
    res.send('User with the email ${email} deleted');

});

module.exports=router;
