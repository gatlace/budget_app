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
        return Response(status=400)
    user = User.objects.create_user(
        request.data["username"], None, request.data["password"]
    )
    Account.objects.create(user=user)
    token = Token.objects.create(user=user)
    return Response({"token": token.key}, status=200)


@api_view(["GET"])
def get_account(request):
    account = Account.objects.get(user=request.user)
    return Response(serialize(account))
