var socket = io("http://localhost:3000/");
socket.on('get_Us', function(us){
	us.forEach((i)=>{
		if(i.admin == 0){
			$('.inbox_chat').append('<div class="chat_list" id="'+i.username+ '">'+
			'<a href="#" ><div class="chat_people" >'+
				 '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
				 '<div class="chat_ib" >'+
					 '<h5>'+ i.username+ '<span class="chat_date">Dec 25</span></h5>'+
					 '<p></p>'+
				 '</div>'+
				 '</div>'+
			 '</a>'+
			 '</div>')
		}
	
	});
$('.chat_list').on('click', function(e){

		var username =$(this).attr('id');

		socket.emit('select', username);
	})
})
socket.on('re_select', function(username, mess){
	$('.active_chat').removeClass('active_chat');
	$('#'+ username).addClass('active_chat');
	$('.msg_history').html("");
	mess.forEach((i)=>{
		if(i.fr == username){
			$('.msg_history').append(' <div class="incoming_msg">'+
			'<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
			'<div class="received_msg">'+
			  '<div class="received_withd_msg">'+
				'<p>'+i.body+'</p>'+
				'<span class="time_date"> 11:01 AM    |    June 9</span></div></div> </div>')
		}else{
			$('.msg_history').append(' <div class="outgoing_msg">'+
			'<div class="sent_msg">'+
			  '<p>'+i.body+'</p><span class="time_date"> 11:01 AM    |    June 9</span> </div> </div>')
		}
	});

$('.msg_history').scrollTop( $('.msg_history')[0].scrollHeight);

})
socket.on('ib_mess', function(message, username){
	if(($('#'+ username).length) == 0){
		$('.inbox_chat').append('<div class="chat_list" id="'+username+ '">'+
			'<a href="#" ><div class="chat_people" >'+
				 '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
				 '<div class="chat_ib" >'+
					 '<h5>'+ username+ '<span class="chat_date">Dec 25</span></h5>'+
					 '<p></p>'+
				 '</div>'+
				 '</div>'+
			 '</a>'+
			 '</div>')
			 
	}	;
	if($('.active_chat').attr('id') == username){
	$('.msg_history').append('<div class="incoming_msg">'+
	'<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
	'<div class="received_msg">'+
	  '<div class="received_withd_msg">'+
		'<p>'+message+'</p>'+
		'<span class="time_date"> 11:01 AM    |    June 9</span></div></div> </div>')
		$('.msg_history').scrollTop( $('.msg_history')[0].scrollHeight);}
		else {
			$('#'+ username+ '>a> div > .chat_ib>p').html(message);
		}
})

socket.on('my_mess', function(message){
	$('.msg_history').append(' <div class="outgoing_msg">'+
			'<div class="sent_msg">'+
			  '<p>'+message+'</p><span class="time_date"> 11:01 AM    |    June 9</span> </div> </div>')
			  $('.msg_history').scrollTop( $('.msg_history')[0].scrollHeight);
})

$('#input').keypress(function(event){
    if (event.keyCode == 13 || event.which == 13){
        event.preventDefault();
		var message = $('#input').val();
		var username = $('.active_chat').attr('id');
        $('#input').val('');
        if(message.trim() != '')
        socket.emit('send_mess',message, username);
	}}); 
function timeoutFunction(){
	// không nhập tin nhắn nữa
		socket.emit("typing",($('.active_chat').attr('id')), false);
	}
	$('#input').keyup(function() {
		//ấn phím nhập tin nhắn
		socket.emit('typing', ($('.active_chat').attr('id')), 'typing');
		if(timeout)
		clearTimeout(timeout);// huỷ hàm ko nhập
		var timeout = setTimeout(timeoutFunction, 3000);
	});
	socket.on('typing', function(username, status) {
		if(status){
		if(username== $('.active_chat').attr('id')){
			
			if($('.typing').length == 0){
				$('.msg_history').append(' <div class="incoming_msg typing">'+
				'<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>'+
				'<div class="received_msg">'+
				  '<div class="received_withd_msg">'+
					'<img src="/images/typing.gif">')
					$('.msg_history').scrollTop( $('.msg_history')[0].scrollHeight);
				}
			}
		}else{
			
			$('div .typing').remove();
		}
	});	