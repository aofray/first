
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


function loader(){
  $loader 
}

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



function send_form($form) {
var ajaxReq = new getAjax();
    ajaxReq.open("POST", '/ajax.php', true);  
var $data = new FormData($form);
    // console.log($form);
    //console.log($form.name);
     $data.append("action", $form.getAttribute('action'));
     $data.append("id", $form.id);
  
    if ($form.name =='chang_cover') {      
       $data.append("page", $form.id);
    }

    if ($form.id =='reaply') {
      console.log($form.reaply.id);
      $data.append("reaply_id", $form.reaply.id);
    }  

     if ($form.name =='register') {      
      for (var i = 0; i < $form.elements.length; i++) {
        if ($form.elements[i].tagName != "BUTTON" && $form.elements[i].nodeName.toLowerCase() !== 'button') {
            if ($form.elements[i].value!=='') {
              if (  $form.elements[i].classList.contains('empty')) {
               $form.elements[i].classList.remove('empty');
              }
              
            } else { 
              $form.elements[i].classList.add('empty');
            }
        }
      
      } 
    }

    ajaxReq.send($data);
ajaxReq.onreadystatechange = function() {
  if (ajaxReq.readyState == 4) {
    if(ajaxReq.status == 200) {
      if (ajaxReq.responseText) {
      
      var $response = JSON.parse(ajaxReq.responseText);
     if ($response) { 
      if ($response.status == "autorized") {
       var $href = window.location.pathname;
    
       if ( $href=='/login') {
         window.history.pushState('', '' , '/');
         $href='/';
       }          
          load($href+'?ajax=1', 'content');
          $btn_login = id('login');
          $btn_login.innerHTML="Выход";
          $btn_login.href='logout';
          $btn_login.id='logout';
          
      }  // autorized

      if ($response.notify) {       
        if ($response.notify_style) {
          notify($response.message, $response.notify_style);
        } else notify($response.message);
      } 
        if ($response.status == "anonimus") {
              id('auth_panel').classList.add('highlight_panel');
        } 

        if ($response.status == "order_ended") {
             window.history.pushState('', '' , 'checkout_finish');
             load('checkout_finish?ajax=1', 'content');
        } 

      if ($response.status == "price_save") {
            id('notify').insertAdjacentHTML("afterBegin", $response.content);
            $form.reset();
        } 

      if ($response.status == "post_saved") {
            id('posts').insertAdjacentHTML("afterBegin", $response.content);
            $form.reset();
        }    
      if ($response.status == "prod_added") {  
          $cart_list = id('cart_list');
          if ($response.content) {          
           id('cart_body').insertAdjacentHTML('beforeend',$response.content);
          } 
          if ($response.update_count) {          
           id('prod_in_cart_'+$response.update_count.id).value=$response.update_count.count;
          }  
          id('itog_summ').innerHTML = $response.itog_cart.summ;
          id('itog_count').innerHTML = $response.itog_cart.count_prod;          
      } 

    
      }   
      }   
}
}
}
}


function deliver(){
  load('form_deliver?ajax=1', 'form_deliver', '0');
}

function upload_price(target){
  console.log('test');
  $form = parent(target, 'form');
  send_form($form);
}



var updateProgress=(function(e) {  
  return function(e) {
      if (id('proces_loader').classList.contains('inviz')) {
        id('proces_loader').classList.remove('inviz');
     }
    // console.log(e.loaded);
    // console.log(e.total);
    // console.log(e.lengthComputable);
    // console.log(e);

  };
 })();

var loaded=(function(e) { 

   return function(e) {
   setTimeout(function(){ id('proces_loader').classList.add('inviz');},300); 
   // console.log(e.loaded);
    // console.log(e.total);
    // console.log(e.lengthComputable);
    // console.log(e);

  };
 })();

// var updateLoadbar=(function(e) {  
//   return function(e) {
//      //  if (id('proces_loader').classList.contains('inviz')) {
//      //    id('proces_loader').classList.remove('inviz');
//      // }
// if (e.lengthComputable) {
//  progressbar = loadbar.getElementsByClassName('progressbar')[0];
//  progressbar.style.width=(e.total-e.loaded*100)+'%';
// }
//     console.log(e.loaded);
//     console.log(e.total);
//     console.log(e.lengthComputable);
//     console.log(e);

//   };
//  })();

