
function initClock() {

    //Get Date/Time
    var currentDate = new Date();

    var date = addZero(currentDate.getDate());
    var year = currentDate.getFullYear();

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[currentDate.getMonth()];

    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = dayNames[currentDate.getDay()];

    var clock = document.getElementById('clock');
    var time = new Date();

    var hours = addZero(time.getHours());
    var minutes = addZero(time.getMinutes());
    var seconds = addZero(time.getSeconds());

    //HTML input 
    document.getElementById("date").innerHTML = day + ", " + date + " " + month + " " + year + " | " + hours + ":" + minutes + ":" + seconds;

}

setInterval(initClock, 1000);

function addZero(number) {

    if (number < 10) {
        number = "0" + number;
    }

    return number;

}