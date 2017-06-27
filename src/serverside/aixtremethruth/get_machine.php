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


if(!isset($_GET['comp_id'])){
  echo "comp id not set";
  exit();
}


$sth = mysql_query("SELECT * FROM `machines` WHERE `company_id` = '".$_GET['comp_id']."'");


$rows = array();
while($r = mysql_fetch_assoc($sth)) {
    $rows[] = $r;
}

print json_encode($rows);

//while($row_dev = mysql_fetch_array($fetchinfo_dev)) {
//if($row_dev['item_count'] == -1 && $row_dev['item_name'] == ""){

	
//}







exit();