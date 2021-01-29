const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');

// TODO try to send only one variable, not object
const data = {
    roomId
};

const settings = {
    method: 'POST',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `data=${JSON.stringify(data)}`
};

updateWaitingRoomStudents();




function updateWaitingRoomStudents() {
    var url = 'src/api.php/get-students-by-waiting-room';
    ajax(url, settings, updateWaitingStudentsView);
}

function ajax(url, settings, callback) {
    fetch(url, settings)
        .then(response => response.json())
        .then(response => callback(response))
        .catch(error => console.log(error));
}

function updateWaitingStudentsView(queryResponse) {
    if (queryResponse["success"]) {

        var students = queryResponse["data"];

        for (student of students) {
            let studentName = student["firstName"] + " " + student["lastName"];
            displayStudent(studentName);
        }
    } else {
        window.location = "teacher-home-page.html";
        alert(queryResponse["error"]);
        // TODO back to the previous page OR pop up the page that says You dont have access to this resource...
    }
}

function displayStudent(studentName) {
    var node = document.createElement("p");
    node.innerText = studentName;

    var studentDisplayElement = document.createElement("div");
    studentDisplayElement.classList.add("waiting-student");
    studentDisplayElement.appendChild(node);

    document.getElementById("info-side-bar").appendChild(studentDisplayElement);
}
