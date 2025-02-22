from db import * 
from flask import Flask, Blueprint, request, render_template, jsonify

app = Flask(__name__)

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

    print("hi")
    print(question_statement)
    print(class_name)

    image = "filename"

    # TODO: handle image in database 
    # if "image" in request.files:
    #     image_file = request.files["image"]
    #     if image_file.filename:
    #         image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    #         image_file.save(image_path)
    #         image = image_file.filename


    add_question(question_statement, answer, class_name, topic, difficulty, image)

    return jsonify({"message": "Question added!"}), 201

@app.route('/api/questions', methods=["GET"])
def fetch_questions():
    ''' Fetches all questions from database '''
    questions = get_questions()
    return jsonify(questions), 200

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
