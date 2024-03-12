const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  
  getallbooks.then((successMessage) => {
    res.send(successMessage);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  getBookByISBN(isbn).then((successMessage) => {
    res.send(successMessage);
  })
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const author = req.params.author;
  getBookByAuthor(author).then((successMessage) => {
    res.send(successMessage);
  })
    //res.send(JSON.stringify(books[author],null,4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;
  getBookByTitle(title).then((successMessage) => {
    res.send(successMessage);
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

public_users.post("/",function (req,res){
    if (req.body.review){
        books[req.body.isbn] = {
            "reviews":req.body.review
            }
    }
res.send("The review for isbn:" + (' ')+ (req.body.isbn) + " Has been added!");
});

public_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (isbn){
        delete books[isbn]
    }
    res.send(`Book Review for ISBN :  ${isbn} deleted.`);
  });

  let getallbooks = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4))
    },6000)})

var getBookByISBN = function (ISBN) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            //const isbn = req.params.isbn;
            resolve(JSON.stringify(books[ISBN],null,4))
            //resolve(JSON.stringify(books,null,4))
        },6000)
    });
    };

var getBookByAuthor= function (author) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let filtered_book = Object.values(books).filter((book) => book.author === author);
            resolve(filtered_book)
        },6000)
    });
    };

var getBookByTitle= function (title) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let filtered_book = Object.values(books).filter((book) => book.title === title);
            resolve(filtered_book)
        },6000)
    });
    };

module.exports.general = public_users;
