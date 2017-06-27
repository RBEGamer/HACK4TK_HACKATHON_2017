function main() {

  $('.projects').hide();
  $('.projects-button').on('click',function(){
	$(this).toggleClass('active');
  $(this).text('Projects Viewed');
  $(this).next().slideToggle(400);

  });

}



function init(){



load_comp();


}
var ch = [];
company_array = "";
function load_comp() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        //   alert(xmlhttp.responseText);
           if (xmlhttp.status == 200) {
              var data = xmlhttp.responseText;
              data = JSON.parse(data);
              company_array = data;
              //alert(data[0].id);
              result = "<select name='comp_select' id='comp_select' onchange='comp_changed()'><option value='-1'>--- PLEASE SELECT ---</option>";
              for (i = 0; i < data.length; i++) {
              result+= "<option value='"+data[i].id+"'>"+ data[i].company_name + "</option>";
              }
              result += "</select>";
              document.getElementById("company_select_div").innerHTML = result;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("GET", "http://109.230.230.209/hack4tk/get_company.php?token=tk4hack", true);
    xmlhttp.send();
}


function load_machine(mid) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
          // alert(xmlhttp.responseText);
           if (xmlhttp.status == 200) {
              var data = xmlhttp.responseText;
              data = JSON.parse(data);
              company_array = data;
              //alert(data[0].id);
              result = "<select name='machine_select' id='machine_select' onchange='machine_changed()'><option value='-1'>--- PLEASE SELECT ---</option>";
              for (i = 0; i < data.length; i++) {
              result+= "<option value='"+data[i].id+"'>"+ data[i].name + "</option>";
              }
              result += "</select><br><input type='button' name='mach_refrehs_btn' id='mach_refrehs_btn' onclick='machine_changed()' value='REFRESH' />";
              document.getElementById("machine_select_div").innerHTML = result;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("GET", "http://109.230.230.209/hack4tk/get_machine.php?token=tk4hack&comp_id=" + mid, true);
    xmlhttp.send();
}



function comp_changed(){
load_machine(document.getElementById("comp_select").value);
//  document.getElementById("com_name").innerHTML = company_array[document.getElementById("comp_select").value].company_name;
}

function machine_changed(){

//now load the data
//create monitor data
document.getElementById("block_holder").innerHTML = "";
//SHOW BUTTONS
load_sensor_settings(document.getElementById("machine_select").value);
//SHOW GRAPHS


}


function load_sensor_values(usid){
//alert(usid);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      //   alert(xmlhttp.responseText);
         if (xmlhttp.status == 200) {
            var data = xmlhttp.responseText;
            data = JSON.parse(data);

        //  suid = "---UNKNOWN---"
           arr = []
            for (i = 0; i < data.length; i++) {
          //    alert(data[i].value);
            //    suid =  data[0].suid

                arr.push({
                    y: data[i].value*1.0,
                    label: 20
                });
            }


            ch.push(new CanvasJS.Chart("chart_" + usid, {
      				title: {
      					text: usid
      				},
      				data: [
      				{
      					type: "splineArea",
      					//dataPoints: pre_dataPoints
      					dataPoints: arr
      				}
      				]
      			}));

      			ch[ch.length-1].render();





         }
         else if (xmlhttp.status == 400) {
            alert('There was an error 400');
         }
         else {
             alert('something else other than 200 was returned');
         }
      }
  };
  xmlhttp.open("GET", "http://109.230.230.209/hack4tk/get_query_data.php?token=tk4hack&dataonly&usid="+usid, true);
  xmlhttp.send();

  //dataonly
}


//chart_temp
function create_block(suid){
tmp = "<div class='skill-js'><h1>" + suid +"</h1><p class='description'><ul class='projects'><li><div id='chart_" + suid +"' style='height: 150px; width: 1100px;''></li><li><input type='button' name='swbtn' value='SET WATCHER' onclick='set_monitor(\""+suid+"\",\"1\")'/><input type='button' name='swbtn' value='SET WATCHER' onclick='set_monitor(\""+suid+"\",\"1\")'/></li></ul></p></div>"
  document.getElementById("block_holder").innerHTML += tmp;
}

function load_sensor_settings(mid){
//  alert(mid);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        // alert(xmlhttp.responseText);
         if (xmlhttp.status == 200) {
            var data = xmlhttp.responseText;
            data = JSON.parse(data);
            result = "<table>";
            for (i = 0; i < data.length; i++) {
              create_block(data[i].suid);
              load_sensor_values(data[i].suid);
            }
            document.getElementById("watchlist_div").innerHTML = result;
         }
         else if (xmlhttp.status == 400) {
            alert('There was an error 400');
         }
         else {
             alert('something else other than 200 was returned');
         }
      }
  };
  xmlhttp.open("GET", "http://109.230.230.209/hack4tk/get_query_data.php?token=tk4hack&mid="+mid, true);
  xmlhttp.send();



}





function set_monitor(usid, state){
//alert(usid)


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        // alert(xmlhttp.responseText);
         if (xmlhttp.status == 200) {
            var data = xmlhttp.responseText;
            alert(data);
         }
         else if (xmlhttp.status == 400) {
            alert('There was an error 400');
         }
         else {
             alert('something else other than 200 was returned');
         }
      }
  };
  xmlhttp.open("GET", "http://109.230.230.209/hack4tk/set_flag.php?token=tk4hack&usid=" + usid + "&state=" + state, true);
  xmlhttp.send();

}
//$(document).ready(main);
