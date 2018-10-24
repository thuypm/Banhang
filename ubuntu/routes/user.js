var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var helper = require('../app/helper/helper');
/* GET users listing. */
router.get('/*', function(req, res, next){
  if(req.session.user == undefined)
    res.redirect('/signin')
   else next()
})
router.get('/:page', function(req,res,next){
  var page = req.params.page;
  res.render(('user/' + page ), { page: page, user: req.session.user })
})

router.post('/set', function(req,res,next){
 var duoianh =  req.files.img.mimetype.slice( req.files.img.mimetype.lastIndexOf('/')+1);
 var tenanh = (req.session.user.username + '.' + duoianh ); 
 req.files.img.mv(('public/images/user/' + tenanh), function(err){
  if(!req.session.user.img) userModel.updateImg(req.session.user);
   if(!err) {
     if(!req.session.user.img) {
       userModel.updateImg({img:tenanh,username: req.session.user.username }); 
       req.session.user.img = tenanh;
       };
      res.send('ok');
   }})
})
router.post('/update',function(req,res,next){
var data = req.body;
function update(data){
  userModel.update(data).then((result)=>
  { req.session.user.name =  data.name ;
   req.session.user.email =  data.email ;
   req.session.user.phone =  data.phone ;
   req.session.user.adress =  data.adress ;

  res.send('ok');
  });
};

let st = helper.compare(data.password, req.session.user.password);
st.then((val) =>{
  if(val == false)
  res.send('wrongpass')
  else{       
          let check = (data.name != req.session.user.name) || (data.email != req.session.user.email)|| (data.adress != req.session.user.adress)|| (data.phone != req.session.user.phone);
          if(check == true) 
        { 
          if(data.email != req.session.user.email)
          {
            userModel.ktEmail(data.email).then((result)=>{
              if(result != 0)
              {
               res.send('emailexist');
              } update(data) 
            })
      
          }update(data)
        } else res.send('nochange')
        }
      

})
});

module.exports = router;
