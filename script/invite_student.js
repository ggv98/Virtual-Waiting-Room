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
    alert( e.data );
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
