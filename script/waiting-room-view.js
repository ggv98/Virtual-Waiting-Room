// TODO rename to teacher-room.js

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('roomId');

// attach event handler onclick on the welcomeButton

function updatePageDetails(){

    var url = 'src/api.php/get-room-details';
    var room = {
        roomId
    }

    var settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(room)}`
    };
    var res = fetch(url, settings)
        .then(response => response.json())
        .then(response => loadDeatails(response))
        .catch(error => console.log(error));
}

updatePageDetails()
setInterval(function() {
    updatePageDetails();
 }, 10000);

function loadDeatails(response) {
    if (response['success']) {
        loadRoomDetails(response['data']["room"]);
        loadWaitingTimeLeft(response['data']["room"]);
        loadQueue(response['data']['queue']);

    } else {
        window.location = "student-home-page.html";

    }
}

function loadRoomDetails(room){
    var roomName = room['title'];
    var subject = room['subject'];
    var message = room['message'];
    if (!message){
        message = "Няма съобщение за показване";
    }
    document.getElementById('room_name').innerHTML= "Стая: " + roomName;
    document.getElementById('room_subject').innerHTML= "Предмет: " + subject;
    document.getElementById('message').innerHTML= message;
}

function loadWaitingTimeLeft(room) {
    if (examHasStarted(room)) {
        removeClockFromDisplay();
        showWelcomeButton();
    } else {
        var meetTime = new Date(room['startTime']);
        var currentTime = new Date ();
        var leftTime = convertMilliSecondsToHourandMinutes(meetTime - currentTime);
        document.getElementById('timer').innerHTML= leftTime;
    }
}

function examHasStarted(room) {
    var meetTime = new Date(room['startTime']);
    var currentTime = new Date ();
    var secondsLeft = meetTime - currentTime;

    if (secondsLeft < 0) {
        return true;
    } else {
        return false;
    }
}

// TODO call it on interval of 1 min
function updateStudentsQueue() {
    if (thereIsStudentInTheRoom()) {
        // get start time (maybe this would be some global var), compare with current time 
        // and eventually offset other students
    }
}

function thereIsStudentInTheRoom() {
    // TODO
    return false;
}

function onStudentEnter() {
    // Set the view with his image and name
    //   and cache the start time (and use it to check if there is already expiration of 
    //   time, and if such expiration exists then offset all the rest students' starting exam hours)
}

function showWelcomeButton() {
    document.getElementById("welcome-student-button").style.display = "inline-block";
}

function removeClockFromDisplay() {
    document.getElementById("timer-circle").style.display = "None";
}

function convertMilliSecondsToHourandMinutes(miliseconds){
    var seconds = parseInt(miliseconds/1000, 10); 
    var sign = '';
    if (seconds<0){
        seconds = seconds*-1;
        sign = '-';
    }  

    var days = Math.floor(seconds / (3600*24));
    if (days>3){
        return (days + "дни");
    }
    var hrs  = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;
    return(sign + hrs+":" + mnts.toString().padStart(2, "0"));
}

function loadQueue(queue){
    clearQueue();
    if (queue.length > 5){
        queue = queue.slice(0, 5)
    }

    for (queueElement of queue){
        createElement(queueElement, queue.indexOf(queueElement));
    }

}

function clearQueue(){
    var queue = document.getElementById("queue");
    queue.innerHTML = "";
    var title = document.createElement("p");
    title.classList.add("section-title");
    title.innerHTML = 'Опашка от чакащи';
    queue.appendChild(title)
}

function createElement(elem, index){
    var userName = elem['firstName'] + ' ' + elem['lastName'];
    var queueIndex = index + 1;
    var userImageUrl = "storage/"+ elem['Image'];


    var queueElem = document.createElement("div");
    queueElem.classList.add("queue-element");

    var image = document.createElement("img");
    image.classList.add("user-image");
    image.src = userImageUrl;
    queueElem.appendChild(image);

    
    var name = document.createElement("p");
    name.classList.add("name");
    name.innerText =  userName;
    queueElem.appendChild(name);


    var number = document.createElement("p");
    number.classList.add("number");
    number.innerText = queueIndex;
    queueElem.appendChild(number);

    document.getElementById("queue").appendChild(queueElem);
}
