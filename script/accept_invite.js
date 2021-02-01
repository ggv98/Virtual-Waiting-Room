var socket = new WebSocket('ws://localhost:8080');

function openForm() {
    document.getElementById("invitation-pop-up").style.display = "inline-block";
}

function closeForm() {
    document.getElementById("invitation-pop-up").style.display = "none";
}

socket.onmessage = function(e) {
    document.getElementById("invitation-pop-up").style.display = "inline-block";
}