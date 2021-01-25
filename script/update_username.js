var url = 'src/api.php/get-username';
var settings = {method: 'POST'};

var res = fetch(url, settings)
        .then(response => response.json())
        .then(response => update_view_username(response.data))
        .catch(error => console.log(error));


function update_view_username(username) {
    elemToUpdate = document.getElementById("student-name");
    elemToUpdate.innerHTML = username
}
