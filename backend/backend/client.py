from re import A
import requests

url = "http://localhost:8000/"
right_data = {"username": "bgraham", "password": "1l;2rwfnla"}
wrong_data = {"username": "bgraham", "password": "1l;2rwfnla1"}

session = requests.Session()

print("session 1(right password)")
x = session.post(url + "login/", data=right_data)
print(x.text)
print(session.get(url + "transactions/").text)
