$(function(){

if (window.location.search) {
	window.history.replaceState(null,null,window.history.back());
	// console.log(window.history);
}

// load(window.location.pathname+'?ajax=1', 'content', '1');
// console.log(document.cookie);

				// console.log('window.location.pathname='+window.location.pathname);
				// console.log('window.location.pathname='+window.location.href);
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
		
		var $action = target.getAttribute('href'), $target_block = target.dataset.box;
		
		if (!target.dataset.box) {
			if (window[$action]) {
				window[$action](target);
			}	
		} else {
			var $href = target.href,
				str = window.location.pathname.split('/'), 
				$link = $action;		
			
				if ($target_block!=='content') {					
					if (str[1]!='') {
						
						if ($link=='/') {
							$href='/'+str[1]+'/'+str[1];	
							history.pushState(null,null, '/'+str[1]);	
						} else {
							$href='/'+str[1]+'/'+$link;	
							history.pushState(null,null, $href);		
						}							
						load($href+'?ajax=1', $target_block,0);	
					}
				 } else if ($target_block=='content') {				
						if ($link!='/') {
							$href="/"+$link
							history.pushState(null,null, $href);						
						} else {
							history.pushState(null,null, $href);
						}
					load($href+'?ajax=1', $target_block,0);					
				 }
			
			}	
		return true;
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
			
	}
if(target.tagName == "INPUT" && target.nodeName.toLowerCase() === 'input') {

 
	}

}, true);



});// конец реади