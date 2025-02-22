import sqlite3

def init_db():
    conn = sqlite3.connect("instance/database.db")
    with open("schema.sql") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
    print("Database initialized!")

if __name__ == "__main__":
    init_db()
