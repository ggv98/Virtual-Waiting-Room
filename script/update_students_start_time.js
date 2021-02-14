
setInterval(function() {
    update();
 }, 1000);

function update() {
    var url = 'src/api.php/get-room-details';
    var room = {
        roomId
    }

    var settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(room)}`
    };
    var res = fetch(url, settings)
        .then(response => response.json())
        .then(response => updateQueue(response['data']['queue'][0]['meetTime']))
        .catch(error => console.log(error));
}

function getDelay(expectedStartTime) {
    var firstTime = new Date(expectedStartTime); 
    var currentTime = new Date();

    var delayInMilliSeconds = currentTime - firstTime;
    return delayInMilliSeconds;
}

function updateQueue(firstInQueueStartTime) {
    var delay = getDelay(firstInQueueStartTime);

    if (delay > 0) {
        updateQueueGivenDelay(delay);
    }
}

// delay is in milliseconds
function updateQueueGivenDelay(delay) {
    delay = convertMilliSecondsToHourandMinutes2(delay + 5000);

        var roomId = urlParams.get('id');

        var data = {
            roomId,
            delay
        }

        console.log(roomId);
        console.log(delay);

        var url = 'src/api.php/update-queue-start-times';
        var settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `data=${JSON.stringify(data)}`
        };
        
        fetch(url, settings)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error));
}

function convertMilliSecondsToHourandMinutes2(miliseconds){
    var seconds = parseInt(miliseconds/1000, 10); 
    
    var hrs  = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;
    
    return hrs + ":" + mnts + ":" + seconds;
}
