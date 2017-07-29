
(function( window ) {
"use strict";
var $ = function( callback ) {
registerOrRunCallback( callback );
bindReady();
},

document = window.document,
readyBound = false,
callbackQueue = [],
registerOrRunCallback = function( callback ) {
if ( typeof callback === "function" ) {
callbackQueue.push(callback);
}
},
DOMReadyCallback = function() {
while( callbackQueue.length ) {
(callbackQueue.shift())();
}
registerOrRunCallback = function( callback ) {
callback();
};
},

DOMContentLoaded = function() {
if ( document.addEventListener ) {
document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
} else {

document.detachEvent( "onreadystatechange", DOMContentLoaded );
}
DOMReady();
},

DOMReady = function() {

if ( !$.isReady ) {
if ( !document.body ) {
return setTimeout( DOMReady, 1 );
}

$.isReady = true;
DOMReadyCallback();

}
},
bindReady = function() {
var toplevel = false;
if ( readyBound ) {
return;
}
readyBound = true;
if ( document.readyState !== "loading" ) {
DOMReady();
}
if ( document.addEventListener ) {
document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
window.addEventListener( "load", DOMContentLoaded, false );
} else if ( document.attachEvent ) {
document.attachEvent( "onreadystatechange", DOMContentLoaded );
window.attachEvent( "onload", DOMContentLoaded );
try {
toplevel = window.frameElement == null;
} catch (e) {}
if ( document.documentElement.doScroll && toplevel ) {
doScrollCheck();
}
}
},
doScrollCheck = function() {
if ( $.isReady ) {
return;
}
try {
document.documentElement.doScroll("left");
} catch ( error ) {
setTimeout( doScrollCheck, 1 );
return;
}
DOMReady();
};
$.isReady = false;
window.$ = $;
})( window );

function getAjax(){
  var httpRequest;
  try {
    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      httpRequest = false;
    }
  }
  if (!httpRequest && typeof XMLHttpRequest!='undefined') {
  	httpRequest = new XMLHttpRequest();
   
  }
  return httpRequest;
}

function textarea_size($target) {

$target.onkeyup = function () {
	if (1) {
		$target.style.height = "auto";
	}
	$target.style.height = this.scrollHeight + "px";
};
$target.onscroll = function () {
	this.scrollTop = 0;
};


}


function postForm( url, postdata, func) {
		
		var ajaxReq = new getAjax();
		
		// if (progress==1) {
		// 	$progress=document.getElementsByClassName('progress');

		// 	ajaxReq.upload.onprogress = function(event) {
		// 		console.log(event.loaded, event.total);				
		// 		console.log($progress.length);
		// 		Id('prog1').value = event.loaded / event.total * 100;
		// 		for (var i = 0; i < $progress.length; i++) {
		// 			console.log($progress[i]);
		// 			$progress[i].value = event.loaded / event.total * 100;
		// 		}
				
		// 	}
		// }

		// ajaxReq.upload.onprogress = function (event) {
		// 	console.log('Загружено ' + event.loaded + ' байт из '+ event.total);
		// 	console.log(event.loaded / event.total * 100);
		//   }
		ajaxReq.open("POST", url, true);
		ajaxReq.send(postdata);
		ajaxReq.onreadystatechange = function() {
		if (ajaxReq.readyState == 4) {
			if(ajaxReq.status == 200) {
					func(ajaxReq.responseText);
					}
			}
		}

}

function Post(url, params, whattado) { 
	var ajaxReq = getAjax();
		ajaxReq.open("POST", url, true);
		ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		ajaxReq.send(params);

	ajaxReq.onreadystatechange = function() { 
		if (ajaxReq.readyState == 4) {
			if(ajaxReq.status == 200) {
				whattado(ajaxReq.responseText);
				//ajaxReq.onload = onLoad()
				}
			}
		};
	};


function Get(url, whattado, initEvent) {
	var ajaxGet = getAjax();

ajaxGet.open("GET", url, true);

	ajaxGet.onreadystatechange = function() { 		
		if (ajaxGet.readyState == 4) {
			if(ajaxGet.status == 200) {
				whattado(ajaxGet.responseText);

					if(initEvent!=0){
						
						if (initEvent==1) {
							ajaxGet.onload = onLoad();
						} else initEvent;
					
					};
				}
			}
		};
		ajaxGet.send(null);
	};

function Load( url, element_id, initEvent) {
	
	var $element = document.getElementById(element_id);
	var $section = document.getElementById('section');
	if (element_id != "smBody"){
	//$section.classList.add('loading');
	} 	
			Get(url, function(src){//запрашиваем данные с сервера
				$data = JSON.parse(src);
				console.log($data.url);				
				console.log($data.url=='/access_denied');				
				if ($data.url=='/access_denied') {
					console.log($data.url);	
					//Load($data.url+'?ajax=1', 'content');
					history.pushState(null,null,$data.url);
					Load($data.url+'?ajax=1', 'content');
				} else 
				$element.innerHTML = $data.content;
				 // setTimeout(function() {
			 	//  		$section.classList.remove('loading');
			 	//  	 } , 500);
				 // if (element_id == "smBody"){
					// resizeModal();
					// } 
				}, initEvent);			
};

function past_load( url, element_id) {
	var $element = document.getElementById(element_id);
	// var $section = document.getElementById('section');
		
			Get(url, function(src){//запрашиваем данные с сервера
				$data = JSON.parse(src);
				$element.insertAdjacentHTML('afterend', $data.content);
				
				 // setTimeout(function() {
			 	//  		$section.classList.remove('loading');
			 	//  	 } , 500);
				 // if (element_id == "smBody"){
					// resizeModal();
					// } 
				}, 0);			
};


var $linkA='', myScroll=[];; 

