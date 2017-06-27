import json
import requests
from gtts import gTTS
import os
read = requests.get("http://109.230.230.209/hack4tk/get_warning_message.php?token=tk4hack")
if (read != '[]'):
    read.text
js = '[{0}]'.format(read.text)
data = json.loads(js)

print(data)

tts = gTTS(text='Temperature too high please contact '+data[0]["contact_name"]+' imediatly', lang='en', slow=False)
tts.save("temp.mp3")
os.system("vlc temp.mp3")

