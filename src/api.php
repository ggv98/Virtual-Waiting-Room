<?php
    require_once "db.php";
    require_once "user.php";
    require_once "utility.php";
    require_once "student_info.php";
    require_once "waiting_room.php";

    session_start();
    date_default_timezone_set('Europe/Sofia');

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/login$/", $requestURL)) {
        login();
    } elseif(preg_match("/logout$/", $requestURL)) {
        logout();
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
    // elseif(preg_match("/meet-record$/", $requestURL)) {
    //     create_meet_record();
    // }
    elseif(preg_match("/get-teacher-waiting-rooms$/", $requestURL)) {
        get_waiting_rooms_given_teacher_id();
    }
    elseif(preg_match("/get-all-waiting-rooms$/", $requestURL)) {
        get_all_waiting_rooms();
    }
    elseif(preg_match("/get-students-by-waiting-room$/", $requestURL)) {
        get_students_by_waiting_room();
    }
    elseif(preg_match("/get-room-details$/", $requestURL)) {
        get_room_details();
    }
    elseif(preg_match("/delete-expired-waiting-rooms$/", $requestURL)) {
        delete_expired_waiting_rooms();
    }
    elseif(preg_match("/get-userId$/", $requestURL)) {
        get_userId();
    }
    elseif(preg_match("/delete-meet-record$/", $requestURL)) {
        delete_meet_record();        
    }
    elseif(preg_match("/get-room-by-id$/", $requestURL)) {
        get_room_by_id();
    }
    elseif(preg_match("/update-queue-start-times$/", $requestURL)) {
        add_delay();
    }else {
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
            $response = ["success" => true, "data" => $username];
        } else {
            $response = ["success" => false, "data" => "No existing session"];
        }

        echo json_encode($response);
    }

    function get_userId() {
        $userId;

        if ($_SESSION) {
            if ($_SESSION["username"]) {
                $userId = $_SESSION["userId"];
            } else {
                $userId = "No user";
            }
            $response = ["success" => true, "data" => $userId];
        } else {
            $response = ["success" => false, "data" => "No existing session"];
        }

        echo json_encode($response);
    }

    function sign_up_for_meet() {
        $errors = [];
        $response = [];
        $db = new Database();

        if ($_POST) {
            $data = json_decode($_POST["data"], true);

            $roomId = testInput($data["roomId"]);
            $meetType = testInput($data["meetType"]);
            $waitingRoom = new waiting_room();
            $waitingRoom->load($roomId);
            $query = $db->getLastStudentOnQueueQuery(["roomId"=>$roomId]);
            if ($query['success']){
                $data = $query["data"]->fetch(PDO::FETCH_ASSOC);
                if ($data['time']){
                    $meetTime = new DateTime($data['time']);
                    $meetTime->modify("+{$waitingRoom->getAvgDuration()} minutes");
                    $meetTime = $meetTime->format('Y-m-d H:i:s');
                } elseif($waitingRoom->getStartTime()<date('Y-m-d H:i:s')){
                    $meetTime = date('Y-m-d H:i:s');
                } else{
                    $meetTime = $waitingRoom->getStartTime();
                }
                $recordQuery = $db->saveMeetRecordQuery(["roomId"=> $roomId, 
                                                         "studentId" => $_SESSION["userId"], 
                                                         "meetTime" => $meetTime,  
                                                         "reason"=>$meetType]);
            } else {
                $errors[] = "Database Fail!";
            }

        } else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true, "data" => ["roomId"=>$roomId, "roomTitle"=>$waitingRoom->getTitle(), "meetTime"=>$meetTime]];
        }

        echo json_encode($response);
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

    // getting waiting rooms for current session's teacher
    function get_waiting_rooms_given_teacher_id() {
        if($_SESSION && $_SESSION["userId"]){
                $teacherId = $_SESSION["userId"];

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
            } else{
                $response = ["success" => false];
            }
                
        echo json_encode($response);
    }

    function get_all_waiting_rooms() {
        $db = new Database();
        $query = $db->selectAllWaitingRoomsQuery();
        
        $queryRes = [];
        while ($row = $query["data"]->fetch(PDO::FETCH_ASSOC)) {
            $query2 = $db->getMeetRecordByRoomAndStudentQuery(["roomId"=> $row['id'], "studentId"=> $_SESSION['userId']]);
            if($query2){
                $data = $query2["data"]->fetch(PDO::FETCH_ASSOC);
                if ($data){
                    $row['isRegistered'] = true;
                    $row['meetTime'] = $data['meetTime'];
                } else{
                    $row['isRegistered'] = false;
                }
            }
            array_push($queryRes, $row);
        }

        if (empty($queryRes)) {
            $response = ["success" => false];
        } else {
            $response = ["success" => true, "data" => $queryRes];
        }

        echo json_encode($response);
    }

    function get_students_by_waiting_room() {
        $errors = [];
        $response = [];
        $db = new Database();

        $students = [];

        if ($_SESSION) {
            if ($_POST) {
                $data = json_decode($_POST["data"], true);
                $roomId = testInput($data["roomId"]);

                $room = new waiting_room();
                $room->load($roomId);
                $roomCreaterId = $room->getTeacherId();
                $querierHasAccess = ($roomCreaterId == $_SESSION["userId"]);

                if ($querierHasAccess) {

                    $query = $db->getMeetRecordByRoomIdQuery(["roomId"=>$roomId]);
                    if ($query['success']) {
                        while ($data = $query["data"]->fetch(PDO::FETCH_ASSOC)) {
                            array_push($students, $data);
                        }
                    } else {
                        $errors[] = "Database Fail!";
                    }
                } else {
                    $errors[] = "Invalid url!";
                }

            } else {
                $errors[] = "Invalid request";
            }
        } else {
            $errors[] = "Seems like session has expired";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true, "data" => $students];
        }

        echo json_encode($response);
    }

    function get_room_details() {
        $errors = [];
        $response = [];
        $db = new Database();
        
        if ($_POST) {
            $data = json_decode($_POST["data"], true);
            
            $roomId = $data['roomId'];
            $currentUser = NULL;
            $queue = [];

            $roomQuery = $db->selectWaitingRoomByIdQuery(["id" => $roomId]);
            if ($roomQuery["success"]) {
                $waitingRoom = $roomQuery["data"]->fetch(PDO::FETCH_ASSOC);
            }

            $query = $db->getQueueByRoomIdQuery(["roomId"=>$roomId]);

            while ($row = $query["data"]->fetch(PDO::FETCH_ASSOC)) {
                if($row["studentID"]==$_SESSION['userId']){
                   $currentUser = $row;
                }
                array_push($queue, $row);
            }

        } else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true, "data" => ["room" => $waitingRoom, "currentUser" => $currentUser, "queue" => $queue]];
        }

        echo json_encode($response);
    }

    // DO NOT USE IT IT CAN HELP YOU WITH UPDATING QUEUE TIMES
    function add_delay(){
        $response = [];
        $db = new Database();
        
        if ($_POST) {
            $data = json_decode($_POST["data"], true);
            
            $roomId = $data['roomId'];
            $delay = $data['delay'];

            // $delay = intval($delay);
            // $roomId = intval($roomId);

            $query = $db->addDelayInQueueQuery(["id" => $roomId, "delay" => $delay]);
            if ($query["success"]) {
                $response = ["success" => true, "data" => [$delay, $roomId]];
            } else {
                $response = $query;
            }

        } else {
            $response = ["success" => false];
        }

        echo json_encode($response);
    }

    function logout() {
        if ($_SESSION) {
            session_unset();
            session_destroy();
            
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    }

    function delete_expired_waiting_rooms() {
        $db = new Database();
        $query = $db->deleteExpiredWaitingRoomsQuery();

        if ($query['success']) {
            $query["data"]->fetch(PDO::FETCH_ASSOC);
            
            $response = ['success' => true];
        } else {
            $response = ['success' => false, 'error' => "Database failed"];
        }

        echo json_encode($response);
    }

    function delete_meet_record() {
        if ($_POST) {
            $data = json_decode($_POST["data"], true);
            
            $roomId = $data["roomId"];
            $userId = $data["userId"];
            
            $db = new Database();
            // get room id and studentId
            $queryData = ["roomId" => $roomId,
                        "studentId" => $userId];

            $query = $db->deleteMeetRecordQuery($queryData);
            if ($query['success']) {
                $query["data"]->fetch(PDO::FETCH_ASSOC);
            
                $response = ['success' => true];
            } else {
                $response = ['success' => false, 'error' => "Database failed"];
            }
        }
        echo json_encode($response);
    }

    function get_room_by_id() {
        $db = new Database();

        if ($_POST) {
            $data = json_decode($_POST["data"], true);
            $roomId = $data["roomId"];

            $query = $db->selectWaitingRoomByIdQuery(["id" => $roomId]);
            if ($query['success']) {
                $data = $query["data"]->fetch(PDO::FETCH_ASSOC);
            
                $response = ['success' => true, "data" => $data];
            } else {
                $response = ['success' => false, 'error' => "Database failed"];
            }
        }
        echo json_encode($response);
    }

?>