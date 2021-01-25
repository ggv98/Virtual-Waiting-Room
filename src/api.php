<?php
    require_once "user.php";
    require_once "utility.php";
    require_once "student_info.php";

    session_start();

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/login$/", $requestURL)) {
        login();
    } elseif(preg_match("/register$/", $requestURL)) {
        register();
    } elseif(preg_match("/save_user_info$/", $requestURL)) {
        save_user_info();
    } elseif(preg_match("/session$/", $requestURL)) {
        session();
    } elseif(preg_match("/image-upload$/", $requestURL)) {
        upload_image();
    } else {
        echo json_encode(["error" => "URL not found"]);
    }

    function login() {
        $errors = [];
        $response = [];
        $user;

        if ($_POST) {
            $data = json_decode($_POST["data"], true);

            $username = isset($data["loginUserName"]) ? testInput($data["loginUserName"]) : "";
            $password = isset($data["loginPassword"]) ? testInput($data["loginPassword"]) : "";

            if ($username && $password) {
                $user = new User($username, $password);
                $isUserValid = $user->isValid();

                if ($isUserValid["success"]) {
                    $_SESSION["username"] = $username;
                    $_SESSION["userId"] = $user->getUserId();
                    $_SESSION["userType"] = $user->getUserType();
                } else {
                    $errors[] = $isUserValid["error"];
                } 
            }
        } else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $stage = $user->getUserProfileFilledStage();
            $response = $stage;
        }

        echo json_encode($response);
    }

    function register() {
        $errors = [];
        $response = [];

        if ($_POST) {
            $data = json_decode($_POST["data"], true);

            $username = testInput($data["userName"]);
            $password = testInput($data["password"]);
            $confirmPassword = testInput($data["confirmPassword"]);
            $email = testInput($data["email"]);

            if ($username && $password && $confirmPassword) {
                if ($password !== $confirmPassword) {
                    $errors[] = "Двете пароли не съвпадат";
                } else {
                    $user = new User($username, $password, $email, 'Student');
                    $exists = $user->userExists();
        
                    if ($exists) {
                        $errors[] = "Вече същестува потребител с такова потребителско име";
                    } else {
                        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                        $user->createUser($passwordHash, $email);
                    }
                }
            }
        } else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true];
        }

        echo json_encode($response);
    }

    function save_user_info() {

        // Add check for session
        
        $errors = [];
        $response = [];

        if ($_POST) {
            $data = json_decode($_POST["data"], true);

            $firstName = testInput($data["firstName"]);
            $lastName = testInput($data["lastName"]);
            $facultyNumber = testInput($data["facultyNumber"]);
            $degree = testInput($data["degree"]);
            $speciality = testInput($data["speciality"]);
            $course = testInput($data["course"]);
            $groupe = testInput($data["groupe"]);

            if ($firstName && $lastName && $facultyNumber &&  $degree && $speciality && $course && $groupe) {
       
                    $user_info = new User_info($_SESSION["userId"], $firstName, $lastName, $facultyNumber, $degree, $speciality, $course, $groupe);
                    $result = $user_info->saveUserInfo($_SESSION["userId"]);
            }
        } else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true];
        }

        echo json_encode($response);
    }
    function session() {
        $response = [];

        if($_SESSION) {
            if($_SESSION["username"]) {
                $response = ["success" => true, "data" => $_SESSION["userId"]];
            } else {
                $response = ["success" => false, "error" => "Unauthorized access"];
            }
        } 
        echo json_encode($response);
    }
    function upload_image(){
        $statusMsg = '';
        $fileName = basename($_FILES["image"]["name"]);
        $targetFilePath = __DIR__ . "/../storage/" . $fileName;
        $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
        
        if(!empty($_FILES["image"]["name"])){
            // Allow certain file formats
            $allowTypes = array('jpg','png','jpeg','gif','pdf');
            if(in_array($fileType, $allowTypes)){
                // Upload file to server
                if(move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)){
                    $user_info = new User_info($_SESSION['userId']);
                    
                    $insert = $user_info->updateUserImage($fileName);
                    if(!$insert['success']){
                        $statusMsg = "File upload failed, please try again.";
                    } 
                }else{
                    $statusMsg = "Sorry, there was an error uploading your file.";
                }
            }else{
                $statusMsg = 'Sorry, only JPG, JPEG, PNG, GIF, & PDF files are allowed to upload.';
            }
        }else{
            $statusMsg = 'Please select a file to upload.';
        }


        if($statusMsg!==''){
            $response = ["success" => false, "error" => $statusMsg];
        } else{
            $response = ["success" => true];
        }
        echo json_encode($response);

    }
    // function logout() {
    //     if ($_SESSION) {
    //         session_unset();
    //         session_destroy();

    //         setcookie("token", "", time() - 60, "/");
            
    //         echo json_encode(["success" => true]);
    //     } else {
    //         echo json_encode(["success" => false]);
    //     }
    // }
?>