import json
import requests
from gtts import gTTS
import time
import os
from pushover import init, Client



while(True):
    read = requests.get("http://109.230.230.209/hack4tk/get_warning_message.php?token=tk4hack")
    cont = read.text
    print(cont)
    if ('{' in cont):

        init("aimoegrsmp6xhz4mxgx5c16p7qkkcj")
        js = '[{0}]'.format(cont)
        data = json.loads(js)
        tts = gTTS(text='Temperature too high in vertical mill please contact Dr.-Ing Heinrich Hiesinger imediatly', lang='en-us', slow=False)
        tts.save("temp.mp3")
        os.system("vlc temp.mp3")
        Client("ucndiysyovk86rgy1n16dv9pryzm54").send_message('Please contact Dr.-Ing Heinrich Hiesinger under  00492018440', title="Warning Message")
        time.sleep(10)
