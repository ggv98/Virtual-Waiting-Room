function openForm(room) {
    document.getElementById("myForm").style.display = "block";

    // TODO set the submit button of the form to update the next exam (in the up right corner)
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
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