function post_z(url, params,  whattado) { 
  var ajaxReq = getAjax();
 

// if (loadbar!=null) {
//   ajaxReq.addEventListener("progress", updateLoadbar, false);
//   ajaxReq.addEventListener("load", loaded, false);
// }
ajaxReq.addEventListener("progress", updateProgress, false);
ajaxReq.addEventListener("load", loaded, false);
// ajaxReq.addEventListener("error", updateProgress3, false);
// ajaxReq.addEventListener("abort", updateProgress2, false);
    ajaxReq.open("POST", url, true);    
   if (id('proces_loader').classList.contains('inviz')) {
        id('proces_loader').classList.remove('inviz');
     }
    ajaxReq.send(params);

  ajaxReq.onreadystatechange = function() { 
    // console.log(ajaxReq.readyState);
    // console.log(ajaxReq.status);
    if (ajaxReq.readyState == 4) {
      if(ajaxReq.status == 200) {
      
        return whattado(ajaxReq.responseText);
       
        }
      }
    };
  };

// function chang_cover($target){
//   $file = document.getElementsByName('file_cover').value;
//   console.log(document.getElementsByName('file_cover').files[0]);
//   console.log('test');
//   if ($file!='') {
//     params = 'action=chang_cover&file='+$file;
//     post_z('ajax.php', params, function($response){
//       console.log($response);
//     }) 
//   }
// }


function post(url, params, whattado) { 
  var ajaxReq = getAjax();
    ajaxReq.open("POST", url, true);
    ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajaxReq.send(params);

  ajaxReq.onreadystatechange = function() { 
    if (ajaxReq.readyState == 4) {
      if(ajaxReq.status == 200) {
        whattado(ajaxReq.responseText);
        
        }
      }
    };
  };


function get(url, whattado, initEvent) {
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

function load( url, element_id, initEvent) {
  if (element_id==null) {
    element_id='content';
  }
  var $element = document.getElementById(element_id);
  // var $section = document.getElementById('section');
  var $data;

    get(url, function(src){//запрашиваем данные с сервера
        $data = JSON.parse(src);
        $element.innerHTML = $data.content;
        if ($data.item) {
        if ($data.target_box) {
                id($data.target_box).innerHTML = $data.item;
            }
        }
        
        
      
      }, initEvent);      
};

function load_content(url){
  console.log(url);
 // var $element = document.getElementById(element_id);
     get(url+'?ajax=1', function(src){
      // console.log(url);
        $data = JSON.parse(src);   
        // console.log($data);
        //$element.innerHTML = $data.content;
      
      }, 0);    
}
 
function onLoad(e) {  
  // if (id('price')) {
  //   document.getElementById('price').addEventListener('change', FileSelect, false);
  // }  

// baguetteBox.run('.gallery'); //1424192029

};



function id(elem, parent){
  if(!parent){
    var $parent = document;
  } else var $parent = parent;
  var $nodeElem = $parent.getElementById(elem);
  return $nodeElem;
}
function parent(elem, tags) { // ищем родителя по тегу elem = дочерний элемент родителя которого надо найти
while(elem.tagName.toLowerCase() != tags) {
    if(elem.tagName.toLowerCase() == 'html'){
       return false;
      } else elem = elem.parentNode;
}
return elem;
};

function parent_by_selector(elem, selector) { // ищем родителя по тегу elem = дочерний элемент родителя которого надо найти
 // console.log(elem);
  while(!elem.classList.contains(selector) ) {   
    if(elem.tagName.toLowerCase() == 'html'){
       return false;
      }
   elem = elem.parentNode;
}

return elem;
};

function textarea_size(target) {

target.onkeyup = function () {
  if (1) {   
    target.style.height = "auto";
  }
   target.style.height = this.scrollHeight + "px";
};
target.onscroll = function () {
  this.scrollTop = 0;
};
}

function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/ig;
  
   // var match = url.match(regExp);
   var match = regExp.exec(url);
     console.log(match);
 if(match!==null){
  // console.log(match);
    get('ajax.php/?action=get_meta&data='+match[7], function(data){
      console.log(data);
      id('video_wrapper').insertAdjacentHTML("afterBegin", data);
    }, 0);
 }
 
} 

