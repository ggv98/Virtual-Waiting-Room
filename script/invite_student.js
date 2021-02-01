// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:8080');
document.getElementById("welcome-student-button").onclick = sendInvitation;

function sendInvitationToStudent(studentID) {
    // TODO start 1 min timer
    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => sendInvitationSenderReceiver(response.data, studentID))
        .catch(error => console.log(error));
}

function sendInvitationSenderReceiver(sender, receiver) {
    socket.send("Sender_id:" + sender + " Receiver_id:" + receiver + " Ela da ti pisha 2kaa");
}

socket.onmessage = function(e) {
    var invitationResponse = e.data;
    
    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => processResponse(response.data, invitationResponse))
        .catch(error => console.log(error));
}

function processResponse(myUserId, invitationResponse) {
    let userIdReponseFor = extractReceiverId(invitationResponse);
    let invitationIsForMe = (myUserId == userIdReponseFor);

    if (invitationIsForMe) {
        let answer = extractAnswer(invitationResponse);
        if (answer == "Accepted") {
            alert("User accepted your invitation!");
            let url = "https://meet.google.com/yon-myik-vvy?authuser=1";
            var win = window.open(url, '_blank');
            win.focus();
            // redirect to the room link if online
            // dequeue (remove from database, reload the queue view and set the current user to be the removed one)
            console.log("Student has accepted");
        } else {
            console.log("Student has dismissed the invitation");
        }
    }
}

function getMeetTypeInfo() {
    fetch(url, settings)
        .then(response => response.json())
        .then(response => processInvitation(response.data, invitationMessage))
        .catch(error => console.log(error));
}

function extractAnswer(invitationResponse) {
    let answer = invitationResponse.split(" ")[2];
    return answer;
}

function extractReceiverId(invitationMessage) {
    let receiverId = invitationMessage.split(" ")[1].
                                        split(":")[1];
    return receiverId;
}

function sendInvitation(){

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
        .then(response => sendInvitationToStudent(response['data']['queue'][0]['userID']))
        .catch(error => console.log(error));
}
