from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Account
from .serializers import serialize
from django.contrib.auth.models import User


# Create your views here.
@api_view(["POST"])
def create_account(request):
    username = request.data.get("username")
    password = request.data.get("password")
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    print(request.data)

    if username is None or password is None or first_name is None or last_name is None:
        return Response(
            {"error": "Please provide both username and password"}, status=401
        )

    if User.objects.filter(username=username).exists():
        return Response({"error": "The username already exists"}, status=409)

    user = User.objects.create_user(username=username, password=password)
    Account.objects.create(
        user=user, first_name=first_name, last_name=last_name, budget=0
    )
    token = Token.objects.create(user=user)

    return Response({"token": token.key}, status=200)


@api_view(["GET", "POST"])
def login(request):
    if request.method == "POST":
        if not request.data.get("username") or not request.data.get("password"):
            return Response(
                {"message": "Please provide a username and password to login"},
                status=400,
            )

        user = User.objects.filter(username=request.data["username"])
        if len(user) == 0:
            return Response({"message": "Username does not exist"}, status=404)

        print(user[0].check_password(request.data["password"]))

        if not user[0].check_password(request.data["password"]):
            return Response({"message": "Incorrect password"}, status=401)

        if not Token.objects.filter(user=user[0]).exists():
            Token.objects.create(user=user[0])

        token = Token.objects.get(user=user[0])
        return Response({"token": token.key}, status=200)

    if request.method == "GET":
        if not request.user:
            return Response({"message": "Not logged in"}, status=401)

        return Response({"success": "logged in"}, status=200)


@api_view(["GET"])
def account_details(request):
    if not request.user.is_authenticated:
        return Response({"message": "Not logged in"}, status=401)

    username = request.user.username
    account = Account.objects.get(user=request.user)
    return Response({"username": username, "account": serialize(account)}, status=200)


@api_view(["PUT"])
def edit_account(request):
    if not request.user.is_authenticated:
        return Response({"message": "Please login"}, status=401)

    if (
        not request.data["firstName"]
        or not request.data["lastName"]
        or not request.data["budget"]
    ):
        return Response(
            {"message": "Please provide a first name and last name"}, status=400
        )

    account = Account.objects.get(user=request.user)
    account.first_name = request.data["firstName"]
    account.last_name = request.data["lastName"]
    account.budget = request.data["budget"]
    account.save()

    return Response({"message": "Account updated"}, status=200)


@api_view(["PUT"])
def edit_login(request):
    if not request.user.is_authenticated:
        return Response({"message": "Please login"}, status=401)

    if not request.data.get("password") or not request.data.get("username"):
        return Response(
            {"message": "Please provide a username and password to reset"},
            status=400,
        )

    if User.objects.filter(username=request.data["username"]).exists():
        if request.data["username"] == request.user.username:
            pass
        else:
            return Response({"message": "The username already exists"}, status=409)

    request.user.username = request.data["username"]
    request.user.set_password(request.data["password"])
    request.user.save()

    return Response({"message": "Login updated"}, status=200)
