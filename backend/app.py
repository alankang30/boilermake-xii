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

from llamaapi import LlamaAPI
import json

from flask_socketio import SocketIO, emit

from semantic_search import *

write_lock = threading.Lock()

from flask_cors import CORS

import os

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for WebSockets

CORS(app)
chat_data = [
    {'id': 1, 'question_statement': '', 'answer': '', 'class_name': 'CS250', 'topic': 'Unknown'},
    {'id': 2, 'question_statement': 'What does malloc do? What does it take in? What does it return?', 'answer': 'Malloc is a function that takes in an integer argument, reserving that number of bytes on the heap for future use. The function returns a pointer to the location on the heap that was reserved.', 'class_name': 'CS250', 'topic': 'Dynamic Memory Allocation'},
    {'id': 3, 'question_statement': 'What are the two methods you can use to figure out how much memory to allocate (if you don’t know the exact number)?', 'answer': 'sizeof or strlen() if you are allocating space for a string', 'class_name': 'CS250', 'topic': 'Memory Allocation'},
    {'id': 4, 'question_statement': 'Can malloc() return NULL? If so, when does it do so?', 'answer': 'Yes, malloc() can return NULL. It is done so in the event of the function being unable to properly allocate the sufficient memory space, typically due to insufficient space on the heap', 'class_name': 'CS250', 'topic': 'Dynamic Memory Allocation'},
    {'id': 5, 'question_statement': 'What does free do? What does it take in? What does it return?', 'answer': 'The free function un-reserves the chunk of memory on the heap that was previously reserved. It takes in a pointer to a location on the heap that is going to get freed. The function does not have a return type', 'class_name': 'CS250', 'topic': 'Memory Deallocation'},
    {'id': 6, 'question_statement': 'Why should you set a pointer to NULL after freeing it?', 'answer': 'Because after freeing it, the pointer still points the chunk of memory on the heap it was assigned, but now it is no longer reserved, so a later malloc() call can use that chunk. By setting the pointer to NULL, we avoid reusing it.', 'class_name': 'CS250', 'topic': 'Pointer Safety'},
    {'id': 7, 'question_statement': 'What is the difference between calloc and malloc?', 'answer': 'calloc(int n, int s) and malloc(int s)\nCalloc takes in an extra parameter, so instead of allocating one chunk of size s on the heap like malloc, calloc will allocate n chunks of size s on the heap. Additionally, calloc will set all the bytes to 0', 'class_name': 'CS250', 'topic': 'Memory Allocation'},
    {'id': 8, 'question_statement': 'What marks the end of a singly linked list?', 'answer': 'The next pointer for the node is NULL', 'class_name': 'CS250', 'topic': 'Linked Lists'},
    {'id': 9, 'question_statement': 'What is the difference between a forward growing and backward growing linked list?', 'answer': 'For both structures, we keep track of the beginning of the list, the head.\nFor a forward growing list, we keep track of an additional node, the tail. We assign the newly added node to tail -> next_ptr, then assign tail = tail -> next_ptr.\nFor a backward growing list, we store the node to be added in a variable called temp. Assign temp -> next_ptr = head. Then assign head = temp.\nIf the list we are adding to is empty, we assign the node to be added to head. Then for a forward growing list, we set tail = head.', 'class_name': 'CS250', 'topic': 'Linked Lists'},
    {'id': 10, 'question_statement': 'How do you traverse a singly linked list?', 'answer': 'We create a temporary variable, assign head to it, then go temp -> next, until we reach the end', 'class_name': 'CS250', 'topic': 'Linked Lists'},
    {'id': 11, 'question_statement': 'What signifies the head and tail nodes in a doubly linked list?', 'answer': 'The head node’s prev_ptr = NULL, and the tail’s next_ptr = NULL', 'class_name': 'CS250', 'topic': 'Doubly Linked Lists'},
    {'id': 12, 'question_statement': 'What is the issue with the code segment below?\nint main(int argc, char **argv) {\nint i = 0;\nint *pi = NULL;\nint **ppi = NULL;\npi = &i;\nppi = &pi;\ni = 5;\nprintf(“i is %d\\n”, **ppi);\npi = NULL;\nprintf(“i is %d\\n”, **ppi);\nreturn *pi;\n}', 'answer': 'For the second print statement, we are trying to de-reference NULL, which will cause a segmentation fault.', 'class_name': 'CS250', 'topic': 'Pointer Dereferencing'},
    {'id': 13, 'question_statement': 'What is the difference between 0, 0.0, 0x0, ‘\\0’, NUL, and NULL?', 'answer': '0, 0x0, and 0.0 all represent the value of the number 0. Only difference is 0 is an int, 0x0 is also an int but is in hex, and 0.0 is a floating point value.\n‘\\0’ is a character, whose character code is NUL.\nNULL is a void pointer, ((void *)0).', 'class_name': 'CS250', 'topic': 'Data Representation'},
    {'id': 14, 'question_statement': 'What does this print?\nx = 0;\nif (x == 0) printf(“x1 = %d\\n”, x);\nif ((x = 0)) printf(“x2 = %d\\n”, x);\nif (x) printf(“x3 = %d\\n”, x);', 'answer': 'x1 = 0\nx2 = 10\nx3 = 10\nx && y', 'class_name': 'CS250', 'topic': 'Conditional Statements'},
    {'id': 15, 'question_statement': 'When does an if statement evaluate to True?', 'answer': 'If the expression has a non-zero value.', 'class_name': 'CS250', 'topic': 'Conditional Statements'},
    {'id': 16, 'question_statement': 'What is outputted for mystery(10)?\nvoid mystery(int n) {\nif (n >= 0) {\nprintf(“%d”, n);\nmystery(n-1);\n}\nreturn;\n}', 'answer': '109876543210', 'class_name': 'CS250', 'topic': 'Recursion'},
    {'id': 17, 'question_statement': 'Implement a recursive factorial function.', 'answer': 'int factorial(int n) {\nif (n == 0) {\nreturn 1;\n}\nreturn n * factorial(n - 1);\n}', 'class_name': 'CS250', 'topic': 'Recursion'},
    {'id': 18, 'question_statement': 'Is a recursive function more efficient than an iterative function?', 'answer': 'No, often times the recursive function is less efficient than its iterative counterpart', 'class_name': 'CS250', 'topic': 'Recursion vs Iteration'},
    {'id': 19, 'question_statement': 'What’s wrong with the below?\nchar *create_string() {\nchar str[100];\nstrcpy(str, “Hello, world\\n”);\nreturn str;\n}', 'answer': 'Returning a pointer to a stack-allocated temporary variable.', 'class_name': 'CS250', 'topic': 'Memory Management'},
    {'id': 20, 'question_statement': 'When a function calls itself, do the values of the local variables stay the same at the time of the call or do they reset to what they were initialized to?', 'answer': 'The values will reset since C is pass-by-value. Once the recursive call terminates, all the values for that specific call will go away.', 'class_name': 'CS250', 'topic': 'Recursion'}
]
UPLOAD_FOLDER = "static/uploads"
question_routes = Blueprint("question_routes", __name__)  # Creating a Blueprint