function remove_img($target){
  $file = $target.getAttribute('data-filename');
  params = "action=remove_img&file="+$file;

  post('ajax.php', params, function($response) {
     $resp=JSON.parse($response);
     if ($resp.status=="file_delete") {

      if ($target.parentNode.parentNode.classList.contains('video_prev')) {
        //$removed_block=parent_by_selector($target, 'video_prev');
          $removed_block = $target.parentNode.parentNode;        
         $target.parentNode.parentNode.parentNode.removeChild($removed_block);
      } 
      if ($target.parentNode.parentNode.classList.contains('thumb_wrap')){
         $removed_block = $target.parentNode.parentNode;        
         $target.parentNode.parentNode.parentNode.removeChild($removed_block);
      } 
      if ($target.parentNode.parentNode.classList.contains('photo')){
        // $removed_block=parent_by_selector($target, 'photo');
      
          $removed_block = $target.parentNode.parentNode;        
         $target.parentNode.parentNode.parentNode.removeChild($removed_block);
      }
      } 
  }) 

}

$categorys='';
$prod_for_change_categ='';
function change_category($target){
  $prod_for_change_categ=$target;
  if ($categorys=='') {
      console.log($categorys);
    var $data = new FormData();
        $data.append("action", "change_category"); 
       
        post_z('ajax.php',  $data, function($response) {
    var $resp=JSON.parse($response);         
       window.$categorys=$resp.content;
    var $div =  document.createElement('div');
      $div.className = 'overlay';

      $div.insertAdjacentHTML('afterbegin',"<a href='' id='close'>Закрыть</a><div class='rel-center category_list'>"+$categorys)
       
       id('body').appendChild($div);  
     });      
  } 
  if ($categorys!='') {
  $div.insertAdjacentHTML('afterbegin',"<a href='' id='close'>Закрыть</a><div class='rel-center category_list'>"+$categorys)
  id('body').appendChild($div);  
}
}

function check_categ($target){
  var $id = $target.getAttribute('href');
  var $data = new FormData();
  if ($prod_for_change_categ!='') {    
        
        $data.append("action", "check_categ"); 
        $data.append("id", $id); 
        $data.append("prod_id", $prod_for_change_categ.getAttribute('href')); 
    post_z('ajax.php',  $data, function($response) {
         var $resp=JSON.parse($response);   
         if ($resp.status=='category_changed') {
          // parent( $prod_for_change_categ, 'tr').parentNode.removeChild($prod_for_change_categ);
           closed();
           $prod_for_change_categ='';
          } 
       });
     } else {
         var elems = document.querySelectorAll('input[type="checkbox"]:checked');
         console.log(elems);
          $data.append("action", "multy_change_categ");
          $data.append("id", $id); 
          for (var i = 0; i < elems.length; i++) {
            $data.append(elems[i].name, elems[i].value); 
          }
        post_z('ajax.php',  $data, function($response) {
         var $resp=JSON.parse($response);   
          if ($resp.status = 'category_changed') {
            for (var i = 0; i < elems.length; i++) {
            elems[i].checked = false;
          }
        }
       });
         
     }
        
}


var $panel_category =  '';  
function multi_change(){
  if ($panel_category =='') {
    window.$panel_category =  id('right-box').getElementsByClassName('panel-content')[0]; 
  }

if ($categorys=='') {      
    var $data = new FormData();
        $data.append("action", "change_category");        
        post_z('ajax.php',  $data, function($response) {
    var $resp=JSON.parse($response);         
       window.$categorys=$resp.content;       
       $panel_category.insertAdjacentHTML('beforeend', $categorys);      
     });      
} 
  if ($categorys!='' && window.$panel_category.innerHTML=='') {
    $panel_category.insertAdjacentHTML('beforeend', $categorys);  
  }  
}


function closed(){
  var $overlay=document.getElementsByClassName('overlay')[0];
      $overlay.parentNode.removeChild($overlay);
}

function toogle($target){
var $id = $target.getAttribute('href');
if ($target.classList.contains('opened')) {

  var $open_cat = id('opened_category_'+$id);
    if ($open_cat.innerHTML!='') {
      $open_cat.parentNode.removeChild($open_cat);
       }
      $target.classList.remove('opened');
} else {


var $data = new FormData();
    $data.append("action", "show_category");
    $data.append("category", $id);
var $row=parent($target, 'tr');
    $target.classList.add('opened');

// var $loadbar = document.createElement('div');
//     $loadbar.className = "loadbar";

//     $loadbar.insertAdjacentHTML('afterbegin', '<div class="progressbar" id="pb_'+$id+'"></div>');
//     $row.appendChild($loadbar);

// var loadbar = $target.insertAdjacentHTML('afterend', '<div class="loadbar"><div class="progressbar" id="pb_'+$id+'"></div></div>');

    post_z('ajax.php',  $data, function($response) {
     
      var $resp=JSON.parse($response);  
          $row.insertAdjacentHTML('afterend',  $resp.content);
   
     }) 
  }
}

