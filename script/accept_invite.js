var socket = new WebSocket('ws://localhost:8080');


document.getElementById("accept-invitation-btn").addEventListener("click", acceptInvitation);
function acceptInvitation() {
    socket.send("Student accepted");
    document.getElementById("invitation-pop-up").style.display = "none";
}

function openInvitation() {
    document.getElementById("invitation-pop-up").style.display = "inline-block";
}

document.getElementById("dismiss-invitation-btn").addEventListener("click", closeInvitation);
function closeInvitation() {
    document.getElementById("invitation-pop-up").style.display = "none";

    socket.send("Student denied!");
}

socket.onmessage = function(e) {
    // if not invitationForMe(e.data) then return
    let invitationMessage = e.data;

    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => processInvitation(response.data, invitationMessage))
        .catch(error => console.log(error));
}

function processInvitation(userId, invitationMessage) {
    let receiverId = extractReceiverId(invitationMessage);
    let invitationIsForMe = (receiverId == userId);

    if (invitationIsForMe) {
        openInvitation();
        oneMinuteInvitationAvailable();
    }
}

function oneMinuteInvitationAvailable() {
    let seconds = 10;
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
        let time = "00:" + seconds;
        document.getElementById("invitation-timer").innerText = time;
    }
}

function invitationIsAlreadyClosed() {
    return document.getElementById("invitation-pop-up").style.display == "none";
}

function extractReceiverId(invitationMessage) {
    let receiverId = invitationMessage.split(" ")[1].
                                        split(":")[1];
    return receiverId;
}
