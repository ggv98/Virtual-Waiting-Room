// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:8080');
var meetType;
var meetAddress;

document.getElementById("welcome-student-button").onclick = sendInvitation;

function sendInvitationToStudent(studentID) {
    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => sendInvitationSenderReceiver(response.data, studentID))
        .catch(error => console.log(error));

    // TODO set not available the welcome button
}

function sendInvitationSenderReceiver(sender, receiver) {
    var roomId = urlParams.get('roomId');

    var data = {
        roomId
    }

    var url = 'src/api.php/get-room-by-id';
    var settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(data)}`
    };
    
    fetch(url, settings)
        .then(response => response.json())
        .then(response => response["data"])
        .then(room => sendInvitationGivenFullData(sender, receiver, room))
        .catch(error => console.log(error));

}

function sendInvitationGivenFullData(sender, receiver, room) {
    if (room['meetType'] == 0) {
        meetType = "Online";
    }  else {
        meetType = "FMI";
    }
    meetAddress = room["address"];
    
    let invitationMsg = {sender_id: sender,
                        receiver_id: receiver,
                        meetType: meetType,
                        meetAddress: meetAddress
                    };
    invitationMsg = JSON.stringify(invitationMsg);

    socket.send(invitationMsg);
}

socket.onmessage = function(e) {
    var invitationResponse = e.data;
    
    var url = 'src/api.php/get-userId';
    var settings = {method: 'POST'};

    fetch(url, settings)
        .then(response => response.json())
        .then(response => processResponseOnInvitation(response.data, invitationResponse))
        .catch(error => console.log(error));
}

function processResponseOnInvitation(myUserId, invitationResponse) {
    let userIdReponseFor = extractReceiverId(invitationResponse);
    let userId = extractSenderId(invitationResponse);
    let invitationIsForMe = (myUserId == userIdReponseFor);

    if (invitationIsForMe) {
        let answer = extractAnswer(invitationResponse);
        if (answer == "Accepted") {
            alert("User accepted your invitation!");
            deleteUser(userId);

            if (meetType == 'Online')  {
                openUrlInNewTab(meetAddress);
            }

            console.log("Student has accepted");
        } else {
            deleteUser(userId);
            alert("Student has dismissed the invitation");
        }
        // TODO set available the welcome button
    }
}

function openUrlInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


function deleteUser(userId) {
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
        // .then(response => response.text())
        .catch(error => console.log(error));
}

function extractAnswer(invitationResponse) {
    invitationResponse = JSON.parse(invitationResponse);
    let answer = invitationResponse["answer"];

    return answer;
}

function extractReceiverId(invitationResponse) {
    invitationResponse = JSON.parse(invitationResponse);
    let receiverId = invitationResponse["receiver_id"];

    return receiverId;
}

function extractSenderId(invitationResponse) {
    invitationResponse = JSON.parse(invitationResponse);
    let senderId = invitationResponse["sender_id"];

    return senderId;
}

function sendInvitation() {

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

