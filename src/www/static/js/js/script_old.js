$(function(){

if (window.location.search) {
	window.history.replaceState(null,null,window.history.back());
	console.log(window.history);
}

load(window.location.pathname+'?ajax=1', 'content', '1');
console.log(document.cookie);
document.addEventListener('submit', function(event) {
	
	var target = event.target || event.srcElement
	var event = event || window.event;
	event.preventDefault();
	// console.log(target);
	send_form(target);
	// if (target.tagName == "BUTTON" && target.nodeName.toLowerCase() === 'button' && target.id !=='disable'){		
	// 	if (target.name='edit') {
	// 		$panel = parent_by_selector(target, 'panel');
	// 		$panel.parentNode.removeChild($panel);
	// 	}
	// }

	//  if (target.tagName =='FORM' && target.nodeName.toLowerCase() === 'button') {
		
	// } else event.preventDefault();
	// console.log(target.tagName);
	
});

var fheader = function(){
 var $header = document.getElementsByTagName('header')[0],
 $section=id('section');
window.onscroll = function() {
	
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled>100) {
  	$header.style.height=30+'px';
  	//$section.style.marginTop=50+'px';
  } else {
  	$header.style.height='';
  	//$section.style.marginTop='';
  }
}
};
fheader();

window.addEventListener('popstate', function(e){
	$popUrl = window.location.pathname;
	console.log($popUrl);
	load( $popUrl+'?ajax=1', 'content');
//	history.pushState(null,null, $popUrl);
}, false);



document.addEventListener('click', function(event) {
var event = event || window.event;
var target = event.target || event.srcElement;

while(target != this && target!=null){
	if (!target.classList.contains('noajax')) {

if(target.classList.contains('highlight_panel')){
	target.classList.remove('highlight_panel');
}

	if (target.tagName == "A" && target.nodeName.toLowerCase() === 'a' && target.id !=='disable'){	

		event.preventDefault();
		event.stopPropagation();		
		
		var $id = target.id;
			
		if (window[$id]) {
				window[$id](target);
		} else {	
		var $href = target.href;
		load($href+'?ajax=1', 'content',0);
		history.pushState(null,null,$href);
		}

			// switch($id) {
				
			// 	case 'remove':
			// 	// console.log(target);
			// 		remove_img(target);
			// 		break;
			// 	case 'logout':				
			// 		logout();
			// 		break;				
			// 	case 'check_categ':
			// 		check_categ(target);
			// 		break;
			// 	case 'change_category':
			// 		change_category(target);
			// 		break;
			// 	case 'prod_info':
			// 		prod_info(target);
			// 		break;
			// 	case 'toogle':
			// 		toogle(target);
			// 		break;
			// 	case 'show_prods':
			// 		show_prods(target);
			// 		break;
			// 	case 'close':
			// 		closed(target);
			// 		break;
			// 	case 'add_in_cart':
			// 		add_in_cart(target);
			// 		break;
			// 	case 'reset':
			// 		reset_login();
			// 		break;
			// 	case 'plus_prod':
			// 		cart_action(target);
			// 		break;
			// 	case 'minus_prod':
			// 		cart_action(target);
			// 		break;
			// 	case 'plus_week':
			// 		wait_action(target);
			// 		break;
			// 	case 'delete_propose' :
			// 		propose_action(target);
			// 		break;
			// 	case 'show_all_propose' :
			// 		show_all_propose();
			// 		break;
			// 	case 'hide_propose' :
			// 		propose_action(target);
			// 		break;
			// 	case 'edit_propose' :
			// 		propose_action(target);
			// 		break;
				
			// 	case 'cancel_order':
			// 		cancel_order(target);
			// 		break;
			// 	case 'minus_week':
			// 		wait_action(target);
			// 		break;
			// 	case 'remove_out_cart':
			// 		wait_action(target);
			// 		break;
			// 	case 'clear_cart':
			// 		clear_cart();
			// 		break;
			// 	case 'close_panel':
			// 		close_panel(target);
			// 		break;
			// 	case 'deliver':
			// 		deliver();
			// 		break;
			
			// 	default :

			// 		load($href+'?ajax=1', 'content',0);
			// 		history.pushState(null,null,$href);
			// 		break;
			// }
		

	}
}
	target = target.parentNode;
};
});

document.addEventListener('keyup', function(event) {
	var event = event || window.event, $login;
	var target = event.target || event.srcElement; 
if (parent(target, 'form').name!='login' ) {

if(target.tagName == "INPUT" && target.nodeName.toLowerCase() === 'input') {

		if(target.id == 'login' || target.id == 'pswd')	{
			 if (event.keyCode>32) {
						
			 	if(!(/^[a-zA-Z0-9\-_@#$\.]+$/.test(target.value))){
			 		// target.value='';
			 		console.log(target);
			 		console.log(event);
			 		notify('Допустимы только из ЛАТИНСКИЕ буквы, цифры, а так же символы "-", "_", ".", #, $ ,@', 'warning');
			 	} else {
			 		console.log('ok');
			 	}
			 }
			  target.onchange = function() {
			 	if(!(/^[a-zA-Z0-9\-_@#$\.]{4,}$/.test(target.value))){
			 		  notify('Пароль и логин должны содержать минимум 4 символа', 'warning');
			 	} else {
			 		console.log('ok');
			 	}
			 }
		}
				 
	}
}
})
document.addEventListener('change', function(event) {
	var event = event || window.event;
	var target = event.target || event.srcElement; 
 
	if (target.id == 'price') {
			upload_price(target);
	}
	if (target.name == 'prod_for_move[]') {
		multi_change(target);
		
			//$prod_name = tr.getElementsByClassName('prod_name')[0];

	}
	if (target.id == 'infiniti' || target.id =='count_week') {
		
		 wait_action(target);
	}

// if(target.tagName == "INPUT" && target.nodeName.toLowerCase() === 'input') {
// 	console.log('test');
// 		if (target.classList.contains("video_link")){
			
// 					$value=target.value;			
// 					youtube_parser($value);	
				
// 		}		
				 
// 	}	
})

// document.addEventListener('blur', function(event) {
// 	var event = event || window.event;
// 	var target = event.target || event.srcElement; 
// if(target.tagName == "INPUT" && target.nodeName.toLowerCase() === 'input') {

// 	if (target.classList.contains('count')) {
// 		id('action_'+target.id).getElementsByClassName('plus')[0].classList.remove('inviz')
// 		id('action_'+target.id).getElementsByClassName('minus')[0].classList.remove('inviz')
// 		id('action_'+target.id).getElementsByClassName('ok')[0].classList.add('inviz')
// 	}
// }

// }, true);

document.addEventListener('focus', function(event) {
	var event = event || window.event;
	var target = event.target || event.srcElement; 

// while(target != this){
if (target.tagName == "DIV" && target.nodeName.toLowerCase() === 'div'){
		var  $clas = target.classList; 
			if ($clas.contains('editable')) {
				$old_value=target.textContent;
			}
		}
if(target.tagName == "TEXTAREA" && target.nodeName.toLowerCase() === 'textarea') {
				
				textarea_size(target);
				// target.onkeyup=function (){
				// 	$value=target.value;			
				// 	//youtube_parser(target.value);
				// }
				//  target.onchange = function() {
				// 	$value=target.value;			
				// 	youtube_parser($value);	
				// }
	}
if(target.tagName == "INPUT" && target.nodeName.toLowerCase() === 'input') {

	// if (target.classList.contains('count')) {
	// 	id('action_'+target.id).getElementsByClassName('plus')[0].classList.add('inviz')
	// 	id('action_'+target.id).getElementsByClassName('minus')[0].classList.add('inviz')
	// 	id('action_'+target.id).getElementsByClassName('ok')[0].classList.remove('inviz')
	// }

		// if(target.id == 'login' || target.id == 'pswd')	{

		// 	 target.onkeyup = function(){
		// 	 	console.log(event);
		// 	 	if(!(/^[a-zA-Z0-9\-_@#$\.]+$/.test(target.value))){
		// 	 		target.value='';
		// 	 		console.log(target);
		// 	 		console.log(event);
		// 	 		notify('Допустимы только из ЛАТИНСКИЕ буквы, цифры, а так же символы "-", "_", ".", #, $ ,@', 'warning');
		// 	 	} else {
		// 	 		console.log('ok');
		// 	 	}
		// 	 }
		// 	  target.onchange = function() {
		// 	 	if(!(/^[a-zA-Z0-9\-_@#$\.]{4,}$/.test(target.value))){
		// 	 		  notify('Пароль и логин должны содержать минимум 4 символа', 'warning');
		// 	 	} else {
		// 	 		console.log('ok');
		// 	 	}
		// 	 }
		// }
				 
	}
// target = target.parentNode;
// }
}, true);



});// конец реади