import csv
import time
import request

with open('main.csv', 'rb') as f:

    reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
    for row in reader:
        read = request.get(109.230.230.209/hack4tk/insert_data.php?token=tk4hack&comp_id=2&mach_id=1&value=10&suid=tempSensor&type=temp)
        print row
        read.txt
        time.sleep(10)
        read = request.get(109.230.230.209/hack4tk/insert_data.php?token=tk4hack&comp_id=2&mach_id=1&value=12&suid=humSensor&type=hum)
        print row
        read.txt
        time.sleep(1000)
