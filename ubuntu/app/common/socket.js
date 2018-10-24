module.exports = function(io) {
    var session = require('../helper/session');
    var userModel = require('../../model/user');
var client = (io.sockets.clients()).connected;
io.sockets.on('connection', function(socket){

socket.on('get_connect', function(username){
        var ss = session.get_ss(username);
        socket.ss = ss;
        if(ss.admin == 1){
            let get = userModel.getUser();
            get.then((us)=>{
                socket.emit('get_Us',us)
            });
         };
    });

    
    socket.on('select', function(username){
        let get =userModel.getMess(username);
        get.then((val)=>{
            socket.emit('re_select',username, val);
        })
    });

  socket.on('send_mess', function(message, username){
      if(socket.ss.admin != true){ //nếu client éo phải admin
        username = socket.ss.username;
        var obj = {body: message,username:socket.ss.username, fr:socket.ss.username, to:'admin' };
        let save = userModel.saveMess(obj);
        for(sk in client){
            
            if(client[sk].ss.admin == true){ // gửi tới tất cả thằng admin
            io.to(client[sk].id).emit('ib_mess' , message, username)
            };
            if(client[sk].ss.username == socket.ss.username){// gửi tất cả client có username giống client
                io.to(client[sk].id).emit('my_mess', message, username)
            }
        }
      }else{
        var obj = {body: message,username:username, fr:'admin', to:username };
        let save = userModel.saveMess(obj);
       
        for(sk in client){
            
            if(client[sk].ss.admin == true){
                io.to(client[sk].id).emit('my_mess', message, username)
            };
            if(client[sk].ss.username == username){
                io.to(client[sk].id).emit('ib_mess' ,message)
            }
        }
      };    
  });

  socket.on('typing', function(username, status){
    if(socket.ss.admin != true){ //nếu client éo phải admin
        
        for(sk in client){
            if(client[sk].ss.admin == true){ // gửi tới tất cả thằng admin
            io.to(client[sk].id).emit('typing',username, status)
            };
        }
      }else{
       
        for(sk in client){ 
            if(client[sk].ss.username == username){
                io.to(client[sk].id).emit('typing', status)
            }
        }
      };
  })
 
})

}