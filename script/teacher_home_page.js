
        function openForm(room) {
            document.getElementById("myForm").style.display = "block";

            // TODO set the submit button of the form to update the next exam (in the up right corner)
        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
        }



        function updateEndHourOptions() {
            inputedStartHour = document.getElementById("start-hour").value;
            console.log(inputedStartHour);

            endHourInput = document.getElementById("end-hour");

            endHourInput.min = inputedStartHour;
        }



        // TODO isolate in function
        var url = 'src/api.php/get-teacher-waiting-rooms';
        var settings = {method: 'POST'};

        var res = fetch(url, settings)
                .then(response => response.json())
                .then(response => displayResponseToView(response["data"]))
                .catch(error => console.log(error));

        // TODO maybe isolate some functions that are common with student-home-page
        function displayResponseToView(rooms) {
            for (room of rooms) {
                displayRoom(room);
            }

            displayAddRoomButton();

            document.getElementById("add-room-button").addEventListener("click", openForm);
        }

        function getRoomTimeInterval(room) {
            var date = new Date(room["startTime"]);
            var startHour = date.getHours() + ":" + date.getMinutes();

            date = new Date(room["endTime"]);
            var endHour = date.getHours() + ":" + date.getMinutes();
            
            var timeInterval = startHour + " - " + endHour;
            
            return timeInterval;
        }
       
        function displayAddRoomButton() {
            var node = document.createElement("p");
            node.classList.add("room-info");
            node.innerText = "+";

            var room = document.createElement("div");
            room.id = "add-room-button";
            room.classList.add("room");
            room.appendChild(node);
            document.getElementById("rooms-container").appendChild(room);
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

            var room = document.createElement("div");
            room.classList.add("room");
            room.appendChild(node1);
            room.appendChild(node2);

            document.getElementById("rooms-container").appendChild(room);
        }

        // adding room based on the form information
        // used on Submit-ing the form
        function addRoomToView() {
            var rooms_container = document.getElementById("rooms-container");
            rooms_container.removeChild(rooms_container.lastChild);

            var meet_title = document.getElementById("meet-title").innerHTML;
            var date = document.getElementById("date").innerHTML;
            var start_hour = document.getElementById("start-hour").innerHTML;
            var end_hour = document.getElementById("end-hour").innerHTML;

            // TODO add room
        }
