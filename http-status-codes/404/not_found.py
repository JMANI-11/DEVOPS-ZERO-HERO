from flask import Flask, jsonify, Response
import requests

app = Flask(__name__)

@app.route('/')
def proxy_request():
    # Use a non-existent path on httpbin.org to trigger a 404
    upstream_url = 'https://httpbin.org/status/404'

    try:
        # Attempt to connect with a reasonable timeout
        response = requests.get(upstream_url, timeout=5)
        response.raise_for_status()  # Raise an error for HTTP status codes 4xx/5xx

        # If successful (unlikely in this setup), return the response
        return jsonify(response.json())

    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            # Log the error (optional)
            app.logger.error(f"Upstream service returned 404: {e}")

            # Return a 404 Not Found error to the client
            return Response("Not Found: The requested resource does not exist on the upstream service.", status=404)
        else:
            # For other errors, return a 502 Bad Gateway
            app.logger.error(f"Upstream service error: {e}")
            return Response("Bad Gateway: Could not connect to upstream service.", status=502)

if __name__ == '__main__':
    app.run(debug=True)