function test(target){
  console.log(target);
}

function propose_action(target){
  var $id = target.getAttribute('href'),
     $action = target.id;
var $data = new FormData();
    $data.append("action", $action);
    $data.append("id", $id);
  if ($action == 'edite_propose') {
    notify('Пока не доступно');
  }
if ($action == 'delete_propose' || $action =='hide_propose') {
    var $propose_panel =  id('propose_'+$id);
    post_z('ajax.php',  $data, function($response) {     
      var $resp=JSON.parse($response);  
           if ($resp.notify) {
           notify($resp.message);
          }
          if ($resp.status=='propose_deleted_ok' || $resp.status=='propose_hided_ok') {
          $propose_panel.parentNode.removeChild($propose_panel);
          }
   
     }) 
  }

}
function show_all_propose(){
   notify("ещё не сделал");
}

function show_prods($target){
var $id = $target.getAttribute('href');
 var $row=parent($target, 'tr');

if ($row.classList.contains('opened')) {

  var $open_cat = id('opened_order_'+$id);
    if ($open_cat.innerHTML!='') {
      $open_cat.parentNode.removeChild($open_cat);
       }
      $row.classList.remove('opened');
      $target.classList.remove('opened');
} else {
var $data = new FormData();
    $data.append("action", "show_prod");
    $data.append("order_id", $id);

    $row.classList.add('opened');
    $target.classList.add('opened');
    post_z('ajax.php',  $data, function($response) {     
      var $resp=JSON.parse($response); 
     
          $row.insertAdjacentHTML('afterend',  $resp.content);
   
     }) 
  }
}


function prod_info($target){
  var $id = $target.getAttribute('href');

if ($target.classList.contains('prod_opened')) {
  
var $open_info = id('prod_info_'+$id);
    console.log($open_info);
    if ($open_info.innerHTML!='') {
       $open_info.parentNode.removeChild($open_info);
    }
   
    $target.classList.remove('prod_opened');
} else {

var $data = new FormData();
    $data.append("action", "prod_info");
    $data.append("product", $id);
var $row=parent($target, 'tr');
     
    
    post_z('ajax.php',  $data, function($response) {
     $resp=JSON.parse($response);  
    if ($resp.content) {
      $target.classList.add('prod_opened');
        $row.insertAdjacentHTML('afterend',  $resp.content);
    }
   
    if ($resp.notify) {
     notify($resp.message);
    }
  
  
     
     }) 
  }
}
 var $cart_list = '';
function add_in_cart(target){
   $cart_list = id('cart_list');
    var $id = target.getAttribute('href');
    var $data = new FormData();
        $data.append("action", "add_in_cart");
        $data.append("product", $id);       
    post_z('ajax.php',  $data, function($response) {
      if ($response) {         
         $resp=JSON.parse($response);  
        // if ($resp.content) {          
        //      $cart_list.insertAdjacentHTML('afterend',  $resp.content);
        // }
        if ($resp.status = "prod_added") {  
          if ($resp.content) {          
           id('cart_body').insertAdjacentHTML('beforeend',$resp.content);

          } 
          if ($resp.update_count) {          
           id('prod_in_cart_'+$resp.update_count.id).value=$resp.update_count.count;
          }  
          id('itog_summ').innerHTML = $resp.itog_cart.summ;
          id('itog_count').innerHTML = $resp.itog_cart.count_prod;
          if (!id('checkout_box')) {             
           $cart_list.insertAdjacentHTML('beforeend',  '<div class="row" id="checkout_box"><div class="col-xs-12"><a href="checkout" class="btn-flat checkout" data-box="content"><i class="flaticon-check"></i> Оформить заказ</a></div></div>');
        }  
      }
        if ($resp.notify) {
         notify($resp.message);
        }  

       } 
     })  
}