function onLoad(e) {
	$forms = document.getElementsByTagName('form');
	$tagsA = $bodycontent.getElementsByTagName('a');
	if ($forms.length>0){
		// console.log('форм найдено:',$forms.length);
		// formSubmit();
	};
	if ($tagsA.length>0){
		//console.log('ссылок с тэгом а найдено:',$tagsA.length);
		// linkAClick($tagsA);
	};
	console.log('onLoad');
	matrix();
	// triangle(); 
	paralax();
	collage();
	 datepickr('#datepicker', { dateFormat: 'd.m.Y'});
	$intro();
	if ( (window.location.pathname.replace(/\/{1,}/g,''))==="profit") {
	count_fr();
	friends_position();
	}
	// if (Id('album_wrap')) {
	// 	album_heigh();
	// }

	
if (Id("cropper")) {
	cropper();
	
}

	//proportionalSized();
 // delegatEvent();
 // console.log(e);
};

$intro = function () {
	console.log( window.innerHeight);
if (Id('intro')) {	
	Id('intro').style.height = window.innerHeight - 45+'px';
}
}



function collage(){
	if(Id('collage')){
		$wrapper_width = Id('photoset').offsetWidth;
		$cover_imgs=Id('collage').getElementsByTagName("img");
		$count = $cover_imgs.length;
		

		
		if ($count%2==0){
			if ($count<=4) {
				for (var i=0; i<$count; i++){
					$cover_imgs[i].style.width = $wrapper_width/$cover_imgs.length+"px";
				}
			}
		} else {
			for (var i=0; i<$count; i++){
					$cover_imgs[i].parentNode.style.width = $wrapper_width/$cover_imgs.length+"px";
					$cover_imgs[i].parentNode.style.height = $wrapper_width/$cover_imgs.length+"px";
					if (i==4) {
					$cover_imgs[i].parentNode.style.width = $wrapper_width/$cover_imgs.length*2+"px";
					$cover_imgs[i].parentNode.style.height = $wrapper_width/$cover_imgs.length*2+"px";
					}
				}
		}
		
		console.log($cover_imgs.length);

	}
}



function setCooki(){
};

function matrix(){
var divs = document.getElementsByClassName('matr');
for (var s = 0; s < divs.length; s++) {

	var $childDivs =  divs[s].children, delta = Math.PI * 2 / ($childDivs.length-1);
	var x = 0, y = 0, angle = 0;
	// console.log($childDivs);
	// var d = new Date;
	for (var i = 0; i < $childDivs.length; i++) {
	    if(i<=5){
	    $childDivs[i].style.position = 'absolute';
	    // console.log(100 * Math.cos(angle)+110);
	    $childDivs[i].style.left =   Math.round(100 * Math.cos(angle) + (150-$childDivs[i].offsetWidth/2))+'px';
	    $childDivs[i].style.top = Math.round(100 * Math.sin(angle) + (150-$childDivs[i].offsetHeight/2))+'px';
	    angle += delta;
		};	    
	    if (i>=6){
	    	// console.log($childDivs[i].offsetHeight);
	    	$childDivs[i].style.position = 'absolute';
	    	$childDivs[i].style.left =  (divs[s].offsetWidth/2) -  ($childDivs[i].offsetWidth/2) + 'px';
	    	$childDivs[i].style.top = (divs[s].offsetHeight/2) -($childDivs[i].offsetHeight/2)  + 'px';		 
	    }	
	}
}
};
function triangle(){
var divs = document.getElementsByClassName('triangleFrax');
for (var s = 0; s < divs.length; s++) {
	var $childDivs =  divs[s].children, delta = Math.PI * 2 / ($childDivs.length-1);
	var x = 0, y = 0, angle = 0;
	for (var i = 0; i < $childDivs.length; i++) {
	    if(i<=5){
	    $childDivs[i].style.position = 'absolute';
	    // console.log(100 * Math.cos(angle)+110);
	    $childDivs[i].style.left =   Math.round(100 * Math.sin(angle) + (150-$childDivs[i].offsetWidth/2))+'px';
	    $childDivs[i].style.top = Math.round(100 * Math.cos(angle) + (150-$childDivs[i].offsetHeight/2))+'px';
		angle += delta;
		};	    
	    if (i>=6){
	    	// console.log($childDivs[i].offsetHeight);
	    	$childDivs[i].style.position = 'absolute';
	    	$childDivs[i].style.left =  (divs[s].offsetWidth/2) -  ($childDivs[i].offsetWidth/2) + 'px';
	    	$childDivs[i].style.top = (divs[s].offsetHeight/2) -($childDivs[i].offsetHeight/2)  + 'px';
		   }
	    // console.log("i=", i, new Date - d+'мс');
	}
}
};


function supports_html5_storage(){
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
    return false;
  }
};


function findChildrenOpened (tr) {
	var $level = tr.dataset.level, $trchld = tr.nextSibling;
	while ($trchld!=null && $trchld.dataset.level > $level  ) {
		if (!$trchld.classList.contains('closed')) {
		$trchld.classList.add('closed');
				} else if ($trchld.classList.contains('closed')) {
		$trchld.classList.remove('closed');
		}
		$trchld = $trchld.nextSibling;
	};
};



function ajax_sumbit(target){
	$form = parent(target, 'form');
	// $added_data = null;
	// $form=parent($input, 'form');
	// $input_value = $input.value;
	console.log($form);
	$form_data = new FormData($form);	
	$form_data.append('action',$form.name);
	
	target.insertAdjacentHTML('afterBegin', '<div class="abs-center button-loader" id="button-loader">	<div class="loading" id="loader"><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div></div></div>');
	// var $loaded =  document.createElement("div");		
	// 	$loaded.innerHTML  = '<div class="loading" id="loader"><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div></div>';
		

	postForm('ajax.php',$form_data , function($data_in){
		target.removeChild(target.children['button-loader']);
		console.log($data_in);
		$data_insert = JSON.parse($data_in);
		console.log($data_insert);
		
	})
}

