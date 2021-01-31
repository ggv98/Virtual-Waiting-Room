 // Create a new WebSocket.
 var socket = new WebSocket('ws://localhost:8080');

// Define the 
//  var message = document.getElementById('message');

 // TODO connect transmitMessage to button
//  function transmitMessage() {
//      socket.send( message.value );
//  }

 socket.send("Ela da ti pisha 2ka");

 socket.onmessage = function(e) {
     alert( e.data );
 }