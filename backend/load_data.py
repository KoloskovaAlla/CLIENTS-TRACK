print("Starting load_data.py...")

import psycopg2
import json

try:
    conn = psycopg2.connect(
        dbname='postgres',
        user='postgres',
        password='fedya15022011',
        host='localhost',
        port='5432'
    )
    cursor = conn.cursor()

    with open('database.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

    for client in data['clients']:
        cursor.execute(
            """
            INSERT INTO clients (account_number, last_name, first_name, patronymic, birth_date, inn, responsible_person, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (client['account_number'], client['last_name'], client['first_name'], client['middle_name'], client['birth_date'], client['inn'], client['responsible_person'], client['status'])
        )

    for user in data['users']:
        cursor.execute(
            """
            INSERT INTO users (full_name, username, password)
            VALUES (%s, %s, %s)
            """,
            (user['full_name'], user['username'], user['password'])
        )

    conn.commit()
    cursor.close()
    conn.close()

    print("Data loaded successfully")

except psycopg2.Error as e:
    print("Error connecting to PostgreSQL:", e)

print("Finished load_data.py.")