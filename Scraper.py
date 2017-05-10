#Created by Michael Rojas

from lxml import html
from bs4 import BeautifulSoup
import requests
import json

songObjects = []

class Song(object):
    def __init__(self, track, artist):
        self.track = track
        self.artist = artist

page = requests.get('http://hypem.com/popular')
contents = page.content
soup = BeautifulSoup(contents, 'html.parser')

trackInfo = soup.find_all(class_='track_name')

for item in trackInfo:
    songName = item.find(class_='base-title').string
    if item.find(class_='remix-link') != None:
        songName += " (" + item.find(class_='remix-link').string + ")"
    artist = item.find(class_='artist').string
    song = Song(songName, artist)
    songObjects.append(song)
 

json_string = ""
for item in songObjects:
    json_string += json.dumps(item.__dict__)
    



with open("hypem.json", "w") as json_file:
    json.dump(json_string, json_file, indent = 5)

with open('hypem.json') as data_file:    
    data = json.load(data_file)  
    
print(data)
