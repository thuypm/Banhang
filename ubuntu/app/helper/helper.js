var bcrypt = require('bcryptjs');
var config = require('config');
 function hashPass(password){
    var  saltRounds = config.get("salt");
    var salt =  bcrypt.genSaltSync(saltRounds);
    var hash =  bcrypt.hashSync(password, salt);
    return hash;
 };
 function compare(password, hash){
    return bcrypt.compare(password, hash);
 }
 module.exports = {
     hashPass: hashPass,
     compare: compare
 }