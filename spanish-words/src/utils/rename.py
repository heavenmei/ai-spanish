import os
import pandas as pd
import json


def rename_mp3_files(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".mp3"):
            new_name = f"{filename.replace('modernSpanish1_', '')}"

            os.rename(
                os.path.join(directory, filename), os.path.join(directory, new_name)
            )
            print(f"Renamed: {filename} to {new_name}")


def clean_csv(csv_file_path):
    df = pd.read_csv(csv_file_path, encoding="utf-8")
    df["definition"] = df.apply(
        lambda row: f"{row['section']}册课{row['page']}页", axis=1
    )

    df.drop(columns=["section", "page"], inplace=True)

    df.to_csv(csv_file_path, index=False, encoding="utf-8")


if __name__ == "__main__":
    directory = "../data/modernSpanish1"
    rename_mp3_files(directory)

    # csv_file_path = "../../data/老现西第二册.csv"
    # clean_csv(csv_file_path)
