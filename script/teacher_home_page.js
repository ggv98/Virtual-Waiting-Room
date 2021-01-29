        
        updateView();
        document.getElementById("submitBtn").addEventListener("click", createMeet);


        function openForm(room) {
            document.getElementById("create-exam-form").style.display = "inline-block";

            // TODO set the submit button of the form to update the next exam (in the up right corner)
        }

        function closeForm() {
            document.getElementById("create-exam-form").style.display = "none";
        }

        function updateEndHourOptions() {
            inputedStartHour = document.getElementById("start-hour").value;
            console.log(inputedStartHour);

            endHourInput = document.getElementById("end-hour");

            endHourInput.min = inputedStartHour;
        }

        // update waiting rooms
        function updateView() {
            var url = 'src/api.php/get-teacher-waiting-rooms';
            var settings = {method: 'POST'};

            document.getElementById("rooms-container").innerHTML = "";  // remove all children

            var res = fetch(url, settings)
                    .then(response => response.json())
                    .then(response => displayResponseToView(response["data"]))
                    .catch(error => console.log(error));

            return false; // because used in form that we do not want to refresh the page ... But for now not working
        }

        // TODO maybe isolate some functions that are common with student-home-page
        function displayResponseToView(rooms) {
            if (rooms){
                for (room of rooms) {
                    displayRoom(room);
                }                
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

            var roomButton = document.createElement("div");
            roomButton.id = "add-room-button";
            roomButton.classList.add("room");
            roomButton.appendChild(node);
            document.getElementById("rooms-container").appendChild(roomButton);
            roomButton.addEventListener("click", openForm);
        }

        function displayRoom(room) {
            var roomTitle = room["title"];
            var timeInterval = getRoomTimeInterval(room);
            
            var node1 = document.createElement("p");
            node1.classList.add("room-info");
            node1.innerText = roomTitle;

            var node2 = document.createElement("p");
            node2.classList.add("room-info");
            node2.innerText = timeInterval;

            var roomDisplayElement = document.createElement("div");
            roomDisplayElement.classList.add("room");
            roomDisplayElement.appendChild(node1);
            roomDisplayElement.appendChild(node2);

            var roomId = room["id"];

            roomDisplayElement.addEventListener("click", function f() 
                    {
                        return redirectToWaitingRoom(roomId);
                    }
                );

            document.getElementById("rooms-container").appendChild(roomDisplayElement);
        }

        function redirectToWaitingRoom(roomId) {
            window.location = "waiting-room-view.html?roomId=" + roomId;
        }

        // adding room based on the form information
        // used on Submit-ing the form
        function createMeet() {
            var rooms_container = document.getElementById("rooms-container");
            rooms_container.innerHTML = "";

            var meet_title = document.getElementById("meet-title").value;
            var subject = document.getElementById("subject").value;
            var avg_duration = document.getElementById("avg-duration").value;
            var meet_data = document.getElementById("date").value;
            var start_hour = document.getElementById("start-hour").value;
            var end_hour = document.getElementById("end-hour").value;
            var meet_address_type = document.getElementById("meet_address_type").value;
            var meet_address = document.getElementById("address").value;;

            const meet = {
                meet_title,
                subject,
                avg_duration,
                meet_data,
                start_hour,
                end_hour,
                meet_address_type,
                meet_address
            };

            console.log(meet);
            
            const settings = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: `data=${JSON.stringify(meet)}`
            };

            var url = 'src/api.php/create-meet';

            fetch(url, settings);

            closeForm();
            updateView();

            return false;
        }
