import urllib.request
import json
import re

url = "https://unsplash.com/napi/search/photos?query=luxury+marble+interior&per_page=5"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        for photo in data['results']:
            print(photo['id'], photo['urls']['raw'])
except Exception as e:
    print("Error:", e)
