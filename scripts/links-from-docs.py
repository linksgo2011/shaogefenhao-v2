import os
import re

def extract_links_from_txt(txt_file):
    with open(txt_file, 'r', encoding='utf-8') as file:
        text = file.read()
        pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        links = re.findall(pattern, text)
    return links

def extract_links_from_folder(folder_path):
    docx_files = [f for f in os.listdir(folder_path) if f.endswith('.txt')]
    links = []

    for file in docx_files:
        file_path = os.path.join(folder_path, file)
        print("\r\n"+file)

        links =  extract_links_from_txt(file_path)
        for link in links:
            print(link)
    return links

folder_path = "/Users/nlin/Downloads/txts"
extract_links_from_folder(folder_path)

