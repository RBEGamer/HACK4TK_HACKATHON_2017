import csv
import time
import requests

print("DATA SIMULATOR STARTED MAINOUT.CSV")
while 1:
    with open('./mainout.csv', 'rt') as f:
        reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
        row_counter = 0;
        for row in reader:
            if row_counter == 0:
                row_counter = 1
                continue
            read = requests.get("http://109.230.230.209/hack4tk/insert_data.php?token=tk4hack&comp_id=2&mach_id=1&value="+ row[2] +"&suid=tempSensor&type=temp")
            print(read.text)
            #print(row[0])
                #read.text
            time.sleep(100)
            read = requests.get("http://109.230.230.209/hack4tk/insert_data.php?token=tk4hack&comp_id=2&mach_id=1&value="+ row[3] +"&suid=humSensor&type=hum")
            print(read.text)
                #print(row)
            #read.text
            time.sleep(2000)
