import sqlite3
from fastapi import FastAPI

app = FastAPI()
# Устанавливаем соединение с базой данных

connection = sqlite3.connect('tasks.db')
cursor = connection.cursor()

# Создаем таблицу Users
cursor.execute('''
CREATE TABLE IF NOT EXISTS Tasks (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
task TEXT NOT NULL)
''')

cursor.execute('INSERT INTO Tasks (name, task) VALUES (?, ?)', ('UN-0000', 'Сделать то-то'))
cursor.execute('INSERT INTO Tasks (name, task) VALUES (?, ?)', ('UN-0001', 'Сделать се-то'))
cursor.execute('INSERT INTO Tasks (name, task) VALUES (?, ?)', ('UN-0002', 'Сделать все'))

connection.commit()

# Выбираем всех пользователей
cursor.execute('SELECT * FROM Tasks')
tasks = cursor.fetchall()

print(tasks)
# # Выводим результаты
# for user in users:
#   print(user)

# Закрываем соединение
connection.close()
# Сохраняем изменения и закрываем соединение

# connection.close()