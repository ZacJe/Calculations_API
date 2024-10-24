import sqlite3

def get_db_connection():
    conn = sqlite3.connect('calculations.db')
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS calculations (
            id INTEGER PRIMARY KEY,
            expression TEXT,
            result REAL
        )
    ''')
    conn.commit()
    conn.close()