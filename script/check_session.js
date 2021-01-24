

const ajax_call = (url, settings ) => {
    fetch(url, settings)
    .then(response => response.json())
    .then(data => check_session(data))
    .catch(error => console.log(error));
};

function check_session($data){
    if (!$data.success){
        window.location = 'index.html'
    }
}
(function(){
    ajax_call('src/api.php/session', {method: 'GET'});
})();