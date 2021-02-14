// TODO rename to teacher-room.js

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('roomId');

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
 }, 5000);

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
        message = "";
    }
    document.getElementById('room_name').innerHTML= "Стая: " + roomName;
    document.getElementById('room_subject').innerHTML= "Предмет: " + subject;
    document.getElementById('message-box').innerHTML= message;
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

    
    var userInfoSection =  createUserInfoSection(elem)
    queueElem.appendChild(userInfoSection);


    var number = document.createElement("p");
    number.classList.add("number");
    number.innerText = queueIndex;
    queueElem.appendChild(number);

    document.getElementById("queue").appendChild(queueElem);
}

function createUserInfoSection(elem){
    var userInfoSection = document.createElement("div")
    userInfoSection.classList.add("user-info-section")

    var name = elem['firstName'] + ' ' + elem['lastName'];
    var nameElem = document.createElement("p");
    nameElem.classList.add("name");
    nameElem.innerText =  name;

    userInfoSection.appendChild(nameElem);

    
    var fn = "Фн: " + elem['facultyNumber'];
    var fnElem = document.createElement("p");
    fnElem.classList.add("fn");
    fnElem.innerText =  fn;
    
    userInfoSection.appendChild(fnElem);

    var reason = "Причина: " +  elem['reason'];
    var reasonElem = document.createElement("p");
    reasonElem.classList.add("reason");
    reasonElem.innerText =  reason;
    
    userInfoSection.appendChild(reasonElem);


    var speciality = getSpecialityName(elem["speciality"]);
    var specialityElem = document.createElement("p");
    specialityElem.classList.add("speciality");
    specialityElem.innerText =  speciality;
    
    userInfoSection.appendChild(specialityElem);

    return userInfoSection
}

function getSpecialityName(name){
    switch (name) {
        case 'CS':
            return "Компютърни науки";
            break;

        case 'mat':
            return "Математика";
            break;

        case 'inf':
            return "Математика";
            break;

        case 'IT':
            return "Информационни технологии";
            break;
            
        case 'MatandInf':
            return "Математика и информатика";
            break;
                        
        case 'Stat':
            return "Статистика";
            break;
        
        default:
            return "";
      
      }
}

//Messages submit
const submitMsgBtn = document.getElementById('message-submit');
submitMsgBtn.addEventListener('click', uploadMessage);

function uploadMessage(event){
    event.preventDefault();
    message = document.getElementById("message-box").value;
    pauseInMinutes = document.getElementById("pause-field").value % 60;


    pauseString = "00:" + pauseInMinutes.toString().padStart(2, "0") + ":00";

    var url = 'src/api.php/update-message';
    var message = {
        roomId,
        message,
        pauseString
    }

    var settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(message)}`
    };

    fetch(url, settings)
        .then(alert(`Обявлението е направено успешно!`))
        .catch(error => console.log(error));
        document.getElementById("pause-field").value = "";


}