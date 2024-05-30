import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def index():
    return 'Task API connected'

@app.route('/favicon.ico')
def favicon():
    return '', 204  # Возвращаем пустой ответ с кодом 204 (No Content)


@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    if request.method == 'GET':
        # Получение списка задач
        c.execute('SELECT * FROM Tasks')
        tasks = c.fetchall()
        conn.close()
        task_list = []
        for task in tasks:
            task_dict = {
                'id': task[0],
                'name': task[1],
                'task': task[2]
            }
            task_list.append(task_dict)
        return jsonify(task_list)

    elif request.method == 'POST':
        # Создание нового пользователя
        data = request.get_json()
        print(data)
        print()
        name = data['name']
        task = data['task']

        c.execute("INSERT INTO Tasks (name, task) VALUES (?, ?)", (name, task))
        conn.commit()
        new_task_id = c.lastrowid

        conn.close()

        return jsonify({'id': new_task_id, 'name': name, 'task': task}), 201


if __name__ == '__main__':
    app.run()