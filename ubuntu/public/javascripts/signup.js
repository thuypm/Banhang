

$("#button").click(function check(e) {
	e.preventDefault();
var email =$.trim($("#email").val());
var username =$.trim($("#username").val());
var name =$.trim($("#name").val()); 
var password = $.trim($("#password").val());
var repass =$.trim($("#repass").val());
var adress =$.trim($("#adress").val());
var phone =$.trim($("#phone").val());
var capcha =$.trim($("#capcha").val());

$("#error").html("");
if(username == ""){
	$("#error").html("Bạn chưa điền tên đăng nhập");
	$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
	return false;
	};
if(email == ""){
$("#error").html("Bạn chưa điền email");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;
};


if(name == ""){
$("#error").html("Bạn chưa điền tên của bạn");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;
};


$("#error").html("");
if(password.length < 5){
$("#error").html("Mật khẩu tối thiểu 5 ký tự");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;

};
if(repass != password){
$("#error").html("Nhập lại mật khẩu không đúng");
$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
return false;
};
$("#error").css({ 'padding': '0', 'visibility': 'hidden;'})
$.ajax({
url: '/signup',
type: 'POST',
dataType: 'text',
data: {
	email: email,
	username: username,
	password: password,
	name: name,
	adress:adress,
	phone:phone

},
success: function(result){
	if(result != 'ok' ) 

	{
		$("#error").html(result);
		$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
	}

  else {
	$("#error").css({ 'padding': '0', 'visibility': 'hidden;'})
		location.replace('/signin');
		alert('Đăng ký thành công, bây giờ hãy đăng nhập'); }
	
	
}
})


});