function  wait_action(target){
 var $id = target.getAttribute('href'),
     $action = target.id;

     $count_week=id('count_week');
     $infiniti=id('infiniti');
  
if ($count_week.value>0) {
   $infiniti.checked=false;
}
if ($action=='infiniti') {
      target.checked=true;
     $count_week.value=Number(0);
  
}

if ($action=='minus_week') {
  if ($count_week.value!=0) {
    $count_week.value-=Number(1);
    $infiniti.checked=false;
  } 
  if($count_week.value<1){
    $count_week.value=Number(0);
    $infiniti.checked=true;
  }
  
}

if ($action=='plus_week') { 
    $count_week.value=Number($count_week.value)+1;
    $infiniti.checked=false;
}
  
}

function plus_prod(target){
 cart_action(target);
}

function minus_prod(target){
 cart_action(target);
}
function remove_out_cart(target){
 cart_action(target);
}

function cart_action(target){
  var $id = target.getAttribute('href');
  var $action = target.id;
  var $data = new FormData();
      $data.append("action", $action);
      $data.append("product", $id);    
  var $count = id('prod_in_cart_'+$id);

      if ( $action=='minus_prod') {
        if (id('prod_in_cart_'+$id)=='0') {
          return false;
        }
      }

      // if ($action=='save_count') {
      //   id('action_prod_in_cart_'+$id).getElementsByClassName('plus')[0].classList.remove('inviz')
      //   id('action_prod_in_cart_'+$id).getElementsByClassName('minus')[0].classList.remove('inviz')
      //   id('action_prod_in_cart_'+$id).getElementsByClassName('ok')[0].classList.add('inviz')
      //     $data.append("count", $count.value);       
      // }
    post_z('ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        if ($resp.status=="plus_ok") {
            // $price = id('product_price_'+$id).innerHTML;
            id('itog_summ').innerHTML = $resp.itog_cart.summ;
            id('itog_count').innerHTML = $resp.itog_cart.count_prod;

            // id('itog_summ').innerHTML =  (Number(id('itog_summ').innerHTML)+Number($price)).toFixed(2);            
            // id('itog_count').innerHTML =  (Number(id('itog_count').innerHTML)+1).toFixed(0);            
            $count.value = Number($count.value)+1;
            } 
        if ($resp.status=="minus_ok") {
            id('itog_summ').innerHTML = $resp.itog_cart.summ;
            id('itog_count').innerHTML = $resp.itog_cart.count_prod;
            // $price = id('product_price_'+$id).innerHTML;
            // id('itog_summ').innerHTML =  (Number(id('itog_summ').innerHTML)-Number($price)).toFixed(2);
            // id('itog_count').innerHTML =  (Number(id('itog_count').innerHTML)-1).toFixed(0);  
            $count.value = Number($count.value)-1;

            // if($count.value==Number(0)){
            //           var $del_data = new FormData();
            //               $del_data.append("action", 'remove_out_cart');
            //               $del_data.append("product", $id);
            //             post_z('ajax.php',  $del_data, function($response_d) {
            //                  $resp_d=JSON.parse($response_d);  
            //                  if ($resp_d.status=="remove_ok") {  
            //                   var $tr = id('cart_row_'+$id);        
            //                       $tr.parentNode.removeChild($tr);
            //                     } 
            //                      if ($resp.notify) {
            //                        notify($resp.message);
            //                       }  
            //                } )  
            //       }
            }

        if ($resp.status=="remove_ok") {  
        var $tr = id('cart_row_'+$id);        
            $tr.parentNode.removeChild($tr);
          }  
            id('itog_summ').innerHTML = $resp.itog_cart.summ;
            id('itog_count').innerHTML = $resp.itog_cart.count_prod;
            if($resp.itog_cart.count_prod=='0'){
               id('checkout_box').parentNode.removeChild(id('checkout_box'));
            }

         if ($resp.notify) {
         notify($resp.message);
        }  
        }
    })

}
function cancel_order(target){
var $id = target.getAttribute('href');
var $action = target.id;

  var $data = new FormData();
      $data.append("order_id", $id);
      $data.append("action", $action);
  post_z('ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        
        if ($resp.status=="order_canceled") {  
           console.log( $resp);
          }  

         if ($resp.notify) {
         notify($resp.message);
        }  
        }
      })    
}
function send_mail(){
// var $id = target.getAttribute('href');
// var $action = target.id;

  var $data = new FormData();
 
  $data.append("action", 'send_mail');
  post_z('../ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        
      
           console.log( $resp);


         if ($resp.notify) {
         notify($resp.message);
        }  
        }
      })    
}
function send_mail111(){
// var $id = target.getAttribute('href');
// var $action = target.id;

  var $data = new FormData();
 
  $data.append("action", 'send_mail111');
  post_z('../ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        
      
           console.log( $resp);


         if ($resp.notify) {
         notify($resp.message);
        }  
        }
      })    
}