function saveInput($input, $added_data){
	//console.log($form);
	// $added_data = null;
	$form=parent($input, 'form');
	$input_value = $input.value;
	$send_data = new FormData();
	if ($added_data != undefined) {	
		if ($added_data['action'] != null ) {		
			
			for(var key in $added_data) {
				$send_data.append(key, $added_data[key]);
			}

		} 
	}else $send_data.append("action", $form.name);

	$send_data.append($input.name, $input_value);
	
	if ($input.id=='new_password' || $input.id=='pay_pass' || $input.id=='email_security') {
		$send_data.append('pswd', Id('pswd').value);		
	}

	console.log($send_data);
	
	var $loaded =  document.createElement("div");
		$loaded.className  = 'loaded';
		$loaded.innerHTML  = '<img src="img/loader_mini.gif" alt="" />';
		$input.parentNode.appendChild($loaded);


	postForm('ajax.php',$send_data , function($data_in){

		$loaded.parentNode.removeChild($loaded);
		console.log($data_in);
		$data_insert = JSON.parse($data_in);
		console.log($data_insert);
		if($data_insert.content){
			if (!$data_insert.mesto) {
				Id('insert_ajax').innerHTML=$data_insert.content;
				Id('pswd-block').classList.add('hide');
			}
		}
		if ($data_insert=="pass_changed") {
			Id('pswd').value = $input_value;
			$input.parentNode.insertAdjacentHTML("beforeEnd", '<div class="data_saved"><img src="img/check.png" alt="" /></div>');
		
		}else if ($data_in=="data_saved" || $data_insert=="data_saved") {
		// $loaded.parentNode.removeChild($loaded);	
		$input.parentNode.insertAdjacentHTML("beforeEnd", '<div class="data_saved"><img src="img/check.png" alt="" /></div>');
		
			//setTimeout( function(){ $saved.parentNode.removeChild($saved)}, 1400);
		} else if ($data_in=="data_saved_error") {
  			$input.parentNode.insertAdjacentHTML("beforeEnd", '<div class="data_saved_error"><img src="img/error.png" alt="" /></div>');
  		} else if ($data_in=="draft_saved" || $data_insert.status=="draft_saved") {
  			if ($data_insert.post_id != $input.id) {
  				parent($input, 'form').id=$data_insert.post_id;
  				$input.id=$data_insert.post_id;
  			}
  			
  			$input.insertAdjacentHTML("afterEnd", '<div class="draft_saved" id="draft_saved">Черновик сохранён</div>');
  			// setTimeout(function function_name () {
  			// 	Id('draft_saved').parentNode.removeChild(Id('draft_saved'));
  			// }, 3000)
  		}
	})
}
				
function formSubmit($form){


if (Id('mess_auth')) {
  	Id('mess_auth').innerHTML='Проверяем данные.<ul class="loaderb"><li></li><li></li><li></li><li></li><li></li></ul>';
  }	

 if ($form.tagName !== "FORM" && $form.nodeName.toLowerCase() !== 'form') {
  			var $field_name = $form.dataset.fname;
 			var $field_value = $form.textContent;
  			var $data = 'action=edit_profile&'+$field_name+'='+ $field_value;
  		Post('ajax.php', $data , function($data_in){
  				if ($data_in=="data_saved") {
  					// $form.classList.add('data_saved');
  					$form.parentNode.insertAdjacentHTML("beforeEnd", "<div class='data_saved'>ok</div>");
  				} else if ($data_in=="data_saved_error") {
  					// $form.classList.add('data_saved_error');
  					$form.parentNode.insertAdjacentHTML("beforeEnd", "<div class='data_saved_error'>x</div>");
  				}	
  			})

  		} else {
  			var $data = new FormData($form);
  			$data.append("action", $form.name);
  			if ($form.name == 'new_post') {
  				$data.append("post_id", $form.id);
  			}
			postForm('ajax.php', $data , function($data)
	    	{
	    	var $dataPost = $data, 
	    	$user_data=JSON.parse($data); 	    	

			if ($user_data.status == 'post_saved') {
				$form.id = $user_data.new_post_id;
				$teaxtarea = document.getElementsByName("post_text")[0];
				$teaxtarea.value='';
				$teaxtarea.id = $user_data.new_post_id;
				Id('list').innerHTML='';
				Id('wall').insertAdjacentHTML("afterBegin", $user_data.content);
			}

switch($user_data.status_auth) {
	case 'errorpass':
		Id('mess_auth').innerHTML="Ошибка! Логин и пароль не совпадают.";
		break;
	case "authok":
		//console.log($user_data);
		autorized($user_data);
		if ($user_data.notify) {
		console.log($user_data.notify);
		}		
		break;
	case  "newuser":
		anim_userblock($user_data.status_auth);
		break;
	case  "user_reg":
		anim_userblock($user_data.status_auth);
		//console.log('424 user_reg'+$user_data);
		autorized($user_data);
		new_profile();
		break;
	case 'enter_pass':
		anim_userblock($user_data);
		break;
}
			
		});
	}
};

function  publish_post($form){
	// сделать проверку чтобы текст был не пустой или прикреплены фото
	formSubmit($form);
}

function new_profile(){
	// transformModal(Id('wrap_modal'));
	Load( 'new_profile?ajax=1', 'content',0);
	// Id('smBody').innerHTML=$user_data_parse.content;
}


function notify($title, $body) {
  var $notify = document.createElement('div');
	$notify.className = 'notify';
	$notify.id = 'notify-'+1;

  $notify.innerHTML = '<div class="message"> \
    <h1>' + $title + '</h1> \
    <div class="content">' + $body + '</div> \
    <input class="ok" type="button" value="OK"> \
  </div>';

return $notify;
}


