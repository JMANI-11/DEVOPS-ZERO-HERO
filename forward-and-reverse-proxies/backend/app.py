from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello from Backend Server!',
        'server': 'Backend Server',
        'ip': 'This is the actual server handling the request'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
