var express = require('express');
var router = express.Router();
const passport = require('passport')
const localStrategy = require('passport-local') 
const userModel = require('./users')
passport.use(new localStrategy(userModel.authenticate()))



router.get('/',function(req,res,next){
  res.redirect('/register')
})

//login routes
router.get('/login', function(req,res){
  res.render('login',{messages: req.flash()})
})

router.post('/login',passport.authenticate('local',{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true 
  
}),function(req,res){
});

//profile routes
router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile')
})

// register routes
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

//logout route
router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

//Auth check middleware for routes
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}


module.exports = router;