function whait_message(event) {

  if( event.origin == "http://ukopo.ru") { 
   	if (event.data != "error_auth") {
			if (event.data.params == "set_data") {			
				for(var key in event.data) {
				  // key - название свойства
				  // object[key] - значение свойства
			 var $input = document.getElementById(key);
				 if ( $input!==null  &&  $input!= undefined) {
				  $input.value=event.data[key];
				 }
 				}
		var $param = "action=edit_profile&data="+JSON.stringify(event.data);
			Post('ajax.php', $param, function($user_data) {

 		});

	}else if (event.data.params != "set_data") {
  	var $param = "action=vkauth&data="+JSON.stringify(event.data);
  		Post('ajax.php', $param, function($user_data) {	 		
 			$user_data_parse = JSON.parse($user_data);
			var $vk_data = event.data;
			console.log($user_data);
			console.log($user_data_parse);
 			if ($user_data.response != "new_user") {
 				//$user_data = JSON.parse($user_data);
 			} else if ($user_data_parse.respons == "password_null" || $user_data_parse.respons == "new_user") {
 				// transformModal(Id('wrap_modal'));
 				// Id('smBody').innerHTML=$user_data_parse.content;
		 	 }
		 	if ($user_data_parse.status_auth=="user_reg" || $user_data_parse.status_auth=="authok") {
		 		
		 		if (typeof window.target_page != 'undefined') {
		 			if (window.target_page == 'profit') {
		 				console.log('599');
		 				Load('/profit?ajax=1', 'content', '1');		 				
		 			}
		 		};
		 		if ( (window.location.pathname.replace(/\/{1,}/g,''))==="profile") {
		 			console.log('603');
		 			Load(window.location.pathname+'?ajax=1', 'content');
		 		};
		 		

		 		if ($user_data_parse.notify) {
					$user_data_parse.notify.forEach( function(item){
						alertify.error(item, 0);
						// var $messageElem = notify('Внимание!', 'item');
						// document.body.appendChild($messageElem);

					} );
				}

		if ($user_data_parse.status_auth=="user_reg") {
					//console.log('user_reg');
				Load( 'new_profile?ajax=1', 'content',0);
		}
			Id('user_ava_for_auth').src= $vk_data.photo_big;
			TweenMax.to(Id('unknow_ava_for_auth'), 0.5, {top:-100, ease: Linear.ease })
			TweenMax.to(Id('user_ava_for_auth'), 0.5, {top:0, ease: Linear.ease })

		var $logout_btn =  document.createElement("a");
			$logout_btn.id  = 'logout';
			$logout_btn.setAttribute('href', "logout");
			$logout_btn.innerHTML = '<img src="img/logout.png" alt="">';
			Id('top-menu').appendChild($logout_btn);
			init_logout();
			autorized($user_data_parse);

			// Id('usrblock').classList.add("autorized")
			// Id('unknow_ava_for_auth').parentNode.removeChild(Id('unknow_ava_for_auth'));
			
			// TweenMax.to(Id('auth'), 0.3, {height:0, margin:0, paddingTop:0, paddingBottom:0 , ease: Linear.ease })
			// TweenMax.to(Id('socauth'), 0.3, {height:0, margin:0, ease: Linear.ease })
			// TweenMax.to(Id('mess_auth'), 0.3, {height:0, margin:0, ease: Linear.ease })
				
			// 	setTimeout(function() {
			//  		Id('auth').parentNode.removeChild(Id('auth'));
			//  		Id('socauth').parentNode.removeChild(Id('socauth'));
			 					 		
			//  	  } , 1400);
			
			}
		});
  	}
  }
    return;
  } else { return; }

}



function change_cover(target){
var href = target.getAttribute('href');
var $cover_changer = document.createElement('div');
 	$cover_changer.id = "cover_changer";
 	$cover_changer.className = "abs-center";
 	Id('photoset').appendChild($cover_changer);
		Load(href+'?ajax=1', 'cover_changer', 0);	
}



function autorized($user_data)
{
	
	Id('unknow_ava_for_auth').parentNode.removeChild(Id('unknow_ava_for_auth'));
	if (!Id('logout')) {	
		var $logout_btn =  document.createElement("a");
			$logout_btn.id  = 'logout';
			$logout_btn.setAttribute('href', "logout");
			$logout_btn.innerHTML = '<img src="img/logout.png" alt="">';
			Id('top-menu').appendChild($logout_btn);
			init_logout() 
	}
	if (typeof window.target_page == 'undefined') {
		Load(window.location.pathname+'?ajax=1', 'content');
	}
	
	TweenMax.to(Id('auth'), 0.2, {height:0, margin:0, paddingTop:0, paddingBottom:0 ,	opacity:0, ease: Linear.ease })
	TweenMax.to(Id('socauth'), 0.1, {height:0, margin:0,paddingTop:0, paddingBottom:0 ,opacity:0, ease: Linear.ease })
	TweenMax.to(Id('mess_auth'), 0.1, {height:0, margin:0,paddingTop:0, paddingBottom:0 ,opacity:0, ease: Linear.ease })
	Id("user_ava_for_auth").style.top=0;

	setTimeout(function() {
			Id('usrblock').classList.add("autorized");
 	} , 300);
	setTimeout(function() {		
 		Id('auth').parentNode.removeChild(Id('auth'));
 		Id('socauth').parentNode.removeChild(Id('socauth'));
 		Id('wrapper_auth').parentNode.removeChild(Id('wrapper_auth'));

 		 } , 1400);
	// $mainphoto = document.getElementsByClassName('mainphoto');
	// console.log($mainphoto[0]);
	// $mainphoto[0].insertAdjacentHTML("beforeEnd", '<a class="chang_mainava" id="chang_mainava">Изменить фото</a>');


	if (!Id('first-name') && $user_data.first_name) {			
		// var $name =  document.createElement("div");
		// 	$name.className  = 'first-name';
		// 	$name.id  = 'first-name';
		// 	$name.innerHTML = $user_data.first_name+' '+$user_data.last_name+'<div class="col-xs-12 no-mp text-right"><a id="logout" href="logout"> выход<img alt="" src="img/logout.png"></a></div>';
			// Id('auth-wrapp').appendChild($name);
			Id('user_ava_in_auth').insertAdjacentHTML("afterEnd",'<div class="name-wrapp"><div class="first-name" id="first-name">'+$user_data.first_name+'</div>'+'<div class="last-name" id="last-name">'+$user_data.last_name+'</div>'+'<div class="col-xs-12 no-mp text-right"><a id="logout" href="logout"> выход<img alt="" src="img/logout.png"></a></div></div>');
			} 
			// else if ($user_data.first_name) {				
			// 	Id('first-name').innerHTML = $user_data.first_name;
			// }

	Id('profile_li').insertAdjacentHTML("beforeEnd", '<i id="profile_plus" class="flaticon-plus open-sub-menu"></i><ul  class="sub-menu"><li class="nav_li"><a href="setting" id="setting"><i class="icon-setting"></i><div class="name-menu">Мои настройки</div></a></li></ul>');
	
	

	Id('vkauth').href=$user_data.frax_name;
	//console.log(Id('vkauth'));
	Id('vkauth').id = 'profile';
};


