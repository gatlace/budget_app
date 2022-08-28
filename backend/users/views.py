from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Account
from django.contrib.auth.models import User


# Create your views here.
@api_view(["POST"])
def create_account(request):
    username = request.data.get("username")
    password = request.data.get("password")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")

    if username is None or password is None or first_name is None or last_name is None:
        return Response(
            {"error": "Please provide both username and password"}, status=400
        )

    if User.objects.filter(username=username).exists():
        return Response({"error": "The username already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    Account.objects.create(user=user, first_name=first_name, last_name=last_name, budget=0)
    token = Token.objects.create(user=user)

    return Response({"token": token.key}, status=200)


@api_view(["POST"])
def login(request):
    if not request.data["username"] or not request.data["password"]:
        return Response(
            {"message": "Please provide a username and password to login"},
            status=400,
        )

    user = User.objects.filter(username=request.data["username"])
    if len(user) == 0:
        return Response({"message": "Username does not exist"}, status=404)

    if not user[0].check_password(request.data["password"]):
        return Response({"message": "Incorrect password"}, status=401)

    token = Token.objects.get(user=user[0])
    return Response({"token": token.key}, status=200)


@api_view(["GET"])
def get_account(request):
    account = Account.objects.get(user=request.user)
    return Response(serialize(account))