function delete_propose(){
// var $id = target.getAttribute('href');
// var $action = target.id;

  var $data = new FormData();
 console.log('delete_propose');
  $data.append("action", 'delete_propose');
  post_z('../ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        
      
           console.log( $resp);


         if ($resp.notify) {
         notify($resp.message);
        }  
        }
      })    
}



function clear_cart(){

  var $data = new FormData();
      $data.append("action", 'clear_cart');
      post_z('ajax.php',  $data, function($response) {
        if ($response) {         
         $resp=JSON.parse($response);  
        
        if ($resp.status=="clear_cart_ok") {  
            var $tbody = id('cart_body');        
            $tbody.innerHTML='';
            id('checkout_box').parentNode.removeChild(id('checkout_box'));
            id('itog_summ').innerHTML = 0;
           id('itog_count').innerHTML = 0;
          }  

         if ($resp.notify) {
         notify($resp.message);
        }  
        }
      })
}

function close_panel(target){
   var $id = target.getAttribute('href');

  id($id).parentNode.removeChild(id($id));

  document.cookie=$id+"=closed; path=/;";
}

function reset(){
  var $data = new FormData();
        $data.append("action", "reset_login");
          
    post_z('ajax.php',  $data, function($response) {
        $resp=JSON.parse($response);  
         load('?ajax=1', 'content');

        if ($resp.notify) {
         notify($resp.message);
        }  
    })
}
function logout(){
  var $data = new FormData();
        $data.append("action", "logout");
          
    post_z('../ajax.php',  $data, function($response) {
       $resp=JSON.parse($response);  
        
       if ($resp.notify) {
         notify($resp.message);
        }  
      load('?ajax=1', 'content');
      $btn_logout = id('logout')
      $btn_logout.innerHTML="Вход";
      $btn_logout.href='login';
      $btn_logout.id='login';
      
    })
}
// event.type должен быть keypress
// function getChar(event) {
//   if (event.which == null) {  // IE
//     if (event.keyCode < 32) return null; // спец. символ
//     return String.fromCharCode(event.keyCode) 
//   } 

//   if (event.which!=0 && event.charCode!=0) { // все кроме IE
//     if (event.which < 32) return null; // спец. символ
//     return String.fromCharCode(event.which); // остальные
//   } 

//   return null; // спец. символ
// }

function notify($message, $style){
 if ($style=='' || $style==null) {
   $style='default';
 }

var $notify_box =  id('notify-box');

$all_notify = $notify_box.getElementsByClassName('warning');
for (var i = 0; i < $all_notify.length; i++) {
  if ($all_notify[i].innerHTML == '<div class="close_notify">Нажми чтобы закрыть</div>'+$message) {
    console.log('test');
  }
}
  var $notify = document.createElement('div');
      $notify.className = "notify_block new "+$style;
      $notify.insertAdjacentHTML('afterbegin', $message);
     

      setTimeout(function(){$notify.classList.remove('new');},200);
      if ($style=='default' || $style!='warning') {
        $notify_box.appendChild($notify);
        setTimeout(function(){$notify.classList.add('new');},3000);
        setTimeout(function(){$notify.parentNode.removeChild($notify);},4000);
       }

      if ($style=='warning') {
        // $all_notify = $notify_box.getElementsByClassName('warning');
        //   for (var i = 0; i < $all_notify.length; i++) {
        //     if ($all_notify[i].innerHTML == '<div class="close_notify">Нажми чтобы закрыть</div>'+$message) {
        //       $all_notify[i].classList.add('new');
        //       setTimeout(function(){$all_notify[i].parentNode.removeChild($all_notify[i]);},1000);
        //     }
        //   }
         $notify_box.appendChild($notify);
         $notify.insertAdjacentHTML('afterbegin', '<div class="close_notify"><i class="flaticon-close"></i></div>');
         $notify.onclick=function(){
          $notify.classList.add('new');
          setTimeout(function(){$notify.parentNode.removeChild($notify);},1000);
         }
       }
       
}