function anim_userblock($user_data){
//console.log($user_data);
		if ($user_data.photo_big!=undefined) {
			Id('user_ava_for_auth').src=$user_data.photo_big;
			TweenMax.to(Id('unknow_ava_for_auth'), 0.5, {top:-100, ease: Linear.ease })
			TweenMax.to(Id('user_ava_for_auth'), 0.5, {top:-100, ease: Linear.ease })
			
		} 
		
		if ($user_data == "newuser" ) {
			// console.log($user_data);
			Id('mess_auth').innerHTML="Логин свободен, придумайте пароль"
		} else if ($user_data !="newuser" || $user_data !="usr_reg" ) {
			// console.log($user_data);
		Id('mess_auth').innerHTML=$user_data.first_name+"<br>Это Вы? Введите пароль! <br> Или придумайте другой логин";
		
		} else if ($user_data =="usr_reg" ){
			Id('mess_auth').innerHTML=$user_data.first_name+"Поздравляем !Вы успешно зарегистрировались";
		}
		
}



function init_logout() {
if(document.getElementById('logout')){
	document.getElementById('logout').addEventListener('click', function(event) {
		event.preventDefault();
			Get('ajax.php/?logout=1&ajax=1', function($dat){
				location.reload();		
			});
	});
};
}


function parent(elem, tags) { // ищем родителя по тегу elem = дочерний элемент родителя которого надо найти
while(elem.tagName.toLowerCase() != tags) {
    if(elem.tagName.toLowerCase() == 'html'){
    	 return false;
    	} else elem = elem.parentNode;
}
return elem;
};

function resizeModal(){
	$modal = Id('superModal');
	TweenMax.to($modal, 0.3, {width: 'auto', height: 'auto', top:45, left:50+"%", ease: Linear.ease });
}

function transformModal(elem){
	var $parentElem = elem.getBoundingClientRect(), $section = document.getElementById('section');
 	var $superModal = document.createElement('div');
 	var $nameModal;
 	 // $superModal ='<div id="superModal" style="hieght:'+$parentElem.height+'"px; width:'+$parentElem.width+'px; left:'+$parentElem.left+'px; top:'+$parentElem.top+'px;"><div class="panel"><div class="panel-heading"><div class="panel-title">Добавление услуги<div class="pull-right"><a href="close" class="btn-icon" id="close" rel="nolink"><i class="icon-clos"></i></a></div></div></div><div class="panel-body">Panel content</div></div> </div>';
 	
 	 if(testDataset()){
 	 	$nameModal = elem.dataset.name;
 	 } else $nameModal= elem.getAttribute("data-name");
 	 $superModal.id = "superModal";
 	 $superModal.classList.add('ghosted')
 	 $superModal.style.height=$parentElem.height+'px';
 	 $superModal.style.width=$parentElem.width+'px';
 
 	 $superModal.style.left=$parentElem.left+'px';
 	 $superModal.style.top=$parentElem.top+'px';
 	 $superModal.innerHTML = '<div class="panel"><div class="panel-heading"><div class="panel-title">'+$nameModal+'<div class="pull-right"><a href="close" class="btn-icon" id="close" rel="nolink"><i class="icon-clos">х</i></a></div></div></div><div class="panel-body" id="smBody">Загрузка</div></div>';
 	 elem.parentNode.appendChild($superModal);
 	 TweenMax.fromTo($superModal, 0.3, {width: $parentElem.width, height: $parentElem.height, top:$parentElem.top, left:$parentElem.left}, {width: $section.offsetWidth, height: document.documentElement.clientHeight-50, top:45, left:$section.getBoundingClientRect().left, ease: Linear.ease });
 	  setTimeout(function() {
 	  $superModal.classList.add('show', 'popup');
 	  $superModal.classList.remove('ghosted')
 	  } , 400);

 	  document.getElementById('close').addEventListener('click', function(event) {
		event.preventDefault();
		$superModal.classList.remove('show','popup');
		$superModal.classList.add('ghosted')
		 TweenLite.to($superModal, 0.3, {width: $parentElem.width, height: $parentElem.height, top:$parentElem.top, left:$parentElem.left, ease: Linear.ease });
	  setTimeout(function() {
 	 		elem.parentNode.removeChild($superModal);
 	 	 } , 400);
	});	
};


function testDataset(){
var n = document.createElement('div');
n.setAttribute('data-a-b', 'c');
return !!(n.dataset && n.dataset.aB === 'c');
};

function proportionalSized(){
if (document.getElementById('hex-wrap')) {
$hexwrap = document.getElementById('hex-wrap'), $minus= document.getElementById('minus'), $plus= document.getElementById('plus');
$hexwrap.style.height = $hexwrap.offsetWidth+'px';
$minus.style.height = $minus.offsetWidth-10+'px';
$plus.style.height = $plus.offsetWidth-10+'px';
window.onresize = proportionalSized;
};
};


