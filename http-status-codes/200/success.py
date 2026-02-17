from flask import Flask, jsonify, Response
import requests

app = Flask(__name__)

@app.route('/')
def proxy_request():
    # Use an endpoint that should return 200 OK with no delay
    upstream_url = 'https://httpbin.org/get'

    try:
        # Attempt to connect with a reasonable timeout
        response = requests.get(upstream_url, timeout=5)
        response.raise_for_status()  # Raise an error for HTTP status codes 4xx/5xx

        # If successful, return the upstream response data as JSON with a 200 OK status
        return jsonify(response.json()), 200

    except requests.exceptions.RequestException as e:
        # Log the error (optional)
        app.logger.error(f"Upstream service error: {e}")

        # Return a 502 Bad Gateway error to the client if an exception occurs
        return Response("Bad Gateway: Could not connect to upstream service.", status=502)

if __name__ == '__main__':
    app.run(debug=True)
