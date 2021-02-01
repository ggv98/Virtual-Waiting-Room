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

    // TODO set not available the welcome button
}

function sendInvitationSenderReceiver(sender, receiver) {

    // TODO get type of the meet and link -> send it through the socket

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
    let userId = extractSenderId(invitationResponse);
    let invitationIsForMe = (myUserId == userIdReponseFor);

    if (invitationIsForMe) {
        let answer = extractAnswer(invitationResponse);
        if (answer == "Accepted") {
            alert("User accepted your invitation!");

            userEnterExam(userId);

            // dequeue (remove from database, reload the queue view and 
            //  set the current user to be the removed one)
            console.log("Student has accepted");
        } else {
            console.log("Student has dismissed the invitation");
        }

        // TODO set available the welcome button
    }
}

function openUrlInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


function userEnterExam(userId) {
    // updateViewOnUserEntering();

    var roomId = urlParams.get('roomId')

    var data = {
        roomId,
        userId
    }

    var url = 'src/api.php/delete-meet-record';
    var settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(data)}`
    };
    
    fetch(url, settings)
        .then(response => response.text())
        .catch(error => console.log(error));

    // openUrlInNewTab(url);  if meet is online

}

// Not working
function updateViewOnUserEntering() {
    var currentStudent = document.getElementsByClassName("queue-element")[0];

    // remove meet_record with this student and room (URL) from database
    // Refresh the page or somehow call (I think its automatically invoked) the method that render the view (now with the removed meet record) ?
    
    var currentStudentImage = currentStudent.childNodes[0].src;
    var currentStudentName = currentStudent.childNodes[1].innerText;

    document.getElementById("current-student-name").display = "block";
    document.getElementById("current-student-name").innerText = currentStudentName;

    document.getElementById("current-student-image").display = "block";
    document.getElementById("current-student-image").src = currentStudentImage;
    // console.log(document.getElementsByClassName("queue-element").length);

    var queue = document.getElementById("queue");

    // console.log("Proba2");

    // queue.removeChild(elemToRemove);
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

function extractSenderId(invitationMessage) {
    let senderId = invitationMessage.split(" ")[0].
                                        split(":")[1];
    return senderId;
}