function reaply(target){
 $form_id = target.getAttribute('href');
 $form= document.forms[$form_id];
  $form.classList.remove('hide');
 document.onclick = function(event){
var event = event || window.event;
var target = event.target || event.srcElement;

  if (parent(target, 'form').name !==  $form_id) {   
    document.forms[$form_id].classList.add('hide');
     this.onclick=null;
     $form_id = $form = null;
  }  
 }
}

function delete_post($target){
  
  $post_id = $target.getAttribute('href');
  params = "action=delete_post&post_id="+$post_id;
  post('ajax.php', params, function($response) {
     $resp=JSON.parse($response);
     if ($resp.status=="post_deleted") {
      $removed_block=parent_by_selector($target, 'panel');
      $removed_block.parentNode.removeChild($removed_block);
      } 
  }) 
}
function hide_post($target){
  console.log('hide_post');
  $post_id = $target.getAttribute('href');
  params = "action=hide_post&post_id="+$post_id;
  post('ajax.php', params, function($response) {
     $resp=JSON.parse($response);
     if ($resp.status=="post_hided") {
       $target.id="show_post";
       console.log( $target.children);
        $target.children[0].className = 'flaticon-show';
        $target.children[1].innerHTML = 'Опубликовать пост';
      // $removed_block=parent_by_selector($target, 'panel');
      // $removed_block.parentNode.removeChild($removed_block);
      } 
  }) 
}
function show_post($target){
  console.log('show_post');
  $post_id = $target.getAttribute('href');
  params = "action=show_post&post_id="+$post_id;
  post('ajax.php', params, function($response) {
     $resp=JSON.parse($response);
     if ($resp.status=="post_showed") {
       console.log( $target.children);
        $target.id="hide_post";
        $target.children[0].className = 'flaticon-hide';
        $target.children[1].innerHTML = 'Скрыть пост';
      // $removed_block=parent_by_selector($target, 'panel');
      // $removed_block.parentNode.removeChild($removed_block);
      } 
  }) 
}
function edit_post($target){
  console.log('edit_post');
  $post_id = $target.getAttribute('href');
  $panel =  parent_by_selector($target, 'panel');
  console.log($panel);
  // $panel.insertAdjacentHTML('afterBegin', '');
  $panelContent = $panel.getElementsByClassName('panel-content');
   $panelContent[0].insertAdjacentHTML('afterBegin', '<form action="edit_post" name="edit_post" id="'+$post_id+'"><div class="panel-heading"><div class="panel-title"><input type="text" name="post_title" class="full-width" placeholder="Напиши тут новый заголовок"></div></div><label for="post_text">Можешь что то написать </label><textarea name="text" id="post_text"></textarea>   <div id="video_wrapper" class="row_1"></div></div>  <div class="drag-tips" id="drop_zone"><output id="list" class="list"></output><span class="upload_drop_label" id="upload_drop_label">Перетащи сюда фотографии, или кликни чтобы выбрать и загрузить их</span><label for="file" class="file_label" id="file_label"><input type="file" id="file" class="hide"  multiple></label> </div><div class="col-xs-12 text-right"><a href="add_video" id="add_video" class="btn-flat">Добавить видео</a><button type="submit" name="edit" class="btn-flat">СОХРАНИТЬ</button></form>');
 
}


function FileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
// if (id('drop_zone')) {
//   id('drop_zone').classList.add('hide');
// }

var data_files="";
if (evt.type=="change") {  
  var files = evt.target.files;
} else if (evt.type == 'drop') {
  var files = evt.dataTransfer.files ;
}
    // files = evt.target.files, 
    console.log(this);
var $form = parent(this, 'form'),
    $list= $form.getElementsByClassName("list")[0]; 

if (parent(this, 'form').name == 'prod_desc') {
    var $prod_id = parent(this, 'form').id;  
}

