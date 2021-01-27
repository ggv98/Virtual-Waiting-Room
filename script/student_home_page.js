 // TODO isolate in function
 var url = 'src/api.php/get-all-waiting-rooms';
 var settings = {method: 'POST'};

 var res = fetch(url, settings)
         .then(response => response.json())
         .then(response => displayExistingRoomsToView(response["data"]))
         //.then(response => console.log(response))
         .catch(error => console.log(error));

 setInterval(function() {
    var res = fetch(url, settings)
    .then(response => response.json())
    .then(response => displayExistingRoomsToView(response["data"]))
    .catch(error => console.log(error))
}, 10000);



 function displayExistingRoomsToView(rooms) {
    clear_rooms();
     for (room of rooms) {
         displayRoom(room);
     }
 }

 function getDate(room){
     var date = new Date(room["startTime"]);
     var day = date.getDate();
     var mouth = date.getMonth()+1;
     var year = date.getFullYear();
     return day + '.' + mouth + '.' + year;

 }

 function getRoomTimeInterval(room) {
     var date = new Date(room["startTime"]);
     var startHour = date.getHours() + ":" + getMinute(date);

     date = new Date(room["endTime"]);
     var endHour = date.getHours() + ":" + getMinute(date);
     
     var timeInterval = startHour + " - " + endHour;
     
     return timeInterval;
 }
 function getMinute(date){
     if (date.getMinutes() === 0){
         return '00';
     }
     return date.getMinutes();
 }
function clear_rooms(){
    document.getElementById("rooms-container").innerHTML = ''
}
 function displayRoom(room) {
     var roomTitle = room["title"];
     var timeInterval = getRoomTimeInterval(room);
     var date =  getDate(room);
     if(room['meetType'] == 0){
        var roomLocation = 'Онлайн'
     } else{
         var roomLocation = room['address']
     }
     var roomSubject = room['subject']
     
     var node1 = document.createElement("p");                 // Create a <li> node
     node1.id = "room-title";
     node1.innerText = 'Стая: ' + roomTitle;

     var node2 = document.createElement("p");                 // Create a <li> node
     node2.id = "room-subject";
     node2.innerText = 'Предмет: ' + roomSubject;
     
     var node3 = document.createElement("p");
     node3.id = "room-place";
     node3.innerText = 'Място: '+ roomLocation;

     var node4 = document.createElement("p");
     node4.id = "room-date";
     node4.innerText = 'Дата: ' + date;

     
     var node5 = document.createElement("p");
     node5.id = "room-time";
     node5.innerText = 'Време: ' + timeInterval;
     
     var roomElem = document.createElement("div");
     roomElem.classList.add("room");
     roomElem.appendChild(node1);
     roomElem.appendChild(node2);
     roomElem.appendChild(node3);
     roomElem.appendChild(node4);
     roomElem.appendChild(node5);
     if (room['isRegistered']){
        var node6 = document.createElement("p");
        node6.id = "registrated";
        node6.innerText = 'Записан';
        roomElem.appendChild(node6);
     }
     roomElem.onclick = function() { openForm(room['id']) };

     document.getElementById("rooms-container").appendChild(roomElem);
 }
