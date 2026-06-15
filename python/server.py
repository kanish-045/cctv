from flask import Flask, request

app = Flask(__name__)

@app.route('/register-camera', methods=['POST'])
def register_camera():
    print(request.json)

    return {
        "status": "success",
        "message": "Camera monitoring started"
    }

@app.route('/health')
def health():
    return {
        "status": "online"
    }

app.run(port=5000)