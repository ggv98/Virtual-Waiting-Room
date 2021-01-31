var socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function(e) {
    alert( e.data );
}