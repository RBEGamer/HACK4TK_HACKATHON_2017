import json
import requests
read = requests.get("http://109.230.230.209/hack4tk/get_warning_message.php?token=tk4hack")
if (read != '[]'):
    read.text
js = '[{0}]'.format(read.text)
json.loads(js)
print (js)
