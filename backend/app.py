from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import Error

app = Flask(__name__)

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

# Эндпоинт для авторизации
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

# Эндпоинт для получения данных клиентов
@app.route('/clients', methods=['GET'])
def get_clients():
    conn = connect_to_db()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM clients")
            clients = cursor.fetchall()
            cursor.close()
            conn.close()
            return jsonify(clients)
        except Error as e:
            print("Error fetching clients:", e)
            return jsonify({'error': 'Failed to fetch clients'})
    else:
        return jsonify({'error': 'Database connection error'})

# Эндпоинт для обновления статуса клиента
@app.route('/clients/<int:client_id>/status', methods=['PUT'])
def update_client_status(client_id):
    data = request.get_json()
    new_status = data.get('status')

    conn = connect_to_db()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("UPDATE clients SET status = %s WHERE account_number = %s", (new_status, client_id))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'message': 'Client status updated successfully'})
        except Error as e:
            print("Error updating client status:", e)
            return jsonify({'error': 'Failed to update client status'})
    else:
        return jsonify({'error': 'Database connection error'})

if __name__ == '__main__':
    app.run(debug=True)