function initScroll (element) {
	var scroller = document.querySelectorAll(element);
	for (var i = 0; i < scroller.length; i++) {
		myScroll.push(new IScroll(scroller.item(i), {
   		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		bounceEasing: 'elastic',
		 bounceTime: 1300,
		 mouseWheelSpeed:20
			})
		)
		};
	};				
				
	
function Id(elem, parent){
	if(!parent){
		var $parent = document;
	} else var $parent = parent;
	var $nodeElem = $parent.getElementById(elem);
	return $nodeElem;
}
		

	
function heightLeftNav(){
	window.onresize = heightLeftNav;
	if (myScroll.length>0) {
		for (var i = 0; i < myScroll.length; i++) {
			myScroll[i].refresh();			
		}
	};	
};
	
function activation($id, $href_param){
	console.log($id, $href_param);
		$param = "action="+$id+"&uid="+$href_param;		
		Post('ajax.php',  $param, function($data) {
		
			$frax = JSON.parse($data);
			console.log($frax);
			//document.getElementById("matrix-wrapper").innerHTML = $frax;
			 //matrix();
		});
}

function hiderefs(target){
	var $id = target.getAttribute('href');
		$refs = Id('block_parent_'+$id),
		target.id = 'showrefs',
		$parent_conteiner = Id('parent_'+$id);
		console.log($parent_conteiner.parentNode);

		target.innerHTML='<i class="flaticon-plus"></i>';
		//$parent_conteiner.parentNode.style.height = '';
		//Id('block_parent_'+$id).style.height = '';
		$refs.classList.add('closest');

		setTimeout(function() {
			$refs.parentNode.removeChild($refs);
 		} , 1400);
}

function showrefs(target){

	var $userid = target.getAttribute('href'),					
	$param = "?ajax=1&action="+target.id+"&userid="+$userid,
	$btn = target,						
	$parent_conteiner = Id('parent_'+$userid), 
	$parentNode = $parent_conteiner.parentNode;

	$parent_conteiner.insertAdjacentHTML('afterend', '<div class="loading" id="loader"><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div></div>');
	
						// if ($parent_conteiner !== "opened") {
		Get('items/referals'+$param, function(src){//запрашиваем данные с сервера
		$data = JSON.parse(src);

		$parent_conteiner.insertAdjacentHTML('afterend', $data.content);
		var $iduct_closest = Id('block_parent_'+$userid);
		var $users = Id('block_parent_'+$userid).children;
		console.log($users);
		var $height_all_el =0;
		for (var i = 0; i < $users.length; i++) {
			$height_all_el += $users[i].offsetHeight+parseInt(getComputedStyle($users[i]).marginBottom);
			// console.log(parseInt(getComputedStyle($users[i]).marginBottom));
			// console.log($height_all_el, $users[i].offsetHeight);
		}
			console.log($parentNode.offsetHeight);
			//$parentNode.style.height=$parentNode.offsetHeight+$height_all_el+'px'
			//$iduct_closest.style.height = $height_all_el+'px';
			$iduct_closest.classList.remove('closest');							
		$parentNode.removeChild($parentNode.children['loader']);
		$btn.id = 'hiderefs'
		//console.log($btn.children);
		$btn.innerHTML='<i class="flaticon-minus"></i>';	

		}, 0);	
}

function paralax(){			
if (Id('cloud')) {
		
		var $wrapperCloud = Id('cloud') , $layers = $wrapperCloud.getElementsByTagName('img'),
		innerWidth = $wrapperCloud.offsetWidth, $parentWrap =  $wrapperCloud.getBoundingClientRect(),innerHeight = $wrapperCloud.offsetHeight,
		
		center = {
		x: innerWidth/2,
		y: innerHeight/2
		}		
		
	document.addEventListener('mousemove', function(e) {
	for (var i = 0; i < $layers.length; i++) {
		var $layer = $layers[i].getBoundingClientRect(), $l1 = $layers[i], ratioH= ("0."+(i+1)),ratioV=("0."+(i+1));
		y0=$parentWrap.top;
		x0=$parentWrap.left;
		
		 $l1.style.left=((e.pageX - center.x)*ratioH)+'px';
		 $l1.style.top=((e.pageY - center.y)*ratioV)+'px';
		}	
	})
};
};

function toogleSide(event){
				event.preventDefault();
				var event = event || window.event;
			  	var target = event.target || event.srcElement; 
			
			 var $sidebar = target.getAttribute('href');
			 var $body = document.getElementById('body');
 		
			 if ($sidebar === "leftside" ) {			 	
			 	if ($body.classList.contains("left-mini")){
			 	$body.classList.remove("left-mini");
			 		// setTimeout(function() {
			 	 		Id('leftside').classList.remove("leftmini");			 	 
			 	 	 // } ,4350);	
			 	document.cookie="left-mini=0; path=/; expires=1000000";
					if (target.classList.contains('cicon-rightside')) {
			 		target.classList.remove('cicon-rightside');
			 		target.classList.add('cicon-leftside')
			 	};
			 	} else {
			 		$body.classList.add("left-mini");
			 		document.cookie="left-mini=1; path=/; expires=100000";
			 		if (target.classList.contains('cicon-leftside')) {
			 		target.classList.remove('cicon-leftside');
			 		target.classList.add('cicon-rightside')
			 			};
			 		setTimeout(function() {
			 	 		Id('leftside').classList.add("leftmini");			 	 

			 	 	 } ,500);
			 		};			 						 	
			 };
			  if ($sidebar === "rightside" ) {			  	
			 	if ($body.classList.contains("right-mini")){
			 	$body.classList.remove('right-mini');
			 	document.cookie="right-mini=0; path=/; expires=100000";
			 	if (target.classList.contains('cicon-leftside')) {
			 		target.classList.remove('cicon-leftside');
			 		target.classList.add('cicon-rightside')
			 			};
			 	} else 	{$body.classList.add('right-mini');
			 	document.cookie="right-mini=1; path=/; expires=100000";
			 	if (target.classList.contains('cicon-rightside')) {
			 		target.classList.remove('cicon-rightside');
			 		target.classList.add('cicon-leftside')
			 	};
			 };	 		
};
setTimeout(function() {
	heightLeftNav();
} ,160);			
};

