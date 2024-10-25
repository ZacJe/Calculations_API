from fastapi import APIRouter
from app.services.calculator import rpn_calculator
from app.models import Operation
from app.db import get_db_connection
import csv
import io
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post("/calculate/")
def calculate(operation: Operation):
    """
    Effectue un calcul en notation polonaise inverse (NPI).
    """
    # Calcul de l'opération
    result = rpn_calculator(operation.expression)
    # Connexion à la base de données
    conn = get_db_connection()
    cursor = conn.cursor()
    # Insertion dans la base de données
    cursor.execute('''
        INSERT INTO calculations (expression, result)
        VALUES (?, ?)
    ''', (','.join(operation.expression), result))
    conn.commit()
    conn.close()
    return {"expression": operation.expression, "result": result}

@router.get("/calculations/")
def get_calculations_csv():
    """
    Retourne les calculs sous forme de fichier CSV.
    """
    # Connexion à la base de données
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM calculations')
    data = cursor.fetchall()
    conn.close()

    # Préparation du fichier CSV
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['ID', 'Expression', 'Result'])
    writer.writerows(data)
    
    response = StreamingResponse(
        io.StringIO(output.getvalue()), 
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = "attachment; filename=calculations.csv"
    return response
