var express = require('express');
var router = express.Router();
var userModel = require('../model/user');


router.get('/*', function(req,res,next){
    if(req.session.user){
        if(req.session.user.admin==0)
            res.redirect('/user')
        else next();
    }
    else res.redirect('/signin')
})
router.get('/', function(req,res,next){
    res.render('admin/admin', { user: req.session.user,page:'admin'})
})
router.get('/inbox', function(req,res,next){
  
    res.render('admin/inbox', { user: req.session.user, page:'inbox'})
})



module.exports = router;