var $draft = '';
function save_draft(target){	
	if (target.value != $draft) {
		console.log('отправялем на сервер');
		console.log(target.id);
		$data = ''
		$form=parent(target, 'form');
		var $added_data={'action':'draft', 'post_id':target.id};

		saveInput(target, $added_data);
		$draft = target.value;
	}
	if (Id('draft_saved')) {
		Id('draft_saved').parentNode.removeChild(Id('draft_saved'));
	}	
}


function loader($target){

	var $loaded =  document.createElement("div");
		$loaded.id  = 'loading';
		$loaded.className  = 'loading';
		$loaded.innerHTML  = "<div class='bullet'></div><div class='bullet'></div><div class='bullet'></div><div class='bullet'></div>";
		$target.parentNode.appendChild($loaded);
	return $loader;
}

function delet_loader () {	
			loaders = document.getElementsByClassName('loaded');
			var count = loaders.length
			for (var i = 0; i < loaders.length; i++) {
				console.log(count);
				console.log(i);
				// console.log( loaders[i].parentNode);
				// var parent_loader = loaders[i].parentNode;
				console.log( loaders[i].parentNode);
				loaders[i].parentNode.removeChild(loaders[i]);
				console.log(count);
				console.log(i);
			}
}


function closCropedImage() {
    console.log('test');
	Id('crop_frame').parentNode.removeChild( Id('crop_frame'));
};

function cropper($target) {


$file_ipnput = Id('fileupload');
if (!Id('crop_frame')) {
// var $frame =  document.createElement("div");
// 	$frame.id  = 'photo_frame';
// 	$frame.className  = 'photo_frame';	
// 	$frame.innerHTML  = '';
	// $target.parentNode.appendChild($frame);
	$target.parentNode.insertAdjacentHTML("afterEnd", '<div class="crop_frame" id="crop_frame"><canvas id="cropper" width="150" height="150"></canvas><div class="scaleSlider"><input id="scaleSlider"  orient="vertical" type="range" min="0.2" max="3.0" step="0.01" value="1.0" /></div><button class="btn" id="cropImgButtn">Сохранить</button><a class="btn red" id="cancelCrop">X</a></div>');
}

$file_ipnput.click();

 document.getElementById("fileupload").onchange = function(event) {
    this.imageFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        imageCropper.init(event.target.result);                     
    }.bind(this);
    reader.readAsDataURL(this.imageFile);
}.bind(this);

 	 	
  	 var imageCropper = {   		
        ctx: Id("cropper").getContext("2d"),
        image: new Image(),
        scale: 1,
        click: false,
        baseX: 0,
        baseY: 0,
        lastPointX: 0,
        lastPointY: 0,
        cutoutWidth: 0,
        windowWidth: 150,

        init: function($src) {            
            this.image.src = $src;
            this.image.onload = this.onImageLoad.bind(this);
            document.getElementById("cropImgButtn").onclick = this.showCropedImage.bind(this);
            
            document.getElementById("scaleSlider").oninput = this.updateScale.bind(this);
        },
        
        onImageLoad: function() {
            this.drawimage(0, 0);
            this.ctx.canvas.onmousedown = this.onMouseDown.bind(this);
            this.ctx.canvas.onmousemove = this.onMouseMove.bind(this);
            this.ctx.canvas.onmouseup = this.onMouseUp.bind(this);
        },  
        drawimage: function(x, y) {
            var w = this.ctx.canvas.width,
                h = this.ctx.canvas.height;
            this.ctx.clearRect(0, 0, w, h);
            this.baseX = this.baseX + (x - this.lastPointX);
            this.baseY = this.baseY + (y - this.lastPointY);
            this.lastPointX = x;
            this.lastPointY = y;
            this.ctx.drawImage(this.image, this.baseX, this.baseY, Math.floor(this.image.width * this.scale), Math.floor(this.image.height * this.scale));
            this.drawCutout();
        },      
        drawCutout: function() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            //Draw anti clockwise rectangle, for cutout.
            this.ctx.moveTo(this.cutoutWidth, this.cutoutWidth);
            this.ctx.lineTo(this.cutoutWidth, this.windowWidth + this.cutoutWidth);
            this.ctx.lineTo(this.cutoutWidth + this.windowWidth, this.cutoutWidth + this.windowWidth);
            this.ctx.lineTo(this.cutoutWidth + this.windowWidth, this.cutoutWidth);
            this.ctx.closePath();
            this.ctx.fill();
        },
        onMouseDown: function(e) {
            e.preventDefault();
            var loc = this.windowToCanvas(e.clientX, e.clientY);
            this.click = true;
            this.lastPointX = loc.x;
            this.lastPointY = loc.y;
        },       
        onMouseMove: function(e) {
            e.preventDefault();
            if (this.click) {
                var loc = this.windowToCanvas(e.clientX, e.clientY);
                this.drawimage(loc.x, loc.y);
            }
        },      
        onMouseUp: function(e) {
            e.preventDefault();
            this.click = false;
        },      
        windowToCanvas: function(x, y) {
            var canvas = this.ctx.canvas;
            var bbox = canvas.getBoundingClientRect();
            return {
                x: x - bbox.left * (canvas.width / bbox.width),
                y: y - bbox.top * (canvas.height / bbox.height)
            };

        },      
        showCropedImage: function() {
            var temp_ctx, temp_canvas;
            temp_canvas = document.createElement('canvas');
            temp_ctx = temp_canvas.getContext('2d');
            temp_canvas.width = this.windowWidth;
            temp_canvas.height = this.windowWidth;
            temp_ctx.drawImage(this.ctx.canvas, this.cutoutWidth, this.cutoutWidth, this.windowWidth, this.windowWidth, 0, 0, this.windowWidth, this.windowWidth);
            var vData = temp_canvas.toDataURL();
            // $mainphoto = document.getElementsByClassName('main-photo');
            // for (var i = 0; i < $mainphoto.length; i++) {
            // 	console.log($mainphoto[i]);
            // 	$mainphoto[i].src = vData;

            // }

            Id('crop_frame').parentNode.removeChild( Id('crop_frame'));
            // document.getElementById('mainphoto').src = vData;
          
          this.uploadImage(vData);
        },


        updateScale: function(e) {
            this.scale = e.target.value;
            this.drawimage(this.lastPointX, this.lastPointY);
        },

         uploadImage: function(vData) {             
                var data = new FormData();
                data.append("action", 'new_main_photo');
                data.append("file", vData);
                this.uploadToServer(data, vData);
               
            },
        uploadToServer: function(formData, vData) {
        		
     //            Post("ajax.php", formData, function(data){
     //            	console.log(formData);
     //            }); 
                postForm("ajax.php", formData, function(data){
                		$data = JSON.parse(data);
                		if ($data.status == 'data_saved') {
                		$mainphoto = document.getElementsByClassName('main-photo');
				            for (var i = 0; i < $mainphoto.length; i++) {
				            		$mainphoto[i].src = vData;
				            }
                		} else console.log(data);
				});

                // xhr = new XMLHttpRequest();
                // xhr.open("post", "ajax.php", true);
                //  xhr.send(formData);
                // xhr.onreadystatechange = function() {
                //     if (xhr.readyState == 4) {
                //       console.log(xhr.responseText);
                //     }
                // };
              

            }

    };
   
    };

