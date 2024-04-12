import requests
import urllib.parse
from datetime import datetime, timezone, timedelta
import time
import calendar
import sys

year = int(sys.argv[1])
month = int(sys.argv[2])

tz = timezone(timedelta(hours=8))


def parse_cookie_string(cookie_string):
    cookies = cookie_string.split(';')
    cookie_dict = {cookie.split('=')[0].strip(): cookie.split('=')[1].strip() for cookie in cookies if cookie}
    return cookie_dict


def fetch_data(api_url, cookies):
    params = {
        'scope': 'all',
        'count': '20',
        'end_time': ''
    }
    all_topics = []

    while True:
        encoded_params = urllib.parse.urlencode(params)
        response = requests.get(f"{api_url}?{encoded_params}", cookies=cookies)

        if response.status_code != 200:
            print(f"Failed to fetch data: {response.status_code}")
            break

        data = response.json()
        if not data['succeeded']:
            print("API returned a failure response")
            break

        topics = data['resp_data']['topics']
        if not topics:
            print("No more topics to fetch")
            break

        all_topics.extend(topics)

        # Use the create_time of the second topic as the next page's end_time if available
        if len(topics) > 1:
            last_end_time = topics[-1]['create_time']
            params['end_time'] = last_end_time
        else:
            print("Less than two topics fetched, cannot paginate further")
            break

    return all_topics


def format_date(datetime):
    return datetime.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + datetime.strftime('%z')


def call_api_with_month(year, month, base_url, cookies, end_time):
    begin_time = datetime(year, month, 1, 0, 0, 0, 0, tzinfo=tz)
    last_day = calendar.monthrange(year, month)[1]

    if end_time is None:
        end_time = format_date(datetime(year, month, last_day, 23, 59, 59, 999999, tzinfo=tz))

    params = {
        'scope': 'all',
        'count': '20',
        'begin_time': format_date(begin_time),
        'end_time': end_time
    }
    encoded_params = urllib.parse.urlencode(params)
    response = requests.get(f"{base_url}?{encoded_params}", cookies=cookies)

    if response.status_code != 200:
        print(f"Failed to fetch data: {response.status_code}")
        exit()

    data = response.json()
    if not data['succeeded']:
        print("API returned a failure response")
        exit()

    topics = data['resp_data']['topics']

    time.sleep(1)
    if len(topics) == 20:
        last_end_time = topics[-1]['create_time']
        print("持续抓取：", last_end_time)
        topics.extend(call_api_with_month(year, month, base_url, cookies, last_end_time))

    return topics

# Setup your initial parameters
api_url = 'https://api.zsxq.com/v2/groups/15522848288852/topics'
cookies = 'zsxqsessionid=4eaaa057f72b3ce0d9120b5807274493; zsxq_access_token=9CE4BE8C-4DA4-DF22-9E2D-A98BAE6274FB_81509685AC5B6EAE; abtest_env=product; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22225825542851%22%2C%22first_id%22%3A%2218ec6f1a8011b92-04855f7268edab4-1c525637-1484784-18ec6f1a8023000%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fzsxq.com%2F%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThlYzZmMWE4MDExYjkyLTA0ODU1ZjcyNjhlZGFiNC0xYzUyNTYzNy0xNDg0Nzg0LTE4ZWM2ZjFhODAyMzAwMCIsIiRpZGVudGl0eV9sb2dpbl9pZCI6IjIyNTgyNTU0Mjg1MSJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22225825542851%22%7D%2C%22%24device_id%22%3A%2218ec6f1a8011b92-04855f7268edab4-1c525637-1484784-18ec6f1a8023000%22%7D'

# Fetch data
# topics = fetch_data(api_url, parse_cookie_string(cookies))


topics = call_api_with_month(year, month, api_url, parse_cookie_string(cookies),None)

print('## ', year, '-', month)
for topic in topics:
    if 'talk' not in topic:
        continue
    print('### ', topic['topic_id'], topic['create_time'])
    if 'text' in topic['talk']:
        print(topic['talk']['text'])
    elif 'images' in topic['talk']:
        for img in topic['talk']['images']:
            if 'original' in img:
                print(f"![]({img['original']['url']})")
            else:
                print(f"![]({img['large']['url']})")
