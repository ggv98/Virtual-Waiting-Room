<?php
    require_once "db.php";
    require_once "user.php";
    require_once "utility.php";
    require_once "student_info.php";
    require_once "waiting_room.php";

    session_start();

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/login$/", $requestURL)) {
        login();
    } 
    elseif(preg_match("/register$/", $requestURL)) {
        register();
    } 
    elseif(preg_match("/save_user_info$/", $requestURL)) {
        save_user_info();
    } 
    elseif(preg_match("/session$/", $requestURL)) {
        session();
    } 
    elseif(preg_match("/image-upload$/", $requestURL)) {
        upload_image();
    } 
    elseif(preg_match("/get-username$/", $requestURL)) {
        get_username();
    } 
    elseif(preg_match("/sign-up-for-meet$/", $requestURL)) {
        sign_up_for_meet();
    } 
    elseif(preg_match("/create-meet$/", $requestURL)) {
        create_meet();
    } 
    elseif(preg_match("/get-teacher-waiting-rooms$/", $requestURL)) {
        $teacherId = $_SESSION["userId"];
        get_waiting_rooms_given_teacher_id($teacherId);
    }
    elseif(preg_match("/get-all-waiting-rooms$/", $requestURL)) {
        get_all_waiting_rooms();
    }
     else {
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
            $errors[] = "Invalid request 1";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $stage = $user->getUserProfileFilledStage();
            $stage["userType"] = $user->getUserType();
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
            $errors[] = "Invalid request 2";
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
            $errors[] = "Invalid request 3";
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

    function get_username() {
        $username;

        if ($_SESSION) {
            if ($_SESSION["username"]) {
                $username = $_SESSION["username"];
            } else {
                $username = "No user";
            }
            $response = ["success" => $username, "data" => $username];
        } else {
            $response = ["success" => false, "data" => "Helo world error"];
        }

        echo json_encode($response);
    }

    function sign_up_for_meet() {
        // echo $_POST;
        echo "Hello world";
        // TODO
    }

    function create_meet() {
        $teacher_id = $_SESSION["userId"];

        if ($_POST) {
            $data = json_decode($_POST["data"], true);
        } else {
            $response = ["success" => false];
            echo json_encode($response);
        }

        $meet_title = $data["meet_title"];
        $subject = $data["subject"];
        $avg_duration = $data["avg_duration"];
        $meet_data = $data["meet_data"];  // TODO rename to meet_date
        $start_hour = $data["start_hour"];
        $end_hour = $data["end_hour"];
        $meet_address_type = $data["meet_address_type"];
        $meet_address = $data["meet_address"];

        $start_hour_datetime = $meet_data." ".$start_hour;
        $end_hour_datetime = $meet_data." ".$end_hour;

        $room = new waiting_room($teacher_id, $meet_title, $subject, $avg_duration,
                                 $message='', $start_hour_datetime, $end_hour_datetime,
                                 $meet_address_type, $meet_address);
        $room->createWaitingRoom();

        $response = ["success" => true, "data" => $meet_title];
        echo json_encode($response);
    }

    function get_waiting_rooms_given_teacher_id($teacherId) {
        // TODO isolate in function
        $db = new Database();
        $query = $db->selectWaitingRoomsGivenTeacherIdQuery(["teacherId" => $teacherId]);
        
        $queryRes = [];
        while ($row = $query["data"]->fetch(PDO::FETCH_ASSOC)) {
            array_push($queryRes, $row);
        }

        if (empty($queryRes)) {
            $response = ["success" => false];
        } else {
            $response = ["success" => true, "data" => $queryRes];
        }

        echo json_encode($response);
    }

    function get_all_waiting_rooms() {
        $db = new Database();
        $query = $db->selectAllWaitingRoomsQuery();
        
        $queryRes = [];
        while ($row = $query["data"]->fetch(PDO::FETCH_ASSOC)) {
            array_push($queryRes, $row);
        }

        if (empty($queryRes)) {
            $response = ["success" => false];
        } else {
            $response = ["success" => true, "data" => $queryRes];
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