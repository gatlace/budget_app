from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Account
from django.contrib.auth.models import User


# Create your views here.
@api_view(["POST"])
def create_account(request):
    if not request.data["username"] or not request.data["password"]:
        return Response({"message": "Please provide both username and password"}, status=400)

    if len(User.objects.filter(username=request.data["username"])) > 0:
        return Response({"message": "Username already exists"}, status=409)

    user = User.objects.create_user(
        username=request.data["username"],
        password=request.data["password"]
    )
    Account.objects.create(user=user, balance=0, budget=0)
    token = Token.objects.create(user=user)
    return Response({"token": token.key}, status=200)


@api_view(["POST"])
def login(request):
    if not request.data["username"] or not request.data["password"]:
        return Response({"message": "Please provide both username and password"}, status=400)

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
