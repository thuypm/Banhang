var db = require('../app/common/database.js');
var q = require('q');
var conn = db.getConnection();
 function ktUser(user){
     if(user)
     {
            let defer = q.defer();
            conn.query('SELECT *  FROM user WHERE username = ?', user, function(error, result){
                    if(error) defer.reject(error)
                    else defer.resolve(result)
            })
            return defer.promise;
    } return false;
 }
 function ktEmail(user){
     if(user)
     {
            let defer = q.defer();
            conn.query('SELECT *  FROM user WHERE email = ?', user, function(error, result){
                    if(error) defer.reject(error)
                    else defer.resolve(result)
            })
            return defer.promise;
    } return false;
 }
 function addUser(user){
        if(user)
        {
               let defer = q.defer();
               conn.query('INSERT INTO user SET  ?', user, function(error, result){
                       if(error) defer.reject(error)
                       else defer.resolve(result)
               })
               return defer.promise;
       } return false;
    }

function updateImg(data){
        if(data){
                
                let defer = q.defer();
                 
                conn.query('UPDATE user SET img = ?  WHERE username = ?', [(data.img),(data.username) ], function(error, result){
                        if(error) defer.reject(error)
                        else defer.resolve(result)
                })
                return defer.promise;
        } return false;
     }

function update(data){
        if(data){
                
                let defer = q.defer();
                conn.query('UPDATE user SET  email = ?, name = ?, adress= ?,  phone = ?   WHERE username = ?',
                [(data.email),(data.name),(data.adress),(data.phone), (data.username)], function(error, result){
                        if(error) defer.reject(error)
                        else defer.resolve(result)
                })
                return defer.promise;
        } return false;
     }
function getMess(username){
        if(username)
        {
               let defer = q.defer();
               conn.query('SELECT *  FROM message WHERE username = ?', username, function(error, result){
                       if(error) defer.reject(error)
                       else defer.resolve(result)
               })
               return defer.promise;
       } return false;
}
function saveMess(obj){
        if(obj)
        {
               let defer = q.defer();
               conn.query('INSERT INTO message SET  ?', obj, function(error, result){
                       if(error) defer.reject(error)
                       else defer.resolve(result)
               })
               return defer.promise;
       } return false;
}
function getUser(){
        let defer = q.defer();
        conn.query('SELECT *  FROM user', function(error, result){
                if(error) defer.reject(error)
                else defer.resolve(result)
        })
        return defer.promise;
}
    module.exports = {
        addUser: addUser,
        ktEmail: ktEmail,
        ktUser: ktUser,
        updateImg: updateImg,
        update:update,
        getMess: getMess,
        saveMess: saveMess,
        getUser:getUser
    }