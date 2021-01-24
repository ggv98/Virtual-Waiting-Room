var registerButton = document.querySelector('[name="register-button"]');
registerButton.addEventListener('click', show_register);

function show_register(event){
    event.preventDefault();
    var main = document.querySelector('[id="welcome-view"]');
    var registerForm = document.querySelector('[id="modal-registered"]')
    main.classList.add("invisible")
    main.classList.remove("centered")
    registerForm.classList.remove("invisible")
    registerForm.classList.add("centered")
}

var loginButton = document.querySelector('[name="login-button"]');
loginButton.addEventListener('click', show_login);

function show_login(event){
    //event.preventDefault();
    var main = document.querySelector('[id="welcome-view"]');
    var loginForm = document.querySelector('[id="modal-login"]')
    main.classList.add("invisible")
    main.classList.remove("centered")
    loginForm.classList.remove("invisible")
    loginForm.classList.add("centered")
}
var closeButtons = document.querySelectorAll('[class="close"]');

for (closeButton of closeButtons){
    closeButton.addEventListener('click', show_welcome_view);
}

function show_welcome_view(event){
    //event.preventDefault();
    var main = document.querySelector('[id="welcome-view"]');
    var registerForm = document.querySelector('[id="modal-registered"]')
    var loginForm = document.querySelector('[id="modal-login"]')
    main.classList.add("centered")
    main.classList.remove("invisible")
    loginForm.classList.add("invisible")
    registerForm.classList.add("invisible")
}