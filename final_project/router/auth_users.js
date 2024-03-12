const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let usercheck = users.filter((user)=>{
    return user.username === username
  });
  let passowrdcheck = users.filter((user)=>{
    return user.password === password
  });
  if(usercheck.length > 0 && passowrdcheck.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    /*let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }*/
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let review = req.body.review;
        //Add similarly for firstName
        //Add similarly for lastName
        //if DOB the DOB has been changed, update the DOB 
        if(review) {
            books["reviews"] = review;
            res.send(`Book Review is added.`);
        }else {
            books["reviews"]=review;
            res.send(`Friend with the email  ${email} updated.`);
        }
        //Add similarly for firstName
        //Add similarly for lastName
        
    }
    else{
        res.send("Unable to find book!");
    }
});

regd_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

  const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
