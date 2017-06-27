import json
import requests
from gtts import gTTS
import os
from pushover import init, Client

read = requests.get("http://109.230.230.209/hack4tk/get_warning_message.php?token=tk4hack")
if (read != '[]'):
    read.text
js = '[{0}]'.format(read.text)
data = json.loads(js)
print(data)
while(True):
    tts = gTTS(text='Temperature too high in Vertikal Muehle please contact '+data[0]["contact_name"]+' imediatly', lang='en', slow=False)
    tts.save("temp.mp3")
    os.system("vlc temp.mp3")

    init("aimoegrsmp6xhz4mxgx5c16p7qkkcj")
    Client("ucndiysyovk86rgy1n16dv9pryzm54").send_message('Please contact '+data[0]["contact_name"]+' under 00492018440', title="Warning Message")


