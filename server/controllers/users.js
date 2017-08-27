'use strict'

// require models
const User = require('../model/user');

// require helper
const generateSalt = require('../helper/generateAlphaNumeric');
const convertPass = require('../helper/convertPass');

// require helper
const jwt = require('../helper/jwtHelper');


exports.signup = (req,res) =>{
  console.log('body',req.body);
  var secretKeyLength = process.env.SECRET_LENGTH;
  generateSalt(secretKeyLength,(secret)=>{
    var passRaw = {
      pass: `${req.body.password}`,
      secret: `${secret}`
    }
    convertPass(passRaw,(hash)=>{
      var add = {
        username : `${req.body.username}`,
        password : `${hash}`,
        email : `${req.body.email}`,
        secret: `${secret}`
      }
      User.create(add)
      .then((response)=> {
        var success = {
          "success": {},
          "message": `Register username ${response.username} success`
        }
        res.send(success)
      })
      .catch((error)=>{
        res.send(error)
      })
    })
  })
}

exports.signin = (req,res)=>{
  var secretKeyLength = process.env.SECRET_LENGTH;
  let query = {username: `${req.body.username}`}
  console.log(query);
  User.find(query)
  .then((document)=>{
    var passRaw = {
      pass: req.body.password,
      secret: document[0].secret
    }
    convertPass(passRaw, (hash)=>{
      if (hash === document[0].password) {
        var payload = {
          id: `${document[0]._id}`,
          username: `${document[0].username}`,
          email: `${document[0].email}`
        }
        jwt.login(payload,(token)=>{
          var success = {
            "success": {},
            "message": "Login success",
            "token": token
          }
          res.send(success)
        })
      } else {
        var error =  {
          "errors": {},
          "_message": "Password wrong",
          "message": "Password wrong",
          "name": "ValidationError"
        }
        res.send(error)
      }
    })
  })
  .catch((error)=>{
    var error =  {
      "errors": {},
      "_message": "Cannot find user",
      "message": "Cannot find user",
      "name": "ValidationError"
    }
    res.send(error)
  })
}
