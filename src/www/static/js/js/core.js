
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
ajaxReq.addEventListener("progress", updateProgress, false);
ajaxReq.addEventListener("load", loaded, false);

var $data = new FormData($form), $action = $form.getAttribute('action'); 
     $data.append("action", $action);
     $data.append("name", $form.getAttribute('name'));   
     $data.append("id", $form.id);   


ajaxReq.open("POST", $action, true);  

if (id('proces_loader').classList.contains('inviz')) {
  id('proces_loader').classList.remove('inviz');
}


ajaxReq.send($data);
ajaxReq.onreadystatechange = function() {
  if (ajaxReq.readyState == 4) {
    if(ajaxReq.status == 200) {
      if (ajaxReq.responseText) {
      console.log(ajaxReq.responseText);
  
      // id('console').innerHTML="<pre>"+ajaxReq.responseText+"</pre>";
      // id('console_body').insertAdjacentHTML("beforeEnd", "<pre>"+ajaxReq.responseText+"</pre>")
   
     var $response = JSON.parse(ajaxReq.responseText);
     if ($response) { 

    
      if (window[$response.action]) {
        window[$response.action]($response.response);
      } 
      if ($response.insert) {
       insert($response.insert);
      }

      if ($response.notify) {
          notify($response.notify);      
      } 
      if ($response.status=='ok') {
        $form.reset();
      }
        
      }   
      }   
     }
   }
  }
}





var updateProgress=(function(e) {  

  return function(e) {
      if (id('proces_loader').classList.contains('inviz')) {   
        id('proces_loader').classList.remove('inviz');
     }
  };
 })();

var loaded=(function(e) { 

   return function(e) {
   setTimeout(function(){id('proces_loader').classList.add('inviz');},300); 
  };
 })();


function post(url, params,  func) { 
var ajaxReq = getAjax();
ajaxReq.addEventListener("progress", updateProgress, false);
ajaxReq.addEventListener("load", loaded, false);
ajaxReq.open("POST", url, true);    

   if (id('proces_loader').classList.contains('inviz')) {
        id('proces_loader').classList.remove('inviz');
     }
    ajaxReq.send(params);

  ajaxReq.onreadystatechange = function() { 
   
    if (ajaxReq.readyState == 4) {
      if(ajaxReq.status == 200) {
      
        return func(ajaxReq.responseText);
       
        }
      }
    };
  };


// function post(url, params, whattado) { 
//   var ajaxReq = getAjax();
//     ajaxReq.open("POST", url, true);
//     ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//     ajaxReq.send(params);

//   ajaxReq.onreadystatechange = function() { 
//     if (ajaxReq.readyState == 4) {
//       if(ajaxReq.status == 200) {
//         whattado(ajaxReq.responseText);
        
//         }
//       }
//     };
//   };


function get(url, whattado, initEvent) {
  var ajaxGet = getAjax();
  ajaxGet.addEventListener("progress", updateProgress, false);
  ajaxGet.addEventListener("load", loaded, false);
   if (id('proces_loader').classList.contains('inviz')) {
        id('proces_loader').classList.remove('inviz');
     }
  ajaxGet.open("GET", url+'?action=nav', true);
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
  var $data;
    get(url, function(src){//запрашиваем данные с сервера
        $response = JSON.parse(src);
       


        $element.innerHTML = $response.content;
        if ($response.item) {
        if ($response.target_box) {
                id($response.target_box).innerHTML = $response.item;
            }
        } 
        if (window[$response.action]) {
    
        if ($response.response) {
          window[$response.action]($response.response);
        } else  window[$response.action]();
        

        if ($response.notify) {
          notify($response.notify);      
        } 
       
      }

      }, initEvent);  


};

function onLoad(e) {  
  // if (id('price')) {
  //   document.getElementById('price').addEventListener('change', FileSelect, false);
  // }  

// baguetteBox.run('.gallery'); //1424192029

};

function activ(target, callback){

var $data = new FormData();
    $data.append("action", target.getAttribute('href')); 
   if (target.id) {
      $data.append("id", target.id); 
   }
    if (target.dataset) {
     
      $data.append("params", JSON.stringify(target.dataset)); 
   }

post('index.php',  $data, function($responsed) {
    
  if ($responsed) {
    
    var $response=JSON.parse($responsed); 

      if ($response.insert) {
        if ($response.insert!='') {
           insert($response.insert);
        }      
      }
      //  if ($response.eval) {
      //   console.log($response.eval);
      // eval($response.eval);
      //  console.log($next_page_loaded);
      // }

      if (window[$response.action]) {
    
        if ($response.response) {
          window[$response.action]($response.response);
        } else  window[$response.action](target);
       
      }

      if ($response.notify) {
          notify($response.notify);      
      } 
      
  }
     callback($response);
  });
  // chang_attr(target);
}

function chang_attr(target){
  console.log(target);
  if (target.getAttribute('href')=="showrefs") {
    target.href="hiderefs";
    return;
  } 
  if (target.getAttribute('href')=="hiderefs") {
     target.href="showrefs";
     return;
  } 

}

