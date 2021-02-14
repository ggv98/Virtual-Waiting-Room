var socket = new WebSocket('ws://localhost:8080');
var myId;
var senderId;
var invitationMessage;

document.getElementById("accept-invitation-btn").addEventListener("click", acceptInvitation);
function acceptInvitation() {
    // myId, senderId are initliazied in processInvitation
    console.log(invitationMessage);
    var meetType = extractMeetType(invitationMessage);
    var meetAddress = extractMeetAddress(invitationMessage);

    socket.send("SenderId:" + myId + " " + "ReceiverId:" + senderId + " Accepted");
    document.getElementById("invitation-pop-up").style.display = "none";

    if (meetType == "Online") {
        console.log(meetAddress);
        openUrlInNewTab(meetAddress);
    }
}

// invite_student.js has also this method
function openUrlInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function openInvitation(meetType, meetAddress) {
    if (meetType == "Онлайн") {
        document.getElementById("invitation-meet-info").innerHTML = "Онлайн";
    } else {
        document.getElementById("invitation-meet-info").innerHTML = "Място: " + meetAddress;
    }
    document.getElementById("invitation-pop-up").style.display = "inline-block";
}

document.getElementById("dismiss-invitation-btn").addEventListener("click", closeInvitation);
function closeInvitation() {
    document.getElementById("invitation-pop-up").style.display = "none";

    socket.send("SenderId:" + myId + " " + "ReceiverId:" + senderId + " Denied");
}

socket.onmessage = function(e) {
    invitationMessage = e.data;

    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => processInvitation(response.data, invitationMessage))
        .catch(error => console.log(error));
}

// if invitations is for me => opens it
function processInvitation(userId, invitationMessage) {
    let receiverId = extractReceiverId(invitationMessage);
    let invitationIsForMe = (receiverId == userId);

    if (invitationIsForMe) {
        senderId = extractSenderId(invitationMessage);
        myId = userId;
        var meetType = extractMeetType(invitationMessage);
        var meetAddress = extractMeetAddress(invitationMessage);
        openInvitation(meetType, meetAddress);
        oneMinuteInvitationAvailable();
    }
}

function oneMinuteInvitationAvailable() {
    let seconds = 30;
    var intervalId = setInterval(function() {
        seconds = seconds - 1;
        updateClock(seconds, intervalId);
     }
     , 1000);    
}

function updateClock(seconds, intervalId) {
    if (seconds == 0) {
        if (! invitationIsAlreadyClosed()) {
            closeInvitation();
        }

        window.clearInterval(intervalId); // To stop calling updateClock()
    } else {
        let time;
        if (seconds < 10) {
            time = "00:0" + seconds;
        } else {
            time = "00:" + seconds;
        }
        document.getElementById("invitation-timer").innerText = time;
    }
}

function invitationIsAlreadyClosed() {
    return document.getElementById("invitation-pop-up").style.display == "none";
}


function extractReceiverId(invitationMessage) {
    invitationMessage = JSON.parse(invitationMessage);
    let receiverId = invitationMessage["receiver_id"];

    return receiverId;
}

function extractSenderId(invitationMessage) {
    invitationMessage = JSON.parse(invitationMessage);
    let senderId = invitationMessage["sender_id"];

    return senderId;
}

function extractMeetType(invitationMessage) {
    invitationMessage = JSON.parse(invitationMessage);
    let meetType = invitationMessage["meetType"];

    return meetType;
}

function extractMeetAddress(invitationMessage) {
    invitationMessage = JSON.parse(invitationMessage);
    let meetAddress = invitationMessage["meetAddress"];

    return meetAddress;
}