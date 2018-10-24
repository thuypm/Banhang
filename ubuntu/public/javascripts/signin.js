
$("#button").click(function check(e) {
    e.preventDefault();
    $("#error").html(""); 
    $("#error").css({'padding':'0', 'border':'0'});
   

var username =$.trim($("#username").val());

var password = $.trim($("#password").val());



if(username == ""){
$("#error").html("Bạn chưa điền tên đăng nhập");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;
};



$("#error").html("");
if(password.length < 5){
$("#error").html("Mật khẩu tối thiểu 5 ký tự");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;
};
$("#error").css({ 'padding': '0', 'visibility': 'hidden;'})
$.ajax({
url: '/signin',
type: 'POST',
dataType: 'text',
data: {
   
    username: username,
    password: password,
    

},
success: function(result){
    if(result == 'admin' ) 
     location.replace('/admin')
     else if(result == 'user') location.replace('/')
     else {  $("#error").html("Sai tên TK hoặc MK"); 
     $("#error").css({ 'padding': '12', 'visibility': 'visible;'});return false ;}

    
}
})


});