function hiderefs(target){
  $tr = id('referals_'+target.id);
   $tr.parentNode.removeChild($tr);
   target.href="showrefs";

}

function id(elem, parent){
  if(!parent){
    var $parent = document;
  } else var $parent = parent;
  var $nodeElem = $parent.getElementById(elem);
  return $nodeElem;
}
function parent(elem, tags) { 
while(elem.tagName.toLowerCase() != tags) {
    if(elem.tagName.toLowerCase() == 'html'){
       return false;
      } else elem = elem.parentNode;
}
return elem;
};

function parent_by_class(elem, selector) { 
  while(!elem.classList.contains(selector) ) {   
    if(elem.tagName.toLowerCase() == 'html'){
       return false;
      }
   elem = elem.parentNode;
}
return elem;
};

var myScroll=[];
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

// /////////////////////////////////////////////////////////////////////
/////////////////// Функции действи

function heightLeftNav(){
  window.onresize = heightLeftNav;
  if (myScroll.length>0) {
    for (var i = 0; i < myScroll.length; i++) {
      myScroll[i].refresh();      
    }
  };  
};

function closed_console(){
  console.log(document.getElementById('console'));

if (document.getElementById('console').classList.contains('closed')) {
  document.getElementById('console').classList.remove('closed');
} else document.getElementById('console').classList.add('closed');
//  document.getElementById('console').className += (document.getElementById('console').classList.contains('close') ? '' : 'close');
};

function clear_console (){
  id('console_body').innerHTML="";
  }

function toogleSide(target){
    
       var $sidebar = target.id;
       var $body = document.getElementById('body');
    
       if ($sidebar === "leftside" ) {        
        if ($body.classList.contains("left-mini")){
        $body.classList.remove("left-mini");
          // setTimeout(function() {
            id('left-side-bar').classList.remove("leftmini");         
           // } ,4350); 
        document.cookie="left-mini=0; path=/; expires=1000000";
         
        } else {
          $body.classList.add("left-mini");
        document.cookie="left-mini=1; path=/; expires=100000";
         
        setTimeout(function() {
            id('left-side-bar').classList.add("leftmini");    
           } ,500);
          };                    
       };
        if ($sidebar === "rightside" ) {          
        if ($body.classList.contains("right-mini")){
        $body.classList.remove('right-mini');
        document.cookie="right-mini=0; path=/; expires=100000";
        
        } else  {$body.classList.add('right-mini');
        document.cookie="right-mini=1; path=/; expires=100000";
        
       };     
};
setTimeout(function() {
  heightLeftNav();
} ,160);      
};

function open_sub_menu(target){

          var $subParent = target.nextElementSibling;
          var $heightsuParent = 55*($subParent.children.length+1)
            
          if (target.classList.contains('flaticon-plus')) {
          
              target.classList.remove('flaticon-plus');
              target.classList.add('flaticon-minus');
          } else {
            target.classList.remove('flaticon-minus');
            target.classList.add('flaticon-plus');
            
          }
            var $subMenu = target.parentNode;
            console.log($subMenu);
             if(!$subMenu.classList.contains('opened')){
                for (var s = 0, l = $subMenu.length; s < l; s++) {
                  $subMenu[s].classList.remove('opened');
                  $subMenu[s].style.height="";
                };
                $subMenu.classList.add('opened');
                $subMenu.style.height=$heightsuParent+'px';
             } else {
              $subMenu.style.height="";
              $subMenu.classList.remove('opened');
              }
                setTimeout(function() {
            heightLeftNav();         

           } ,160);

        
}
function open_subcategory(target){
  var  $subcategory=id('level_'+target.id);
  var $height = 55*($subcategory.children.length+1);
  $filter=id('left_content');
  var open= $filter.getElementsByClassName('opened');
  console.log(open);
         var $subMenu = target.parentNode;
            console.log(!$subMenu.classList.contains('opened'));
            console.log($subMenu.classList.contains('opened'));
            console.log($subMenu);
             if(!$subMenu.classList.contains('opened')){
                if (open.length>=1) {
                  for (var i = 0; i < open.length; i++) {  
                           var op=open[i];
                          op.style.height= op.offsetHeight+'px';
                          op.classList.remove('opened'); 
                          var xt = setTimeout(function() {
                          console.log(op);                          
                          op.style.height="";
                           clearTimeout(xt);
                           } ,5);
                          
                  }    
                }
                
                $subMenu.style.height=$height+'em';
                $subMenu.classList.add('opened');
                var $t=setTimeout(function() {
                   $subMenu.style.height='';
                    clearTimeout($t);
                  } ,300);
               
             } else {
                $subMenu.style.height=$subMenu.offsetHeight+'px';
               var $x= setTimeout(function() {
                  $subMenu.style.height="";
                  $subMenu.classList.remove('opened');
                  clearTimeout($x);
                   } ,10);               
              }   

}





