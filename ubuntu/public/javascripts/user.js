

var anhbia = $('.card-user > .image').html();
var avatar = $('.content > .author > img').html();

$('.card-user > .image').hover(function(){
 if(!$('#upload').val())
    $(this).html('<input type="file" id="upload"></input>')
    else   $("#set").show();
},function(){
    if ($('#upload').val() == 0)
    { $("#set").hide(); $(this).html(anhbia) } 
    else $("#set").show()
} );


$('#set').on('click', function(e){
    e.preventDefault();
   var file_data = $('#upload').prop('files')[0];
   var checkImg = file_data.type == 'image/png' || file_data.type == 'image/jpg' || file_data.type == 'image/gif' || file_data.type == 'image/jpeg';
   if(checkImg == false){
       $("#img_error").html("Ảnh ko đúng định dạng");
       return false;
   }
   $("#img_error").html("");  
   var form_data = new FormData();
   form_data.append('img', file_data);
   $.ajax ({  url: '/user/set',
   type: 'POST',
   cache: false,
   contentType: false,
   processData: false,
   data: form_data,               
   success: function(res){
       if(res== 'ok'){
           alert('thành công');
           location.reload();
       }
   }
   })
   });

  
$('#update').on('click', function(e){
    e.preventDefault();
    var name =($("#name").val()).trim();
    var username =($("#username").val()).trim();
    var email = ($("#email").val()).trim();
    var password = ($("#password").val()).trim();
    var adress = ($("#adress").val()).trim();
    var phone = ($("#phone").val()).trim();
   
     
    if (name == "") 
    {   $("#error").css({ 'padding': '12', 'visibility': 'visible;'})
        $('#error').html('Bạn ko có tên à ?');
    return false;}
     
    if (email == "") 
    {$("#error").css({ 'padding': '12', 'visibility': 'visible;'})
    $('#error').html('Mail đâu, mất nick chết bà');
    return false;}
    if (password.length < 5) 
    {   $("#error").css({ 'padding': '12', 'visibility': 'visible;'})
        $('#error').html('Nhập pass >= 5 ký tự vào'); return false;}
    
    var update = {
        username:username,
        name: name,
        email: email,
        password: password,
        adress: adress,
        phone: phone
    }

    $.ajax({
        url: '/user/update',
        type: 'POST',
        dataType: 'text',
        data: update,               
        success: function(res){
            if(res == 'wrongpass') 
            {
                $("#error").css({ 'padding': '12', 'visibility': 'visible;'});
                $('#error').html('Sai mật khẩu');     return false;
            };
        
            if(res == 'emailexist') 
            {
                $("#error").css({ 'padding': '12', 'visibility': 'visible;'});
                $('#error').html('Email đã được sử dụng');     return false;
            };
            if(res == 'nochange') 
            {
                $("#error").css({ 'padding': '12', 'visibility': 'visible;'});
                $('#error').html('bạn ko thay đổi gì');     return false;
            };
            $("#error").css({ 'padding': '0', 'visibility': 'hidden;'});
            $('#error').html('');  
             alert('Thay đổi thành công');
        }
    })

})
