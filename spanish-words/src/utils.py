import json

def saveFile(data, data_file):
    with open(data_file, mode="w", encoding="utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