function notify($data){
var $notify_box =  id('notify-box');
// console.log($data);
$all_notify = $notify_box.getElementsByClassName('warning');
for (var i = 0; i < $all_notify.length; i++) {
  if ($all_notify[i].innerHTML == '<div class="close_notify">Нажми чтобы закрыть</div>'+$data.message) {
    console.log('test');
  }
}
  var $notify = document.createElement('div');
      $notify.className = "notify_block new "+$data.style;
      $notify.insertAdjacentHTML('afterbegin', $data.message);
     

      setTimeout(function(){$notify.classList.remove('new');},200);
      if ($data.style=='default' ||$data.style!='warning') {
        $notify_box.appendChild($notify);
        setTimeout(function(){$notify.classList.add('new');},3000);
        setTimeout(function(){$notify.parentNode.removeChild($notify);},4000);
       }

      if ($data.style=='warning') {
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
    // console.log(this);
var $form = parent(this, 'form'),
    $list= $form.getElementsByClassName("list")[0]; 

if (parent(this, 'form').name == 'prod_desc') {
    var $prod_id = $form.id;  
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
          // console.log(img);
img.onload = function(){
     
        $type = thefiles.type;
        // console.log($type);
        $file_name= thefiles.name;
        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 800;
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
        if (img.width>=800) {
          var $canvas = document.createElement('canvas');
        $canvas.width = tempW;
        $canvas.height = tempH;
        var ctx = $canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        resized = $canvas.toDataURL('image/jpeg');
        } else  if (img.width<800) {
          var $canvas = document.createElement('canvas');
            $canvas.width = img.width;
            $canvas.height = img.height;          
            var ctx = $canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);           
            resized = $canvas.toDataURL('image/jpeg');
           console.log(img);
        }
 
        

          var postdata = new FormData();
            postdata.append("action", 'upload_photo_prod');

            postdata.append("file", resized);
            // postdata.append("file_prefix", "full_");
            postdata.append("file_name",  thefiles.name);
            postdata.append("prod_name",  $form.product_name.value);
            postdata.append("prod_id", $prod_id);

     
        post_z('ajax.php', postdata,  function($response) {
         
          data_files= JSON.parse($response); 
           if (id('multi_prod_img')) {
            id('multi_prod_img').value=data_files.file_name;
          }
          var div = document.createElement('div');
          div.className = 'thumb';         
          $list.insertBefore(div, null);             
          div.innerHTML = ['<div class="remove"><a class="test" id="remove_img" data-filename="'+data_files.remov_link+'"><img src="template/img/close.gif" alt="" /></a></div><img class="thumb" src="upload/thumbs/thumb_',  data_files.file_name, '" title="thumb_', escape($file_name), '"/>'].join('');          
          $list=div=null;
            });
 
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


// функции вызываемые после ответа сервера

function authorize($user_data)
{
  // console.log($user_data);
  
  id('unknow_ava_for_auth').parentNode.removeChild(id('unknow_ava_for_auth'));
 
  if (typeof window.target_page == 'undefined') {
    load(window.location.pathname, 'content');
  }
  
Velocity( id('wrapper_auth'),"slideUp", {duration: 300 });  
id('usrblock').classList.add("autorized");
  setTimeout(function() {   
    id('wrapper_auth').parentNode.removeChild(id('wrapper_auth'));
  } , 500);

  id("user_ava_for_auth").style.top=0;


  id('profile_li').insertAdjacentHTML("beforeEnd", '<a href="open_sub_menu"  class="action flaticon-plus open_sub_menu"></a><ul  class="sub-menu "><li class="nav_li"><a href="setting" ><i class="icon-setting"></i><div class="name-menu">Мои настройки</div></a></li></ul>');

  id('profile_li').children[0].href=$user_data.frax_name;
  //console.log(Id('vkauth'));

};

function exit(){
 window.location.reload("true");
}

function anim_userblock($user_data){
//console.log($user_data);
    if ($user_data.photo_big!=undefined) {
      id('user_ava_for_auth').src=$user_data.photo_big;

      Velocity( id('unknow_ava_for_auth'), { 
          top:-100});   
      Velocity( id('user_ava_for_auth'), { 
          top:-100});
      // TweenMax.to(Id('unknow_ava_for_auth'), 0.5, {top:-100, ease: Linear.ease })
      // TweenMax.to(Id('user_ava_for_auth'), 0.5, {top:-100, ease: Linear.ease })
      
    } 
    
    if ($user_data == "newuser" ) {
      // console.log($user_data);
      id('mess_auth').innerHTML="Логин свободен, придумайте пароль"
    } else if ($user_data !="newuser" || $user_data !="usr_reg" ) {
      // console.log($user_data);
    id('mess_auth').innerHTML=$user_data.first_name+"<br>Это Вы? Введите пароль! <br> Или придумайте другой логин";
    
    } else if ($user_data =="usr_reg" ){
      id('mess_auth').innerHTML=$user_data.first_name+"Поздравляем !Вы успешно зарегистрировались";
    }
    
}

function insert($data){
  // console.log('insert new data');
for (var i = 0; i <$data.length; i++) {
  id($data[i].insert_block).insertAdjacentHTML($data[i].insert_position,$data[i].insert_element);
}
  // id($data.insert_block).insertAdjacentHTML($data.insert_position,$data.insert_element);
 
}


// Расположение элемнетов фрактала по кругу

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

