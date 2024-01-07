var express = require('express');
var router = express.Router();
const passport = require('passport')
const localStrategy = require('passport-local') 
const userModel = require('./users')
passport.use(new localStrategy(userModel.authenticate()))



router.get('/',function(req,res,next){
  res.send("This is the homepage")
})

router.get('/login', function(req,res){
  res.render('login')
})

router.post('/login',passport.authenticate('local',{
  successRedirect: "/profile",
  failureRedirect: "/login",
  // failureFlash: true   // not implemented flash for now
}),function(req,res){
});

router.get('/profile', function(req,res){
  res.render('profile')
})

router.get('/register', function(req,res){
  res.render('register')
})
router.post('/register', function(req,res){
  const {username,email,fullname} = req.body;
  let userData = userModel({username,email,fullname});
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})

router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
