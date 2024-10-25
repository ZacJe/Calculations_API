import pytest
import sqlite3

# Réinitialisation de la base de données
@pytest.fixture(autouse=True)
def reset_db():
    conn = sqlite3.connect('calculations.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS calculations (
            id INTEGER PRIMARY KEY,
            expression TEXT,
            result REAL
        )
    ''')
    conn.commit()
    cursor.execute("DELETE FROM calculations")
    conn.commit()
    conn.close()
