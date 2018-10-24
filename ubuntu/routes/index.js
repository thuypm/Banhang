var express = require('express');
var router = express.Router();
var helper = require('../app/helper/helper');
var userModel = require('../model/user');
var session =require('../app/helper/session')
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
  var getMess = userModel.getMess(req.session.user.username);
    getMess.then((obj) =>{
    res.render('index', { title: 'Express', user: req.session.user, message: obj});
  })
  }else
  res.render('index', { title: 'Express', user: req.session.user});
});

router.get('/*', function(req, res, next) {
  if(req.session.user){
    var getMess = userModel.getMess(req.session.user.username);
      getMess.then((obj) =>{
      res.send({user: req.session.user, message: obj});
    })
  };
  next();
});

router.get('/signin', function(req, res, next){
  if(req.session.user) res.redirect('/user')
  else
  res.render('signin', {title: 'Signin', user: req.session.user });
})
router.post('/signin', function(req,res,next){
  var user = req.body;
  let result = userModel.ktUser(user.username);
   result.then((data) => {   
     if(data != 0)
       {
        var value = data[0];  
     let st = helper.compare(user.password, value.password);
     st.then((val) =>{
       if (val) { req.session.user = value;
          session.save_ss(value);
           if(value.admin == '1') res.send('admin')
           else res.send('user')
     }
       else { res.send('0'); }
     
      })    
       }   
     else res.send('0')
   }
 
 )
 })
 router.get('/signout', (req,res,next) => {
  req.session.destroy(function(err) {
    res.redirect('/'); })
 })

router.get('/signup', function(req,res,next){
  if(req.session.user) res.redirect('/user')
  else
  res.render('signup', {title: 'signup',  user: req.session.user})
})
router.get('/chat', function(req,res,next){
  if(req.session.user) res.redirect('/user')
  else
  res.render('chat', {title: 'signup',  user: req.session.user})
})

router.post('/signup', function(req, res,next){
  var data = req.body;
  let rs = userModel.ktUser(data.username);
  rs.then((kq) => {
    if(kq  != 0)
      res.send('Username đã tồn tại')
      else {
        userModel.ktEmail(data.email).then((test)=> {
          if(test != 0) 
          res.send('Email đã được sử dụng')
          else{
         
          var passwd = helper.hashPass(data.password);
            data = { email: data.email,
              username: data.username,
              password: passwd,
              name: data.name,
              phone: data.phone,
              email: data.email,
              adress: data.name,  
              };
              userModel.addUser(data).then((kq) =>{
                res.send('ok');
              });  
          }
        })
      }
    
  }) 
})

module.exports = router;
