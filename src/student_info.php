<?php

require_once "db.php";

class User_info {
    private $userID;
    private $firstName;
    private $lastName;
    private $degree;
    private $speciality;
    private $course;
    private $groupe;
    private $facultyNumber;
    private $image;

    private $db;

    public function __construct($userID, $firstName='', $lastName='', $facultyNumber='', $degree='', $speciality='', $course='', $groupe='', $image='') {
        $this->userID = $userID;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->degree = $degree;
        $this->speciality = $speciality;
        $this->course = $course;
        $this->groupe = $groupe;
        $this->facultyNumber = $facultyNumber;
        $this->image = $image;

        $this->db = new Database();
    }

    public function getName() {
        return $this->firstName + $this->lastName ;
    }

    public function getDegree() {
        return $this->degree;
    }

    public function getSpeciality() {
        return $this->speciality;
    }

    public function getUserId() {
        return $this->userID;
    }
    public function getCourse() {
        return $this->course;
    }

    public function getGroupe() {
        return $this->groupe;
    }

    public function getFacultyNumber() {
        return $this->facultyNumber;
    }

    public function getImage() {
        return $this->image;
    }
    public function saveUserInfo($userId) {
        $query = $this->db->insertUserInfoQuery(["userId" => $userId, 
                                                 "firstName" => $this->firstName,
                                                 "lastName" => $this->lastName, 
                                                 "facultyNumber" => $this->facultyNumber,
                                                 "degree" => $this->degree,
                                                 "speciality" => $this->speciality,
                                                 "course" => $this->course,
                                                 "groupe" => $this->groupe]);

        if ($query["success"]) 
            $this->userID = $userId;

        return $query;
    }

    public function updateUserImage($image) {
        $query = $this->db->updateUserImageQuery(["userId" => $this->userID, "image" => $image]);

        return $query;
    }
}