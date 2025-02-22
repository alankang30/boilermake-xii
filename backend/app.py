from flask import Flask, render_template, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
