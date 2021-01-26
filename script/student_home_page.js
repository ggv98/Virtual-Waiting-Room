 // TODO isolate in function
 var url = 'src/api.php/get-all-waiting-rooms';
 var settings = {method: 'POST'};

 var res = fetch(url, settings)
         .then(response => response.json())
         .then(response => displayExistingRoomsToView(response["data"]))
         .catch(error => console.log(error));


 function displayExistingRoomsToView(rooms) {
     for (room of rooms) {
         displayRoom(room);
     }
 }

 function getRoomTimeInterval(room) {
     var date = new Date(room["startTime"]);
     var startHour = date.getHours() + ":" + date.getMinutes();

     date = new Date(room["endTime"]);
     var endHour = date.getHours() + ":" + date.getMinutes();
     
     var timeInterval = startHour + " - " + endHour;
     
     return timeInterval;
 }

 function displayRoom(room) {
     var roomTitle = room["title"];
     var timeInterval = getRoomTimeInterval(room);
     
     var node1 = document.createElement("p");                 // Create a <li> node
     node1.classList.add("room-info");
     node1.innerText = roomTitle;

     var node2 = document.createElement("p");
     node2.classList.add("room-info");
     node2.innerText = timeInterval;

     var roomElem = document.createElement("div");
     roomElem.classList.add("room");
     roomElem.appendChild(node1);
     roomElem.appendChild(node2);
     roomElem.onclick = function() { openForm(room['id']) };

     document.getElementById("rooms-container").appendChild(roomElem);
 }