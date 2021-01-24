const nextBtn = document.getElementById('user-info-submit');
nextBtn.addEventListener('click', save);

function save(event) {
    event.preventDefault();

    const firstName = document.querySelector('[name="firstName"]').value;
    const lastName = document.querySelector('[name="lastName"]').value;
    const facultyNumber = document.querySelector('[name="facultyNumber"]').value;
    const degree = document.querySelector('[name="degree"]').value;
    const speciality = document.querySelector('[name="speciality"]').value;
    const course = document.querySelector('[name="course"]').value;
    const groupe = document.querySelector('[name="groupe"]').value;

    const mainError = document.getElementById('main-error')

    if (!firstName || !lastName || !facultyNumber || !degree || !speciality || !course || !groupe){
		mainError.innerHTML = 'Моля попълнете всички полета коректно';
    }
    else{
		
        const user_info = {
            firstName,
            lastName,
            facultyNumber,
            degree,
            speciality,
            course,
            groupe
        };
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `data=${JSON.stringify(user_info)}`
        };

        ajax('src/api.php/save_user_info', settings);
    }

};

const ajax = (url, settings ) => {
    fetch(url, settings)
        .then(response => response.json())
        .then(data => next(data))
        .catch(error => console.log(error));
};

function next(data){
    if (data.success){
        window.location = "registration_2.html"
    }
    else{
        console.log(data.error)
        var mainError = document.getElementById('register-main-error')
        mainError.innerHTML = data.error;
    }
}