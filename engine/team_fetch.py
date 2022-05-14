# %%
from bs4 import BeautifulSoup
import requests
import validators
import shutil
from urllib.request import urlopen
import pandas as pd
from pathlib import Path
import re

url = "https://www.vlr.gg/vct/standings"
host_url = "https://www.vlr.gg"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

OUTPUT_DIR = str(Path.cwd()) + "/team_names.csv"
IMAGE_DIR = "images"

# create dictionary to store values
data = {"team_names": [],
        "img_refs": []}

table_container = soup.find(class_="eg-standing-container")
table_rows = table_container.find_all(class_="wf-table")

# remmove divs with class 'ge-text-light'
for div in soup.find_all("div", {'class': 'ge-text-light'}):
    div.decompose()

# iterate through rows in <tr>
for rows in table_rows:
    team_names = rows.find_all(class_="text-of")

    for i, code in enumerate(team_names):
        if i % 2 == 0:
            # convert codes to string and remove /t
            unicode = str(code.text)
            reg = re.sub(r'[^\S ]+', '', unicode)

            print(reg)

            data["team_names"].append(reg)

for rows in table_rows:
    img_tags = rows.find_all("img")

    for img in img_tags:
        src = img.attrs['src']

        full_url = "https:" + src
        valid = validators.url(full_url)
        server_url = host_url + src

        name = src.split("/")
        name = name[-1]

        image_name = IMAGE_DIR + "/" + name

        if valid == True:
            r = requests.get(full_url, stream=True)

            if r.status_code == 200:  # 200 status code = OK
                with open(image_name, 'wb') as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)
        else:
            server_url = host_url + src
            s = requests.get(server_url, stream=True)

            if s.status_code == 200:  # 200 status code = OK
                with open(image_name, 'wb') as f:
                    s.raw.decode_content = True
                    shutil.copyfileobj(s.raw, f)

        data["img_refs"].append(name)


df = pd.DataFrame(data=data)
df.head()

df.to_csv(OUTPUT_DIR, index=False)

# %%