for (var i = 0, file; file = files[i]; i++) {

if (!file.type.match('image.*')) {
  continue;
}
   
    var reader = new FileReader();    
    var data = new FormData();
    data.append("prod_id", $prod_id);
    data.append("action", 'upload_photo_prod');
    data.append("file_name", file);


reader.onloadend = (function(thefiles) {  
return function(e) {  
        var img = new Image();   
        
        img.src = e.target.result;
img.onload = function(){
        $type = thefiles.type;
        $file_name= thefiles.name;
        var MAX_WIDTH = 1200;
        var MAX_HEIGHT = 1200;
        var tempW = img.width;
        var tempH = img.height;

        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
               tempH *= MAX_WIDTH / tempW;
               tempW = MAX_WIDTH;              
            }

        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }

        }    
 
        var $canvas = document.createElement('canvas');
        $canvas.width = tempW;
        $canvas.height = tempH;
        var ctx = $canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        resized = $canvas.toDataURL($type);

            var postdata = new FormData();
            postdata.append("action", 'upload_photo_prod');
            postdata.append("file", resized);
            postdata.append("file_prefix", "full_");
            postdata.append("file_name",  thefiles.name);
            postdata.append("prod_id", $prod_id);

            //upload_img(postdata);
        post_z('ajax.php', postdata,  function($response) {
              // console.log($response);
            });


        var img_t = new Image();   
        img_t.src = resized;
       
img_t.onload = function(){
        var MAX_TWIDTH = 200;
        var MAX_THEIGHT = 200;
        var tempW = img_t.width;
        var tempH = img_t.height;

        if (tempW > tempH) {
            if (tempW > MAX_TWIDTH) {
               tempH *= MAX_TWIDTH / tempW;
               tempW = MAX_TWIDTH;              
            }

        } else {
            if (tempH > MAX_THEIGHT) {
               tempW *= MAX_THEIGHT / tempH;
               tempH = MAX_THEIGHT;
            }

        }    
      var $canvas_thumb = document.createElement('canvas');

        $canvas_thumb.width = tempW;
        $canvas_thumb.height = tempH;
      var ctx = $canvas_thumb.getContext("2d");
          ctx.drawImage(img_t, 0, 0, tempW, tempH);
          thumb =  $canvas_thumb.toDataURL($type);   
            
        var postdata = new FormData();
            postdata.append("action", 'upload_photo_prod');
            postdata.append("file", thumb);
            postdata.append("file_prefix", "thumb_");
            postdata.append("file_name",  thefiles.name);
            postdata.append("prod_id", $prod_id);
        
         post_z('ajax.php', postdata,  function($response) {
         
          data_files= JSON.parse($response); 
          var div = document.createElement('div');
          div.className = 'thumb_wrap';
          // console.log(this);
          $list.insertBefore(div, null);             
          div.innerHTML = ['<div class="remove"><a id="remove" data-filename="'+data_files.remov_link+'"><img src="template/img/close.gif" alt="" /></a></div><img class="thumb" src="upload/thumbs/',  data_files.file_name, '" title="thumb_', escape($file_name), '"/>'].join('');          
          });
      

            //data_files = upload_img(postdata);
            // console.log(data_files);
            
           // console.log(data_files);
            //console.log(data_files.file_name);
        }   
    }   
 };
})(file);
reader.readAsDataURL(file);
   }  
}



function upload_img(postdata){
    var ajaxReq = new getAjax(),  $data_x;
      ajaxReq.open("POST", "ajax.php", true);
          ajaxReq.send(postdata);
          ajaxReq.onreadystatechange = function() {
          if (ajaxReq.readyState == 4) {
            if(ajaxReq.status == 200) {   
           $data_x = JSON.parse(ajaxReq.responseText);
                  // console.log(ajaxReq.responseText);  
                 
                }
            }
          }
          console.log($data_x);
           
 
}


  // function DragOver(evt) {
  //   evt.stopPropagation();
  //   evt.preventDefault();
  //   this.classList.add('hover');
  //   evt.dataTransfer.dropEffect = 'copy';
  // }



document.addEventListener('dragover', function(event){
  event.stopPropagation();
  event.preventDefault();
  var event = event || window.event;
  var target = event.target || event.srcElement;
  // console.log(target);

if (target.id=="drop_zone" || parent(target, "form")) {  
    // console.log('687 drop_zone');
    target.ondrop = FileSelect;
  }

  // if (id('drop_zone')) {
  //     // id('drop_zone').classList.remove('hide');
 
  //   var $dropZone = id('drop_zone');
  //     // if (target.id == 'drop_zone') {
  //     //   id('upload_hover_label').classList.remove('hide');
  //     //   id('upload_drop_label').classList.add('hide');
  //     // } else if (target.id != 'drop_zone'){
  //     //   id('upload_hover_label').classList.add('hide');
  //     //   id('upload_drop_label').classList.remove('hide');
  //     // }    

  //     $dropZone.ondrop = FileSelect;
  
  // }
}, false);

