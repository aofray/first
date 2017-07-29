
function montharr(m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11) {
  this[0] = m0;
  this[1] = m1;
  this[2] = m2;
  this[3] = m3;
  this[4] = m4;
  this[5] = m5;
  this[6] = m6;
  this[7] = m7;
  this[8] = m8;
  this[9] = m9;
  this[10] = m10;
  this[11] = m11;
}
function calendar() {
  var monthNames = "   ЯнвФевMaрАпрMaйИюнИюлАвгСенОктНояДек";
   var today = new Date();
   var thisDay;
  var monthDays = new montharr(31, 28, 31, 30, 31, 30, 31, 31, 30,31, 30, 31);
  var year = today.getYear();
  if (year < 2000)
    year = year + 1900;
  thisDay = today.getDate();
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
    monthDays[1] = 29;
  var nDays = monthDays[today.getMonth()];
  var firstDay = today;
  firstDay.setDate(1);
  var testMe = firstDay.getDate();
  if (testMe == 2)
    firstDay.setDate(0);
  var startDay = firstDay.getDay();
  var $cal="";
  $cal+="<div class='mohth'>";
  $cal+="<div class='calendar_tabl'>";
  $cal+="<div>";
  $cal+=monthNames.substring(today.getMonth() * 3 + 3, (today.getMonth() + 1) * 3 + 3);
  $cal+=". ";
  $cal+=year;
  $cal+="</div>";
  $cal+="<div class='name_day'><div>Вск</div> <div>Пон</div> <div>Вт</div> <div>Ср</div> <div>Чт</div> <div>Пт</div> <div>Сб</div></div>" ;
  $cal+="<div class='nedel'>";
  var column = 0;
  console.log(startDay);
  for (var i = 0; i < startDay; i++) {
  	$cal+="<div class='empty_day'></div>";
    column++;
  }
  for (i = 1; i <= nDays; i++) {
    // $cal+="<div class='day'>";
    console.log("i "+i);
    console.log("column "+column);
   if (column == 0) {
   	 $cal+="<div class='nedel'>";
   	$cal+="<div class='day'>";
   } else {
   	 $cal+="<div class='day'>";
   }
    if (i == thisDay){
         $cal+="<span style = 'color: red;'>";
        $cal+=i;
        $cal+="</span>"
        
       } else {
       	 $cal+=i;
       }
	column++;

     $cal+="</div>";    
    if (column == 7) 
    {
      $cal+="</div>";
      column = 0;
      // $cal+="<div class='nedel'>";
    }
  }
  $cal+="</div>";
  $cal+="</div>";
   var calendarElem = document.getElementById('calendar');
   calendarElem.innerHTML = $cal;
};
