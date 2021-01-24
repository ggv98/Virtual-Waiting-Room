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
            $sql = "INSERT INTO users(userName, password, email, userType) VALUES (:user, :password, :email, :type)";
            $this->insertUserStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE username=:user";
            $this->selectUserStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE id=:id";
            $this->selectUserByIdStatement = $this->connection->prepare($sql);

            $sql = "SELECT * FROM students_info WHERE userID =:userId";
            $this->selectUserProfileInfo = $this->connection->prepare($sql);

            $sql = "INSERT INTO students_info(userID, firstName, lastName, facultyNumber, degree, speciality, course,  groupe)
                    VALUES (:userId, :firstName, :lastName, :facultyNumber, :degree, :speciality, :course, :groupe)";
            
            $this->insertUserInfoStatement = $this->connection->prepare($sql);

            $sql = "UPDATE students_info SET Image=:image WHERE userID=:userId";

            $this->updateUserImageStatement = $this->connection->prepare($sql);
        }

        public function insertUserQuery($data) {
            try {
                // ["user" => "...", "password => "...", :email => ",,,"]
           
                $this->insertUserStatement->execute($data);

                return ["success" => true];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
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

        public function selectUserQuery($data) {
            try {
                // ["user" => "..."]
                $this->selectUserStatement->execute($data);

                return ["success" => true, "data" => $this->selectUserStatement];
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


        public function selectUserByIdQuery($data) {
            try {
                // ["id" => "..."]
                $this->selectUserByIdStatement->execute($data);

                return ["success" => true, "data" => $this->selectUserByIdStatement];
            } catch(PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
    }
?>