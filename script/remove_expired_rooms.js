var url = 'src/api.php/delete-expired-waiting-rooms';
var settings = {method: 'POST'};

var res = fetch(url, settings)
    .then(response => response.json())
    .catch(error => console.log(error));
