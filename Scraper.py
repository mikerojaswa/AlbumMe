#Created by Michael Rojas

from lxml import html
from bs4 import BeautifulSoup
import requests
import json
import re

songObjects = []

page = requests.get('http://hypem.com/popular')
contents = page.content
soup = BeautifulSoup(contents, 'html.parser')

page2 = requests.get('http://www.hotnewhiphop.com/top100/')
contents2 = page2.content
soup2 = BeautifulSoup(contents2, 'html.parser')

page3 = requests.get('https://www.beatport.com/top-100')
contents3 = page3.content
soup3 = BeautifulSoup(contents3, 'html.parser')

hypemTrackInfo = soup.find_all(class_='track_name')
hiphopTrackInfo = soup2.find_all(class_='chartItem-body')

#S/O to: http://stackoverflow.com/questions/13323976/how-to-extract-a-json-object-that-was-defined-in-a-html-page-javascript-block-us
script = soup3.find(id="data-objects", text=re.compile('window\.Playables'))
json_text = re.search(r'^\s*window\.Playables\s*=\s*({.*?})\s*;\s*$', script.string, flags=re.DOTALL | re.MULTILINE).group(1)
beatportData = json.loads(json_text)


hypeData = {
    'songs': []
}

hiphopData = {
    'songs': []
}

for item in hiphopTrackInfo:
    trackName = item.find(class_='cover-title chartItem-artist-trackTitle').string.strip()
    artistName = item.find(class_='chartItem-artist-artistName').string
    hiphopData['songs'].append({
        'track': trackName,
        'artist': artistName
    })




for item in hypemTrackInfo:
    songName = item.find(class_='base-title').string
    if item.find(class_='remix-link') != None:
        songName += " (" + item.find(class_='remix-link').string + ")"
    artist = item.find(class_='artist').string
    hypeData['songs'].append({
        'track': songName,
        'artist': artist
    })

with open("hypem.json", "w") as json_file:
    json.dump(hypeData, json_file, indent = 5)

with open("hiphop.json", "w") as json_file:
    json.dump(hiphopData, json_file, indent = 5)

with open("beatport.json", "w") as json_file:
    json.dump(beatportData, json_file, indent = 5)

with open('hypem.json') as data_file:    
    data = json.load(data_file)  


