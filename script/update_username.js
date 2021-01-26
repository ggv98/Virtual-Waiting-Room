var url = 'src/api.php/get-username';
var settings = {method: 'POST'};

var res = fetch(url, settings)
        .then(response => response.json())
        .then(response => update_view_username(response.data))
        .catch(error => console.log(error));


function update_view_username(username) {
    elemToUpdate = document.getElementById("user-name");
    elemToUpdate.innerHTML = username
}

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener('click', logout);

function logout(){    
    var res = fetch('src/api.php/logout', settings)
        .then(response => response.json())
        .then(window.location = 'index.html')
        .catch(error => console.log(error));
 }