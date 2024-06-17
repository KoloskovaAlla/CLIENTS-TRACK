from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="fedya15022011",
    host="localhost",
    port="5432",
    client_encoding='UTF8'
)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    cursor = conn.cursor()
    cursor.execute("SELECT id, username, full_name FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        user_dict = {
            'id': user[0],
            'username': user[1],
            'full_name': user[2]
        }
        return jsonify({'status': 'success', 'message': 'Login successful', 'user': user_dict}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

@app.route('/clients', methods=['GET'])
def get_clients():
    responsible = request.args.get('responsible')
    cursor = conn.cursor()
    cursor.execute("SET client_encoding TO 'UTF8'")
    cursor.execute("SELECT account_number, last_name, first_name, patronymic, birth_date, inn, responsible_person, status FROM clients WHERE responsible_person = %s", (responsible,))
    clients = cursor.fetchall()
    cursor.close()

    client_list = []
    for client in clients:
        client_list.append({
            'account_number': client[0],
            'last_name': client[1],
            'first_name': client[2],
            'patronymic': client[3],
            'birth_date': client[4],
            'inn': client[5],
            'responsible_person': client[6],
            'status': client[7]
        })

    return jsonify(client_list), 200

@app.route('/clients/<int:account_number>', methods=['PUT'])
def update_client_status(account_number):
    status = request.json.get('status')
    cursor = conn.cursor()
    cursor.execute("SET client_encoding TO 'UTF8'")
    cursor.execute(
        "UPDATE clients SET status = %s WHERE account_number = %s RETURNING account_number, last_name, first_name, patronymic, birth_date, inn, responsible_person, status",
        (status, account_number)
    )
    updated_client = cursor.fetchone()
    conn.commit()
    cursor.close()

    if updated_client:
        client_dict = {
            'account_number': updated_client[0],
            'last_name': updated_client[1],
            'first_name': updated_client[2],
            'patronymic': updated_client[3],
            'birth_date': updated_client[4],
            'inn': updated_client[5],
            'responsible_person': updated_client[6],
            'status': updated_client[7]
        }
        return jsonify({"message": "Status updated successfully", "client": client_dict}), 200
    else:
        return jsonify({"message": "Client not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)