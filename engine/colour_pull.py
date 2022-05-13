# %%
from colorthief import ColorThief
import pandas as pd
import matplotlib.colors as colors
import math

PATH = "teams.csv"
IMG_PATH = "images"
OUT_DIR = "team_database.csv"

BRIGHT_COL = "#FFF"
DARK_COL = "#000"

data = {"text_colour": [],
        "bg_colour": [],
        "rgb_colour": []}

df = pd.read_csv(PATH, ",")


def rgbToHex(rgb_tuple):
    return colors.rgb2hex([1.0*x/255 for x in rgb_tuple])


def calculateTextColour(c):
    R = c[0]
    G = c[1]
    B = c[2]

    brightness = math.sqrt(
        R * R * .241 +
        G * G * .691 +
        B * B * .068)
    return brightness


for index, row in df.iterrows():
    path = IMG_PATH + "/" + row["img_refs"]
    bg_col = ""

    img = ColorThief(path)
    # get the dominant color
    dominant_colour = img.get_color(quality=1)

    bg_colour = rgbToHex(dominant_colour)

    brightness = calculateTextColour(dominant_colour)
    if brightness < 130:
        bg_col = BRIGHT_COL
    else:
        bg_col = DARK_COL

    data["bg_colour"].append(bg_colour)
    data["text_colour"].append(bg_col)

bg_series = pd.Series(data=data["bg_colour"], name="bg_colours")
tex_series = pd.Series(data=data["text_colour"], name="text_colours")

df = df.join(bg_series)
df = df.join(tex_series)
df.head()

df.to_csv(OUT_DIR, index=False)
