<?php
include('db_conf.php');
$verbindung = mysql_connect ($db_host,
$db_username, $db_password)or die ("keine Verbindung möglich. Benutzername oder Passwort sind falsch");
mysql_select_db($db_name)or die ("Die Datenbank existiert nicht.");


$token_check = "tk4hack";

if(!isset($_GET['token']) || $_GET['token'] != $token_check){
  echo "wrong token";
  exit();
}




if(!isset($_GET['comp_id']) || !isset($_GET['mach_id']) || !isset($_GET['value']) && !isset($_GET['suid']) && !isset($_GET['type']) ){
echo "parameter not set";
exit();
}

$sen_type = "unknown";
$min = "-1";
$max = "10000";
if($_GET['type'] == "temp"){
    $sen_type = "TEMP";
    $min = "10";
    $max = "90";
}else if($_GET['type'] == "hum"){
    $sen_type = "HUM";
    $min = "30";
    $max = "80";
}

//adde für alle
$fetchinfo_dev = mysql_query("INSERT INTO `sensors`(`sensor_type`, `suid`, `value`, `machine_id`, `min_value`, `max_value`) VALUES ('".$sen_type."','".$_GET['suid']."','".$_GET['value']."','".$_GET['mach_id']."','".$min."','".$max."')");

echo "ok";
exit();


?>