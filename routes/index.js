var express = require('express');
var router = express.Router();
const passport = require('passport')
const localStrategy = require('passport-local') 
const userModel = require('./users')
passport.use(new localStrategy(userModel.authenticate()))



router.get('/',function(req,res,next){
  res.send("This is the homepage")
})

router.post('/register',function(req,res,next){

})


module.exports = router;
