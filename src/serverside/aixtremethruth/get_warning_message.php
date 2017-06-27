<?php
include('db_conf.php');
$verbindung = mysql_connect ($db_host,
$db_username, $db_password)or die ("keine Verbindung möglich. Benutzername oder Passwort sind falsch");
mysql_select_db($db_name)or die ("Die Datenbank existiert nicht.");

$thresh = 2;
$token_check = "tk4hack";
if(!isset($_GET['token']) || $_GET['token'] != $token_check){
  echo "err";
  exit();
}
//RtlUdh7vQfIjGiDBE8xkftIX0KHAgF1vH2mxJ3DJm3mxHKMVKR1x8EZ8MbTDcQe08LEICrp0si54i2AQD6PALw==


$suid_loop = mysql_query("SELECT *,SUM(`warning_limit`) FROM `sensors` WHERE EXISTS (SELECT * FROM `watched_sensors` WHERE `warning_flag`='1')");
while($row_dev_l = mysql_fetch_array($suid_loop )) {
    $suid = $row_dev_l['suid'];
    //echo $suid;


    $suid_loop1 = mysql_query("SELECT * FROM `companies` RIGHT JOIN `machines` ON `machines`.`company_id` = `companies`.`id` WHERE `machines`.`id`='".$row_dev_l['machine_id']."'");
    $row_dev_lm = mysql_fetch_array($suid_loop1 );

echo   json_encode($row_dev_lm);


   // $warn_clear= mysql_query("UPDATE `sensors` SET `warning_limit`='0' WHERE `warning_limit`='1' AND `suid`='".$suid."'");
}



exit();