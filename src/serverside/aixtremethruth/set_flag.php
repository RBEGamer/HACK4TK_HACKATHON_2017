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


if(!isset($_GET['suid'])){
  echo "suid not set";
  exit();
}


if(!isset($_GET['state'])){
  echo "state not set";
  exit();
}
$state = 0;
if($_GET['state'] > 0 || $_GET['state'] != "0"){
    $state = 1;
}



$sth = mysql_query("SELECT COUNT(*) FROM `watched_sensors` WHERE `suid`='".$_GET['suid']."'");
if($sth == 0){
$sth1 = mysql_query("INSERT INTO `watched_sensors`(`suid`, `warning_flag`) VALUES ('".$_GET['suid']."','".$state."')");
}else{
$sth1 = mysql_query("UPDATE `watched_sensors` SET `warning_flag`='".$state."' WHERE `suid`='".$_GET['suid']."'");
}
echo "ok";
exit();