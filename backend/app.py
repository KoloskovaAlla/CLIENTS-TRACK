from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Функция для подключения к базе данных PostgreSQL
def connect_to_db():
    try:
        conn = psycopg2.connect(
            dbname='postgres',
            user='postgres',
            password='fedya15022011',
            host='localhost',
            port='5432'
        )
        return conn
    except Error as e:
        print("Error connecting to PostgreSQL:", e)
        return None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = connect_to_db()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
            if user:
                response = {
                    'message': 'Login successful',
                    'status': 'success',
                    'user': {
                        'id': user[0],
                        'full_name': user[1],
                        'username': user[2]
                    }
                }
            else:
                response = {
                    'message': 'Invalid username or password',
                    'status': 'failure'
                }
        except Error as e:
            print("Error fetching user:", e)
            response = {
                'message': 'Error connecting to database',
                'status': 'error'
            }
    else:
        response = {
            'message': 'Database connection error',
            'status': 'error'
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)