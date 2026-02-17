from flask import Flask, jsonify, Response, redirect
import requests

app = Flask(__name__)

@app.route('/')
def proxy_request():
    # Use an endpoint on httpbin.org that issues a 302 redirect
    upstream_url = 'https://httpbin.org/redirect/1'

    try:
        # Allow redirects, but handle them manually for demonstration purposes
        response = requests.get(upstream_url, timeout=5, allow_redirects=False)

        # Check if the response status is 302
        if response.status_code == 302:
            redirect_url = response.headers.get("Location")
            app.logger.info(f"Redirecting to {redirect_url}")
            
            # Return a 302 Found response, redirecting the client to the new URL
            return redirect(redirect_url, code=302)

        # If successful (but not a 302), return the response JSON (if any)
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        # Log the error (optional)
        app.logger.error(f"Upstream service error: {e}")

        # Return a 502 Bad Gateway error to the client in case of other issues
        return Response("Bad Gateway: Could not connect to upstream service.", status=502)

if __name__ == '__main__':
    app.run(debug=True)
