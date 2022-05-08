import json
import pandas as pd

csvFilePath = "./src/assets/default.csv"
jsonFilePath = "./src/assets/default.json"

data = {
    "name": [],
    "tcolour": [],
    "bgcolour": [],
    "logo": []
}

df = pd.read_csv(csvFilePath)

for index, row in df.iterrows():
    team_name = df.iloc[index, 1]
    text_col = df.iloc[index, 2]
    bg_col = df.iloc[index, 3]
    logo_file = df.iloc[index, 4]

    data["name"].append(team_name)
    data["tcolour"].append(text_col)
    data["bgcolour"].append(bg_col)
    data["logo"].append(logo_file)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))
