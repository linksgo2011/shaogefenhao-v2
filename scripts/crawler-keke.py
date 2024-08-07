import os
import requests
from bs4 import BeautifulSoup
import re

# 基本 URL 和列表页 URL 模式
base_url = "https://www.kekenet.com"
list_url_pattern = base_url + "/Article/yule/joke/List_{}.shtml"

# 设置保存 MP3 文件的目录
download_dir = "mp3_downloads"
os.makedirs(download_dir, exist_ok=True)

# 下载 MP3 文件
def download_mp3(mp3_url, filename):
    print("Processing Mp3", mp3_url)
    try:
        response = requests.get(mp3_url, stream=True)
        response.raise_for_status()
        filepath = os.path.join(download_dir, filename)
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Downloaded: {filename}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {mp3_url}: {e}")

# 处理详情页面
def process_detail_page(detail_url):
    try:
        response = requests.get(detail_url)
        response.raise_for_status()
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, "html.parser")

        # 查找 mp3_fileurl 元素并提取 src 属性
        mp3_element = soup.find("source", id="mp3_fileurl")  # 假设 MP3 文件是 <audio> 元素
        if mp3_element and mp3_element.get("src"):
            mp3_url = mp3_element["src"]
            filename = mp3_url.split('/')[-1]
            download_mp3(mp3_url, filename)
        else:
            print(f"No MP3 URL found on {detail_url}")
    except requests.exceptions.RequestException as e:
        print(f"Error processing {detail_url}: {e}")

# 处理列表页面
def process_list_page(page_num):
    list_url = list_url_pattern.format(page_num)
    print("Processing List Page", list_url)
    try:
        response = requests.get(list_url)
        response.raise_for_status()
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, "html.parser")

        # 查找所有链接
        links = soup.find_all("a", href=True)
        for link in links:
            href = link["href"]
            if "听笑话学英语" in link.get_text():
                detail_url = href
                print("Processing Detail", detail_url)
                process_detail_page(detail_url)
    except requests.exceptions.RequestException as e:
        print(f"Error processing {list_url}: {e}")

# 处理所有列表页（从 351 到 1 页）
def process_all_list_pages():
    for page_num in range(41, 0, -1):  # 从 351 到 1 页
        process_list_page(page_num)

if __name__ == "__main__":
    process_all_list_pages()
