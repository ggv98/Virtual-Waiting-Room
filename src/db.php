<?php
    class Database {
        private $connection;
        private $insertUserStatement;
        private $selectUserStatement;
        private $selectUserByIdStatement;

        public function __construct() {
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            $this->init($host, $dbname, $user, $password);
        }

        private function init($host, $dbname, $user, $password) {
            try {
                $this->connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $this->prepareStatements();
            } catch(PDOException $e) {
                return "Connection failed: " . $e->getMessage();
            }
        }

        private function prepareStatements() {
            // Users Statements
            $sql = "INSERT INTO users(userName, password, email, userType) VALUES (:user, :password, :email, :type)";
            $this->insertUserStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE username=:user";
            $this->selectUserStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE id=:id";
            $this->selectUserByIdStatement = $this->connection->prepare($sql);
            
            // students_info Statements
            $sql = "SELECT * FROM students_info WHERE userID =:userId";
            $this->selectUserProfileInfo = $this->connection->prepare($sql);

            $sql = "INSERT INTO students_info(userID, firstName, lastName, facultyNumber, degree, speciality, course,  groupe)
                    VALUES (:userId, :firstName, :lastName, :facultyNumber, :degree, :speciality, :course, :groupe)";
            $this->insertUserInfoStatement = $this->connection->prepare($sql);

            $sql = "UPDATE students_info SET Image=:image WHERE userID=:userId";
            $this->updateUserImageStatement = $this->connection->prepare($sql);

            // waiting_room Statements
            $sql = "INSERT INTO waiting_room(teacherID,	title, subject,	avgDuration, message, startTime, endTime, meetType,	address)
                    VALUES (:teacherID,	:title, :subject, :avgDuration, :message, :startTime, :endTime, :meetType,	:address)";
            $this->insertWaitingRoomStatement = $this->connection->prepare($sql);

            $sql = "UPDATE waiting_room SET message=:message WHERE id=:id";
            $this->updateWaitingRoomMsgStatement = $this->connection->prepare($sql);
            
            $sql = "SELECT * FROM waiting_room";
            $this->selectAllWaitingRooms = $this->connection->prepare($sql);

            $sql = "SELECT * FROM waiting_room WHERE teacherID = :teacherId";
            $this->selectWaitingRoomsGivenTeacherIdStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM waiting_room WHERE id=:id";
            $this->selectWaitingRoomByIdStatement = $this->connection->prepare($sql);

            //meet-record Statement
            $sql = "SELECT Max(meetTime) as time FROM meet_record WHERE roomID=:roomId";
            $this->getLastStudentOnQueueStatement = $this->connection->prepare($sql);

            $sql = "INSERT INTO meet_record(roomID, studentID, meetTime, reason) VALUES (:roomId, :studentId, :meetTime, :reason)";
            $this->insertMeetRecordStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM meet_record WHERE roomID=:roomId and studentID=:studentId";
            $this->selectMeetRecordByroomIdandStudentIdStatement = $this->connection->prepare($sql);

            $sql = "SELECT students_info.firstName, students_info.lastName FROM meet_record JOIN students_info ON meet_record.studentID=students_info.userID WHERE roomID=:roomId";
            $this->selectStudentsGivenRoomIdStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM meet_record JOIN students_info on studentID=userID 
                                WHERE roomID=:roomId 
                                ORDER BY meetTime ASC";
            $this->getQueueByRoomIdStatement = $this->connection->prepare($sql);

            $sql = "UPDATE meet_record SET meetTime = ADDTIME(meetTime, :delay) WHERE roomID = :id";
            $this->addDelayInQueueStatement = $this->connection->prepare($sql);
        }
        // USERS QUERY
        public function insertUserQuery($data) {
            try {
                // ["user" => "...", "password => "...", :email => ",,,"]
           
                $this->insertUserStatement->execute($data);

                return ["success" => true];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
        
        // TODO would be better if we pass the userId as function parameter
        public function selectUserByIdQuery($data) {
            try {
                // ["id" => "..."]
                $this->selectUserByIdStatement->execute($data);

                return ["success" => true, "data" => $this->selectUserByIdStatement];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
        
        public function selectUserQuery($data) {
            try {
                // ["user" => "..."]
                $this->selectUserStatement->execute($data);

                return ["success" => true, "data" => $this->selectUserStatement];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

// User INFO QUERY

        public function insertUserInfoQuery($data) {
            try {
                // ["userid" => "...", "firstName => "...", :lastName => ",,,"..............]
                $this->insertUserInfoStatement->execute($data);

                return ["success" => true];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function updateUserImageQuery($data){
            try{
                 // ["userid" => "...", "image" => "..."]
                $this->updateUserImageStatement->execute($data);

                return ["success" => true];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
        
        public function selectUserInfoQuery($data) {
            try {
                // ["id" => "..."]
                $this->selectUserProfileInfo->execute($data);

                return ["success" => true, "data" => $this->selectUserProfileInfo];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }


// WAITING ROOMS QUERY

    public function createWaitingRoomQuery($data) {
        try {
            // ["teacherID" => "...", "title => "...", :subject => ",,,"..........]
    
            $this->insertWaitingRoomStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function updateWaitingRoomMsgQuery($data) {
        try {
            // ["id" => "...", "message => "..."]
    
            $this->updateWaitingRoomMsgStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    
    public function selectAllWaitingRoomsQuery() {
        try {
            // ["id" => "..."]
            $this->selectAllWaitingRooms->execute();

            return ["success" => true, "data" => $this->selectAllWaitingRooms];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function selectWaitingRoomsGivenTeacherIdQuery($data) {
        try {
            // ["teacherID" => "..."]
            $this->selectWaitingRoomsGivenTeacherIdStatement->execute($data);

            return ["success" => true, "data" => $this->selectWaitingRoomsGivenTeacherIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    public function selectWaitingRoomByIdQuery($data) {
        try {
            // ["id" => "..."]
            $this->selectWaitingRoomByIdStatement->execute($data);

            return ["success" => true, "data" => $this->selectWaitingRoomByIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    public function getLastStudentOnQueueQuery($data) {
        try {
            // ["id" => "..."]
            $this->getLastStudentOnQueueStatement->execute($data);

            return ["success" => true, "data" => $this->getLastStudentOnQueueStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function getQueueByRoomIdQuery($data){
        try {
            // ["roomId" => "..."]
            $this->getQueueByRoomIdStatement->execute($data);

            return ["success" => true, "data" => $this->getQueueByRoomIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    
    public function saveMeetRecordQuery($data) {
        try {
    
            $this->insertMeetRecordStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
        
    public function addDelayInQueueQuery($data) {
        try {
    
            $this->addDelayInQueueStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function getMeetRecordByRoomAndStudentQuery($data) {
        try {
            // ["roomId" => "...", "studentId" => "..."]
            $this->selectMeetRecordByroomIdandStudentIdStatement->execute($data);

            return ["success" => true, "data" => $this->selectMeetRecordByroomIdandStudentIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" =>  $e->getMessage()];
        }
    }

    public function getMeetRecordByRoomIdQuery($data) {
        try {
            // ["roomId" => "...", "studentId" => "..."]
            $this->selectStudentsGivenRoomIdStatement->execute($data);

            return ["success" => true, "data" => $this->selectStudentsGivenRoomIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" =>  $e->getMessage()];
        }
    }
    
    
}

?>