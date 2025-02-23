import sqlite3

DATABASE = "instance/database.db"


# allows our backend to connect to the database so information can be accessed 

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Enables column access by name
    return conn

# adds a question with specifications to the table
def add_question(question_statement, answer, class_name, topic, difficulty,  image):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO questions (question_statement, answer, class_name, topic, difficulty, image) VALUES (?, ?, ?, ?, ?, ?)",
        (question_statement, answer, class_name, topic, difficulty, image),
    )
    conn.commit()
    print("successfully added")
    conn.close()


def get_questions():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM questions")
    questions = cur.fetchall()
    conn.close()
    return [dict(q) for q in questions]

def get_question_by_id(question_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM questions WHERE id = ?", (question_id,))
    question = cur.fetchone()
    conn.close()
    return dict(question) if question else None


def get_questions_by_id(question_ids):
    '''Input is a list of ids and will return a list of questions'''
    conn = get_db()
    print("getting questions by id")
    cur = conn.cursor()
    rows = [] 
    for id in question_ids:
        print(id)
        cur.execute("SELECT * FROM questions WHERE id = ?", (id,))
        question = cur.fetchone()
        rows.append(question)
    print(rows)
    conn.close()

    ret = []

    for q in rows:
        if q:
            ret.append(dict(q))
    return ret

def get_questions_by_class(class_name):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM questions WHERE class_name = ?", (class_name,))
    questions = cur.fetchall()
    conn.close()
    return [dict(q) for q in questions]

def delete_question(question_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM questions WHERE id = ?", (question_id,))
    conn.commit()
    conn.close()

def delete_all_questions():
    conn = get_db()
    cur = conn.cursor()
    # this will delete all entries from questions table 
    cur.execute("DELETE FROM questions")
    conn.commit()
    conn.close() 
