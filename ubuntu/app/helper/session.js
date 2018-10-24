var session = {};

function save_ss(val){
    session[val.username] = val
  
};

function  get_ss(val){
    if(session){
        return session[val];
     }
     return 0;
  
    
}
module.exports ={
    save_ss: save_ss,
    get_ss: get_ss
}