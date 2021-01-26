const submitBtn = document.getElementById('submit-record');
submitBtn.addEventListener('click', create_record);

function create_record(event){

    event.preventDefault();

    const roomId = document.getElementById("room-id").value;
    const meetType = document.getElementById('meet-type').value;

    const meet_record = {
        roomId,
        meetType
    };

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(meet_record)}`
    };
    var url = 'src/api.php/sign-up-for-meet'
    var res = fetch(url, settings)
         .then(response => response.json())
         .then(response => recordForMeet(response))
         .catch(error => console.log(error));


}

function recordForMeet(data){
    closeForm();
    if(data.success){
        alert(`Успешно се записахте в опашката за ${data.data.roomTitle} вашият ред е в ${data.data.meetTime} часа`);
    } else{
        alert(`Грешка ${data.error} Моля опитайте отново`);
    }
}

function openForm(room) {
    console.log(room);
    document.getElementById("form-exam-record").style.display = "inline-block";
    document.getElementById("room-id").value = room;
}

function closeForm() {
    document.getElementById("form-exam-record").style.display = "none";
}

// TODO rename
function addEventOpenForm(elem, text) {
    elem.onclick = function() {
        nextExam = document.getElementById("next-exam").innerHTML;

        if (nextExam == text) {
            alert("This is the next exam");
        } else {
            openForm(text);
        }
    }
}

rooms = document.getElementsByClassName("room");
roomsNames = []
for(var i = 0; i < rooms.length; i++) {
    text = rooms[i].textContent;
    
    addEventOpenForm(rooms[i], text);
}

// TODO form for updating information about yet assigned exam. Maybe if student will be late, will skip the exam or will come in another day ?