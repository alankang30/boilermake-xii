import eventlet
eventlet.monkey_patch()

from db import * 
from flask import Flask, Blueprint, request, render_template, jsonify, send_from_directory
from flask_cors import CORS  # Import CORS
import os
import threading 
import pty
import select
import subprocess
from flask_socketio import SocketIO, emit

from semantic_search import *

write_lock = threading.Lock()

from flask_cors import CORS

import os

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for WebSockets

CORS(app)

UPLOAD_FOLDER = "static/uploads"
question_routes = Blueprint("question_routes", __name__)  # Creating a Blueprint

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

@app.route("/api/questions", methods=["POST"])
def create_question():

    # getting data from 
    question_statement = request.form.get("question_statement")
    class_name = request.form.get("class_name")
    answer = request.form.get("answer")
    topic = request.form.get("topic")
    difficulty = request.form.get("difficulty", "Medium")

    image = "filename"

    if "image" in request.files:
        image_file = request.files["image"]
        if image_file.filename:
            image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
            image_file.save(image_path)
            image = image_file.filename


    add_question(question_statement, answer, class_name, topic, difficulty, image)

    return jsonify({"message": "Question added!"}), 201

@app.route('/api/questions', methods=["GET"])
def fetch_questions():
    ''' Fetches all questions from database '''
    questions = get_questions()
    #print(questions)
    return jsonify(questions), 200

@app.route('/search', methods=["GET", "POST"])
def search():
    data = request.get_json()  # Get JSON data from request
    print(data)
    query = data.get("searchQuery")
    filtered_data = data.get("filtered")

    # this will always be the same throughout every search call
    class_name = filtered_data[0]["class_name"]

    ids = semantic_search(query, filtered_data)
    print(ids)

    # dummy response (replace with actual)
    results = get_questions_by_id(ids); 

    if not results:
        results = get_questions_by_class(class_name)

    print(results)
    return jsonify(results)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    """Serve images from the uploads directory"""
    return send_from_directory("static/uploads", filename)
#debugging terminal
@app.after_request
def add_cors_headers(response):
    """ Debugging: Log headers to ensure CORS is applied """
    print("CORS Headers:", response.headers)
    return response

# Store terminal process
processes = {}

@socketio.on("connect")
def handle_connect():
    print("Client connected")

@socketio.on("start_terminal")
def start_terminal():
    """Start a new terminal session."""
    pid, fd = pty.openpty()
    process = subprocess.Popen(
            ["/bin/bash"],  # Change to "powershell" for Windows
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,  # Ensures Python handles text properly
            bufsize=1,  # Ensures real-time output
            universal_newlines=True,
            )
    processes[fd] = process
    emit("terminal_output", "\nConnected to Flask Terminal!\n")

    def read_output():
        while True:
            readable, _, _ = select.select([fd], [], [], 0.1)
            if readable:
                try:
                    output = os.read(fd, 1024).decode()
                    socketio.emit("terminal_output", output)
                except OSError:
                    break
        process.wait()
        del processes[fd]
    with app.app_context():
        eventlet.spawn(read_output)

@socketio.on("terminal_input")
def handle_terminal_input(data):
    print(f"Received input: {data}")  # Debugging line
    """Send user input to the terminal."""
    fd = next(iter(processes.keys()), None)
    if fd:
        with write_lock:  # Ensure only one thread writes at a time
            if not data.endswith("\n"):  # Ensure newline is included
                data += "\n"
                os.write(fd, data.encode())


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")
    for fd, process in processes.items():
        process.terminate()
        del processes[fd]
if __name__ == '__main__':
    #app.run(debug=True)
    socketio.run(app, host="127.0.0.1", port=5000, debug=True)



