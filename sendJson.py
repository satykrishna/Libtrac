import json
import requests


url = "http://localhost:8190/addfriend"
#url = "http://192.168.0.16:8190/register"
data = {'username':'mohit', 'friendname':'lipee'}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post(url, data=json.dumps(data), headers=headers)
