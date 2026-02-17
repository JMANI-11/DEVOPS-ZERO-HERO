from flask import Flask, jsonify, Response
import requests

app = Flask(__name__)

@app.route('/')
def proxy_request():
    # Upstream URL with a delay of 10 seconds
    upstream_url = 'https://httpbin.org/delay/10'

    try:
        # Attempt to connect with a 1-second timeout, forcing a timeout error
        response = requests.get(upstream_url, timeout=1)
        response.raise_for_status()  # Raise an error for HTTP status codes 4xx/5xx

        # If successful (unlikely in this setup), return the response
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        # Log the error (optional)
        app.logger.error(f"Upstream service error: {e}")

        # Return a 502 Bad Gateway error to the client
        return Response("Bad Gateway: Could not connect to upstream service.", status=502)

if __name__ == '__main__':
    app.run(debug=True)
