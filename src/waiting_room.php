<?php

require_once "db.php";

class waiting_room {
    private $id;
    private $teacherID;
    private $title;
    private $subject;
    private $avgDuration;
    private $message;
    private $startTime;
    private $endTime;
    private $meetType;
    private $address;

    private $db;

    public function __construct($teacherID='', $title='', $subject='', $avgDuration='', $message='', $startTime='', $endTime='', $meetType='', $address='', $id='') {
        $this->id = $id;
        $this->teacherID = $teacherID;
        $this->title = $title;
        $this->subject = $subject;
        $this->avgDuration = $avgDuration;
        $this->message = $message;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->meetType = $meetType;
        $this->address = $address;

        $this->db = new Database();
    }

    public function getId() {
        return $this->id;
    }

    public function getTeacherId() {
        return $this->teacherID;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getSubject() {
        return $this->subject;
    }
    public function getAvgDuration() {
        return $this->avgDuration;
    }

    public function getMessage() {
        return $this->message;
    }

    public function getStartTime() {
        return $this->startTime;
    }

    public function getEndTime() {
        return $this->endTime;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getMeetType() {
        return $this->meetType;
    }

    public function createWaitingRoom() {
        $query = $this->db->createWaitingRoomQuery(["teacherID" => $this->teacherID,
                                                    "title" => $this->title,
                                                    "subject" => $this->subject,
                                                    "avgDuration" => $this->avgDuration,
                                                    "message" => $this->message,
                                                    "startTime" => $this->startTime,
                                                    "endTime" => $this->endTime,
                                                    "meetType" => $this->meetType,
                                                    "address" => $this->address,]);

        return $query;
    }

    public function updateWaitingRoomMsg($message) {
        $query = $this->db->updateWaitingRoomMsgQuery(["id" => $this->id, "message" => $message]);

        return $query;
    }

    public function load($id) {
        $query = $this->db->selectWaitingRoomByIdQuery(["id" => $id]);

        if ($query["success"]) {
            $room = $query["data"]->fetch(PDO::FETCH_ASSOC);

            if ($room) {
                $this->id = $room['id'];
                $this->teacherID = $room["teacherID"];
                $this->title = $room["title"];
                $this->subject = $room["subject"];
                $this->avgDuration = $room["avgDuration"];
                $this->message = $room["message"];
                $this->startTime = $room["startTime"];
                $this->endTime = $room["endTime"];
                $this->meetType = $room["meetType"];
                $this->address = $room["address"];
                return ["success" => true];

            } else {
                return ["success" => false, "error" => "Няма такава стая"];
            }
        } else {
            return $query;
        }
    }

}