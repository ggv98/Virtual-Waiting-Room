<?php
    require_once "db.php";

    class User {
        private $username;
        private $password;
        private $email;
        private $userId;
        private $userType;

        private $db;

        public function __construct($username, $password, $email='', $type='') {
            $this->username = $username;
            $this->password = $password;
            $this->email = $email;
            $this->userType = $type;

            $this->db = new Database();
        }

        public function getUsername() {
            return $this->username;
        }

        public function getEmail() {
            return $this->email;
        }

        public function getUserType() {
            return $this->userType;
        }

        public function getUserId() {
            return $this->userId;
        }

        public function userExists() {
            $query = $this->db->selectUserQuery(["user" => $this->username]);

            if ($query["success"]) {
                $user = $query["data"]->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return $query;
            }
        }

        public function isValid() {
            $query = $this->db->selectUserQuery(["user" => $this->username]);

            if ($query["success"]) {
                $user = $query["data"]->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    if (password_verify($this->password, $user["password"])) {
                        $this->password = $user["password"];
                        $this->email = $user["email"];
                        $this->userId = $user["userID"];
                        $this->userType = $user["userType"];

                        return ["success" => true];
                    } else {
                        return ["success" => false, "error" => "Невалидна парола"];
                    }
                } else {
                    return ["success" => false, "error" => "Невалидно потребителско име"];
                }
            } else {
                return $query;
            }
        }
        public function getUserProfileFilledStage(){
            $query = $this->db->selectUserInfoQuery(["userId" => $this->userId]);
            if ($query["success"]) {
                $user_info = $query["data"]->fetch(PDO::FETCH_ASSOC);
                //Stages: 2->Fully filled, 1->MissingImage, 0->Not filled
                if ($user_info){
                    if(!empty($user_info['firstName']) && !empty($user_info['Image'])){
                        return ["success" => true, 'data' => 2];
                    } else {
                        return ["success" => true, 'data' => 1];
                    } 

                } else {
                    return ["success" => true, 'data' => 0];
                }
                
            } else {
                return $query;
            }
        }
        public function createUser($passwordHash) {
            $query = $this->db->insertUserQuery(["user" => $this->username, "password" => $passwordHash, "email" => $this->email, "type" => $this->userType]);

            if ($query["success"]) {
                $this->password = $passwordHash;

                return $query;
            } else {
                return $query;
            }
        }
    }
?>