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
      cookies = response.headers.get('Set-Cookie')
      # Join the cookies with semicolons
      cookies = cookies.replace(', ', '; ')
      # Remove all occurrences of "Path=/"
      cookies = cookies.replace('Path=/; ', '')
      # Create a JSON object with the cookies as a property
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
