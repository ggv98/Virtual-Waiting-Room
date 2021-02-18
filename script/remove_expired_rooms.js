
function remove_expired_rooms(){
    var url = 'src/api.php/delete-expired-waiting-rooms';
    var settings = {method: 'POST'};

    var res = fetch(url, settings)
        .then(response => response.json())
        .catch(error => console.log(error));
}
remove_expired_rooms();
setInterval(function(){
    remove_expired_rooms();
    }, 8000);