import csv
import time
import request

with open('main.csv', 'rb') as f:

    reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
    for row in reader:
        read = request.get()
        print row
        read.txt
        time.sleep(1000)
