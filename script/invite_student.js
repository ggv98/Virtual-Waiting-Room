// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:8080');
document.getElementById("welcome-student-button").onclick = transmitMessage;

function transmitMessage() {
    socket.send("Ela da ti pisha 2ka");
}

socket.onmessage = function(e) {
    alert( e.data );
}