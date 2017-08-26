var express = require('express');
var router = express.Router();

const User = require('../model/user');

// add jwt helper
const jwt = require('../helper/jwtHelper');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const generateSalt = require('../helper/generateAlphaNumeric');
const convertPass = require('../helper/convertPass');

router.post('/signup', (req,res)=>{
  var secretKeyLength = process.env.SECRET_LENGTH;
  generateSalt(secretKeyLength,(secret)=>{
    pass = {
      pass: `${req.body.password}`,
      secret: `${secret}`
    }
    convertPass(pass,(hash)=>{
      var add = {
        username : `${req.body.username}`,
        password : `${hash}`,
        email : `${req.body.email}`,
        secret: `${secret}`
      }
      User.create(add)
      .then((response)=> {
        res.send(response)
      })
      .catch((error)=>{
        res.send(error)
      })
    })
  })
})


//var jwt = require('jsonwebtoken');

router.post('/signin', (req,res)=>{
  var secretKeyLength = process.env.SECRET_LENGTH;
  let query = {username: req.body.username}
  User.find(query)
  .then((document)=>{
    pass = {
      pass: req.body.password,
      secret: document[0].secret
    }
    convertPass(pass, (hash)=>{
      if (hash === document[0].password) {
        payload = {
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
})

module.exports = router;