function count_fr() {
//var script = document.createElement('SCRIPT');

//script.src = "https://api.vk.com/method/friends.get?user_id=6051351&callback=callbackFunc";
//document.getElementsByTagName("head")[0].appendChild(script);

// scripts.src = "https://api.vk.com/method/users.get?user_id=6051351&access_token=4196100e3d7379706917631c9c5fb4bb0df6f995ee11a81d0af20eb9b9e977492d95e46e18934fee31acf&fields=interests,activities&callback=inter";
// document.getElementsByTagName("head")[0].appendChild(scripts);
}


// function inter(result){ 
// console.log(result.response[0]);
// var $activities = result.response[0].activities.split(",");
// console.log($activities);
// var count_str=0;
// for (var i = 0; i < $activities.length; i++) {
// 	if ($activities[i].indexOf('MLM') || $activities[i].indexOf('МЛМ') ) {
// 		count_str++;
// 	}
// }
// console.log(count_str);
// }

var $r=0;
function callbackFunc(result) {
//  console.log(result.response.length);
// Id('you_fr').innerHTML = result.response.length;
// // var script = document.createElement('SCRIPT');
// $r = result;
// console.log($r);
// for (var i = 0; i < result.response.length; i++) {
	
// 	script_s = document.createElement('SCRIPT');
		
		
// 	document.getElementsByTagName("head")[0].appendChild(script_s);
// 	script_s.src = "https://api.vk.com/method/friends.get?user_id="+$r.response[i]+"&callback=count_user";	
// }

} 
function counts($r,i){
	console.log(script_s);
	
	
}
var $count_frs = 0;
function count_user(result){
// $count_frs += result.response.length;
// Id('all_you_fr').innerHTML = $count_frs;

// return $count_frs;
}

function friends_position(){
	$blocks = document.getElementsByClassName('user_profit');
	$blocks_right = document.getElementsByClassName('user_profit_right');
	
	var $top_1=10, $right_1=-35, $top_2=90, $right_2=-35;
	
	if (window.innerWidth <1285) {
		console.log('test');
	
	
	for (var i = 0; i < $blocks.length; i++) {
		if (i%2==0) {
			$blocks[i].style.top = $top_1+'px';
				$blocks[i].style.right = $right_1+'px';
				$top_1+=10; $right_1+=70;

		} else {
			$blocks[i].style.top = $top_2+'px';
			$blocks[i].style.right =  $right_2+'px';
			// $top_2-=10;
			 $right_2+=70;
				
		}
	

	}

	var $topr_1=90, $left_1=-35, $topr_2=10, $left_2=-35;
	
	for (var i1 = 0; i1 < $blocks_right.length; i1++) {
		
		if (i1%2==0) {
			$blocks_right[i1].style.top = $topr_1+'px';
			$blocks_right[i1].style.left = $left_1+'px';
			$blocks_right[i1].classList.add('chet');
			//$topr_1+=10; 
			$left_1+=70;

		} else {
			$blocks_right[i1].style.top = $topr_2+'px';
			$blocks_right[i1].style.left =  $left_2+'px';
			$blocks_right[i1].classList.add('nechet');
			$topr_2+=10; $left_2+=70;
			// $top_2-=10;
			// $rightr_2+=70;
				
		}
	

	}
	} else {
		var $right_fr=Id('right_fr'), $left_fr=Id('left_fr');
		

		$new_right_fr = $right_fr.cloneNode(true);
		$new_left_fr = $left_fr.cloneNode(true);

		Id('other_user').appendChild($new_right_fr);
		Id('other_user').appendChild($new_left_fr);
		
		$right_fr.parentNode.removeChild($right_fr);
		$left_fr.parentNode.removeChild($left_fr);

	}
}

// function album_heigh(){	

// 	$albums = document.getElementsByClassName('album');
	
// 	for (var i = 0; i < $albums.length; i++) {
// 		$min_heigh = 200;
// 		$min_heigh_curent = $albums[i].height;
// 			if ($min_heigh>$min_heigh_curent) {
// 				$min_heigh=$min_heigh_curent;
// 			}
// 	}
// 	for (var a = 0; a < $albums.length; a++) {
// 		$albums[a].style.height=$min_heigh+'px';
// 	}
// 	window.onresize = album_heigh();
// }