@app.route('/api/hello', methods=['GET'])
def hello():
    #for question in chat_data:
    #    add_question(question['question_statement'], question['answer'], question['class_name'], question['topic'], 'Medium', None)
    return jsonify({"message": "Hello from Flask!"})

# init llama
api_token = "LA-4aa03eddb4eb43eb8b0393f5b3e43c69ebff7cca154a406481c6288eee9b3cfd"
llama = LlamaAPI(api_token)

@app.route("/api/questions", methods=["POST"])
def create_question():
    print("received new request for question")

    # getting data from 
    question_statement = request.form.get("questionstatement")
    class_name = request.form.get("classname")
    answer = request.form.get("answer")
    difficulty = request.form.get("difficulty", "Medium")

    topic = request.form.get("topic", "").strip()
    if not topic:
        print("llama generate topic")
        topic = generate_topic(question_statement, class_name, answer)

    image = "filename"

    if "image" in request.files:
        image_file = request.files["image"]
        if image_file.filename:
            image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
            image_file.save(image_path)
            image = image_file.filename


    
    #print("adding question:", question_statement, answer, class_name, topic, difficulty, image)

    add_question(question_statement, answer, class_name, topic, difficulty, image)

    return jsonify({"message": "Question added!"}), 201

def generate_topic(question_statement, class_name, answer):
    """Uses the Llama API to generate a topic based on question details."""
    prompt = f"Categorize the following question into a single-word topic within CS:\n\nQuestion: {question_statement}\nAnswer: {answer}\nClass: {class_name}\n\nTopic:"

    api_request_json = {
  "model": "llama3.1-8b",
  "messages": [
    {"role": "system", "content": "Categorize the following question into a single-word topic within CS:\n"},
    {"role": "user", "content": f'\nQuestion: {question_statement}\nAnswer: {answer}\nClass: {class_name}\n\nTopic:'},
  ]
}
    response = llama.run(api_request_json)  # Run the API request

    #print(json.dumps(response.json()["choices"][0]["message"]["content"], indent=2))
    return response.json()["choices"][0]["message"]["content"]

@app.route('/api/questions', methods=["GET"])
def fetch_questions():
    ''' Fetches all questions from database '''
    questions = get_questions()
    #print(questions)
    return jsonify(questions), 200

@app.route('/search', methods=["GET", "POST"])
def search():
    data = request.get_json()  # Get JSON data from request

    query = data.get("searchQuery")
    filtered_data = data.get("filtered")

    if not query:
        return filtered_data

    tokens = tokenize_sentence(query) 


    # this will always be the same throughout every search call
    class_name = filtered_data[0]["class_name"]

    ids = semantic_search(query, filtered_data)

    # dummy response (replace with actual)
    results = get_questions_by_id(filtered_data[id_num]["id"] for id_num in ids); 

    if not results:
        results = get_questions_by_class(class_name)

    if (len(tokens) < 1):
        return jsonify(results)

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
            readable, _, _  = select.select([fd], [], [], 0.1)
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



