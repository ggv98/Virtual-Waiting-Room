const nextBtn = document.getElementById('user-image-submit');
nextBtn.addEventListener('click', save);

function save(event) {
    event.preventDefault();
    
    const form = document.getElementById('image-upload');

    const formData = new FormData(form)

    const settings = {
            method: 'POST',
            body: formData
        };

    ajax('src/api.php/image-upload', settings);
    

};

const ajax = (url, settings ) => {
    fetch(url, settings)
        .then(response => response.json())
        .then(data => next(data))
        .catch(error => console.log(error));
};

function next(data){
    if (data.success){
        window.location = "student-home-page.html"
    }
    else{
        console.log(data.error)
        var mainError = document.getElementById('register-main-error')
        mainError.innerHTML = data.error;
    }
}

function readImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            const image = document.getElementById('profilepic');

                image.src = reader.result
                image.style.width = "200px"
                image.style.height = "130px"
        };

        reader.readAsDataURL(input.files[0]);
    }
}