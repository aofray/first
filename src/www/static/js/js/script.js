$(function(){

if (window.location.search) {
	window.history.replaceState(null,null,window.history.back());
	
}

// load(window.location.pathname+'?ajax=1', 'content', '1');

document.addEventListener('submit', function(event) {
	
	var target = event.target || event.srcElement
	var event = event || window.event;
	event.preventDefault();

	send_form(target);

	
});



var $prodview=null;var $fix_el='nofixed'; $next_page_loaded='loading';
document.addEventListener('scroll', function(event) {
var event = event || window.event;
var target = event.target || event.srcElement;
var $ttt=0;

if ($header==null) {
   var $header = document.getElementsByTagName('header')[0], $section=id('section');
}
$prodview = id('prod_view');
if ($prodview!=null || $prodview!=undefined) {	
	Ywin=(window.pageYOffset || document.documentElement.scrollTop),	
   	$prodviewY=$prodview.getBoundingClientRect().y,
	$descr=$prodview.getElementsByClassName('descr')[0];
	// $descr.style.maxHeight=window.innerHeight-45+"px";	



if ($prodviewY+Ywin-33<=(window.pageYOffset || document.documentElement.scrollTop)) { 
  if ($fix_el=='nofixed') {
  $descr.style.position='fixed';
  $descr.style.top='35px';
 
  $descr.style.maxHeight=window.innerHeight-45+"px";
  // $descr.style.width=$prodview.offsetWidth+"px";
  // $descr.style.height="100%";
  $fix_el='fixed';

  }
} 
if ($prodviewY+Ywin-33>=(window.pageYOffset || document.documentElement.scrollTop)) {
  if ($fix_el=='fixed') {
  $descr.style.top='0px';
  $descr.style.position='relative';

   // $descr.style.height="100%";
  $descr.style.maxHeight=window.innerHeight-45+"px";
  // $descr.style.width=$prodview.offsetWidth+"px";
  $fix_el='nofixed';
  }
} 
}
if(id('next_page')){
	var $next_but = id('next_page');
	var $Ywin=(window.pageYOffset || document.documentElement.scrollTop);
	var $link = $next_but.getElementsByTagName('a')[0], 
	 	$pos_next_but=$next_but.getBoundingClientRect().y;
	 	  		// console.log($next_page_loaded);
	// console.log('pos_next_but='+$pos_next_but);
	// console.log('Ywin='+$Ywin);
	// console.log('pos_next_but+Ywin='+Number($pos_next_but+$Ywin));
	// console.log('pos_next_but+Ywin-200='+ Number($pos_next_but+($Ywin-window.innerHeight)));

if ($pos_next_but+($Ywin-window.innerHeight)<=(window.pageYOffset || document.documentElement.scrollTop)) { 
  if ($next_page_loaded=='loading') {

  		// console.log($next_page_loaded);
  		$next_page_loaded='noload';
  		activ($link, function($data){
  			
  			if($data.page=='end'){
  				window.$next_page_loaded="noload";
  			} else window.$next_page_loaded="loading";

  		});
  		$link.id=Number($link.id)+1;
   } 
}
}

  // var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  // if (scrolled>30) {
  //   $header.style.height=30+'px';   
  // } else {
  //   $header.style.height='';
  // }
});

window.addEventListener('popstate', function(e){
  $popUrl = window.location.pathname;
  console.log($popUrl);
  load( $popUrl, 'content');
//  history.pushState(null,null, $popUrl);
}, false);

document.addEventListener('click', function(event) {
var event = event || window.event;
var target = event.target || event.srcElement;

while(target != this && target!=null){
	if (!target.classList.contains('noajax')) {
		if (target.tagName == "A" && target.nodeName.toLowerCase() === 'a'){	

		event.preventDefault();
		event.stopPropagation();

		var $href = target.href,
			// $id_el = target.id, 
			$action = target.getAttribute('href'), 
			$target_block= target.dataset.box;
		console.log($action);
		if (target.classList.contains('action')) {			
			if (window[$action]) {	
				// console.log($action);
				window[$action](target);
			} else {	
				// console.log($action);
				activ(target, function(target){console.log(target)});
			}
		}	else {
			
			// console.log(window.location.pathname);
			load($href, $target_block,0);
			if (target.classList.contains('main_nav')) {
				history.pushState(null,null, $href);
			} else {
				
				history.pushState(null,null, $action);
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
	if (target.name == 'multi_descr[]') {
		multi_descr(target);
		
			//$prod_name = tr.getElementsByClassName('prod_name')[0];
	}
	if (target.id == 'infiniti' || target.id =='count_week') {
		
		 wait_action(target);
	}

})


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




heightLeftNav();
initScroll('.iscroll');
});// конец реади