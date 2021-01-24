const loginBtn = document.getElementById('login-submit');
loginBtn.addEventListener('click', login);

function login(event) {
    event.preventDefault();

    const loginUserName = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;

    if (loginUserName !=='' && loginPassword !== ''){

        
        const user = {
            loginUserName,
            loginPassword
        };
        
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `data=${JSON.stringify(user)}`
        };
        
        ajax_login('src/api.php/login', settings);
    }

};

const ajax_login = (url, settings ) => {
    fetch(url, settings)
        .then(response => response.json())
        .then(data => logOn(data))
        .catch(error => console.log(error));
};

function logOn(data){
    if (data.success){
        console.log(data.data);
        if (data.data == 1){
            window.location = "registration_2.html";
        } else if (data.data == 2){
            window.location = "dashboard.html";
        }
        else {
            window.location = "registration_1.html"
        }
    }
    else{
        console.log(data.error)
        var mainError = document.getElementById('login-main-error')
        mainError.innerHTML = data.error;
    }
}