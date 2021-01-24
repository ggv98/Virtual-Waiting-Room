const registerBtn = document.getElementById('register-submit');
registerBtn.addEventListener('click', register);

function register(event) {
    event.preventDefault();

    const userName = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const email = document.getElementById('register-email').value;
    const userNameError = document.getElementById('register-username-error')
    const emailError = document.getElementById('register-email-error')
    const passwordError = document.getElementById('register-password-error')
    var hasErrors = false;

    if (!validateUserName(userName)){
		userNameError.innerHTML = 'Потребителско име трябва да е с дължина поне 5 символа';
		hasErrors = true;
    }
    else{
		userNameError.innerHTML = '';
    }
	
	if (! validateEmail(email)){
		emailError.innerHTML = 'Невалиден e-mail';
		hasErrors = true;
    }
    else{
		emailError.innerHTML = '';
    }

	if (!validatePassword(password)){
		passwordError.innerHTML = 'Паролата трябва да е поне 6 символа';
		hasErrors = true;
    }
    else if(password !== confirmPassword){
		passwordError.innerHTML = 'Двете пароли не са еднакви!';
		hasErrors = true;
    }
    else{
		passwordError.innerHTML = '';
    }

    const user = {
        userName,
        password,
        confirmPassword,
        email
    };

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(user)}`
    };

    if (!hasErrors){
        ajax('src/api.php/register', settings);
    }

};

function validateUserName(username){
	lenght = username.length;
	return (lenght<=100 && lenght>5);
}
function validatePassword(pass){
	lenght = pass.length;
	return (lenght<=64 && lenght>=6);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ajax = (url, settings ) => {
    fetch(url, settings)
        .then(response => response.json())
        .then(data => registrate(data))
        .catch(error => console.log(error));
};

function registrate(data){
    if (data.success){

      //window.location = "index.html"
      show_welcome_view();
      show_login();
    }
    else{
        console.log(data.error)
        var mainError = document.getElementById('register-main-error')
        mainError.innerHTML = data.error;
    }
}