"use strict";
console.log("документ готов")
document.addEventListener("DOMContentLoaded", function(event) {
	 // var today = new Date();
  console.log("документ готов");
  // console.log(today.getMonth());
  // console.log(today.getDate());
  // console.log(today.getDay());
  	// calendar();
	// console.log(calendar());
});

 document.addEventListener('click', function(event) {
var event = event || window.event;
var target = event.target || event.srcElement;

console.log(target);
while(target != this){
    console.log(target);
	// console.log(target.tagName == "A" && target.nodeName.toLowerCase() === 'a');
	if (target.tagName == "A" && target.nodeName.toLowerCase() === 'a'){
		event.preventDefault();
		event.stopPropagation();
		// event.stopImmediatePropagation();
		var $href = target.href,
			$action = target.dataset.action;

		console.log("$href " + $href);
		console.log("$action " + $action);
		console.log("target.parentNode " + target.parentNode);

        var $urlparam = new URLSearchParams($href.search);

        if ($action !=null && $action !=""){ //добавляем параметры action в get запрос
            $urlparam.append('action', $action);
            $href = $href+"?"+$urlparam.toString();
        }

		console.log($href);

        fetch($href)
        	  .then(function(response) {

        	  	return response;

        	  }).then(function(data) {
        	  	console.log(data);
        	  // 	target.insertAdjacentHTML("afterEnd", data.content);
        	  //   target.classList.add("close_time")
        	  //   // target.classList.remove("close_time");
        		// var $plus_minus=target.querySelector(".flaticon-plus");
        		// console.log($plus_minus);
        		//  $plus_minus.classList.remove("flaticon-plus");
        		//  $plus_minus.classList.add("flaticon-minus");

        	  }).catch(function(error) {

        	    console.log('Request failed', error);

        	  });
		// if (target.classList.contains("close_time")) {
			
		// 	target.nextSibling.remove();
		// 	console.log(target.nextSibling);
		// 	target.classList.remove("close_time");
		// 	var $plus_minus=target.querySelector(".flaticon-minus");
		// 	console.log($plus_minus);
		// 	 $plus_minus.classList.remove("flaticon-minus");
		// 	 $plus_minus.classList.add("flaticon-plus");
		// console.log(target);
		// console.log(target.dataset.prodId);
		if ($action==='more') {
			var $target_wraper=target.dataset.prodId;
			document.getElementById('wrap_'+$target_wraper).classList.toggle('full');

		}
		// if (target.classList.contains("close_time")){
        //
		// } else {
		// 	fetch($href+".json")
		// 	  .then(function(response) {
        //
        //
		// 	  	return response.json();
        //
		// 	  }).then(function(data) {
		// 	  	target.insertAdjacentHTML("afterEnd", data.content);
		// 	    target.classList.add("close_time")
		// 	    // target.classList.remove("close_time");
		// 		var $plus_minus=target.querySelector(".flaticon-plus");
		// 		console.log($plus_minus);
		// 		 $plus_minus.classList.remove("flaticon-plus");
		// 		 $plus_minus.classList.add("flaticon-minus");
        //
		// 	  }).catch(function(error) {
        //
		// 	    console.log('Request failed', error);
        //
		// 	  });
		// }
	return;}

	console.log(target);
	target = target.parentNode;
};	

fetch('test.json')
  .then(function(response) {

  	return response.json();

  }).then(function(data) {

    console.log(data.title); 

  }).catch(function(error) {  

    console.log('Request failed', error); 

  });

}, true);