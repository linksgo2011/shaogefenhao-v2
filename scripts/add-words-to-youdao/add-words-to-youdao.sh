# 使用说明，这个简单的脚本可以将词汇清单导入有道单词本。1. 准备好单词本 txt 文件 2. 替换 Cookie 部分
#!/bin/sh

addToYoudao () {
echo "Add $1 ";
curl "https://dict.youdao.com/wordbook/webapi/v2/ajax/add?word=$1&lan=en" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Cookie: OUTFOX_SEARCH_USER_ID=1399683212@218.104.223.170; OUTFOX_SEARCH_USER_ID=142874639@218.104.223.170; JSESSIONID=abc4KccVYCKVN8_vHpu2x; webDict_HdAD=%7B%22req%22%3A%22http%3A//dict.youdao.com%22%2C%22width%22%3A960%2C%22height%22%3A240%2C%22showtime%22%3A5000%2C%22fadetime%22%3A500%2C%22notShowInterval%22%3A3%2C%22notShowInDays%22%3Afalse%2C%22lastShowDate%22%3A%22Mon%20Nov%2008%202010%22%7D; _ntes_nnid=ba2af3777eaebb71ea7c247a43c16ce5,1638869601382; OUTFOX_SEARCH_USER_ID_NCOO=378320094.125862; DICT_UGC=be3af0da19b5c5e6aa4e17bd8d90b28a|; DICT_SESS=v2|URSM|DICT||120377843@qq.com||urstoken||4h1AtXSS9x6qiUg.tGTrcpIUwOslb._GX3I6px7Is8uBCAVliCMVZRBUkL0JrJDSxygmsyLVidMFT3iymaT6s_w.LrkVO5cYtCdgbS9PULdh6HDOKyvQyL14BJ1XNVSTcEk5h86JshN3O3dOEi23TYS.ABCaDaDor0NiOxLexX6Nu10FWj5NHj_AoJTbBnjcAhclpGyEQyJbG||604800000||zGkfJuRM6FRPy6Mk5hLTLROMOMqunHlWRzWP4TFO4JLRpuhHgFOMzl0k5O4TLnfOf0pL0HpShfzW0wZ6Lz5RHpyR; DICT_PERS=v2|urstoken||DICT||web||-1||1666158578939||218.104.223.170||120377843@qq.com||UWhflEOfqB0llhHQyhfPK0UAhMO50LlW0O5hHO5O4lMRwzOfgZhfUfRTz0fp4nMTS0OAhLTZhMqB0qK0MgL64Qy0; _ga=GA1.2.1842939371.1666760985; __yadk_uid=0Gb6xG1ZqYiIUCfWv3fIPqwmzGbnvYpp; rollNum=true; advertiseCookie=advertiseValue; DICT_LOGIN=3||1668064454792; ___rl__test__cookies=1668064474188' \
  -H 'Referer: https://dict.youdao.com/result?word=mugs&lang=en' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --compressed
}

for fn in $(cat silicon-valley-words.txt); do
  addToYoudao "$fn";
done


