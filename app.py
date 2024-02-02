# Python code
import requests
import json
from flask import Flask, Response

app = Flask(__name__)

@app.route('/')
def get_cookies():
  # Initialize a counter for the loop
  count = 0
  # Initialize a flag for the success
  success = False
  # Loop until success or 10 times
  while not success and count < 10:
    # Fetch the cookies from the given URL
    response = requests.get('https://bing.cf03-b29.workers.dev/turing/captcha/challenge')
    # Check if the response is successful
    if response.ok:
      # Set the success flag to True
      success = True
      # Get the cookies from the response header
      # cookies = response.headers.get('Set-Cookie')
      # Join the cookies with semicolons
      # cookies = cookies.replace(', ', '; ')
      # Remove all occurrences of "Path=/"
      # cookies = cookies.replace('Path=/; ', '')
      # Create a JSON object with the cookies as a property
      # cookies = ';'.join([cookie.split(';')[0] for cookie in cookies.split(';')])
      # cookies = ';'.join([re.sub(r';.*', '', cookie) for cookie in cookies.split(';')])
      
      # 从响应头中提取 set-cookies 列表
      set_cookies = response.headers.get('Set-Cookie')
      # 定义一个空字符串，用来存储处理后的 cookie
      cookie_str = ""
      # 遍历 set_cookies 列表中的每个元素
      for item in set_cookies:
      # 用分号 ; 把每个元素分割成一个列表，取第一个元素，即键值对
          key_value = item.split(";")[0]
      # 用分号 ; 把键值对添加到 cookie_str 中
          cookie_str += key_value + ";"
      # 去掉 cookie_str 最后多余的一个分号
          cookie_str = cookie_str[:-1]
      # 赋值给变量 cookies
      cookies = cookie_str
      
      result = {'result': {'cookies': cookies}}
      # Return the JSON object as the body of the response
      return Response(json.dumps(result), mimetype='application/json')
    else:
      # Increment the counter
      count += 1
  # If the loop ends without success, return an error message
  return Response('Failed to get cookies', status=500)

# 运行Flask应用，监听7860端口
if __name__ == '__main__':
    app.run(port=10000, debug=True)
