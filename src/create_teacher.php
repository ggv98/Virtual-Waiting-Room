<?php
$config = parse_ini_file("../config/config.ini", true);

$host = $config['db']['host'];
$dbname = $config['db']['name'];
$user = $config['db']['user'];
$password = $config['db']['password'];

// Create connection
$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$teacherUserName = "admin";
$teacherPassword = password_hash("admin", PASSWORD_DEFAULT);
$teacherEmail = "admin@gmail.com";
$teacherFirstName = "Teacher";
$teacherLastName = "Teacher";


$sql = "BEGIN;
INSERT INTO users (userName, password, email, userType)
  VALUES('$teacherUserName', '$teacherPassword', '$teacherEmail', 'Teacher');
INSERT INTO teachers_info (userID, firstName, lastName) 
  VALUES(LAST_INSERT_ID(), '$teacherFirstName', '$teacherLastName');
COMMIT;";
$conn->exec($sql)


?>