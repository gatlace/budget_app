from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Account, Transaction
from .serializers import serialize
from ast import literal_eval

# Create your views here.
@api_view(["GET"])
def all_accounts(request):
    accounts = Account.objects.all()
    accounts_list = [serialize(account, request) for account in accounts]
    return Response(accounts_list)


@api_view(["GET"])
def account_detail(request):
    account = Account.objects.get(user=request.user)
    account_json = serialize(account, request)
    return Response(account_json)


@login_required
@api_view(["GET"])
def user_transactions(request):
    account = request.user.account
    transactions = Transaction.objects.filter(account=account)
    transactions_list = [
        serialize(transaction, request) for transaction in transactions
    ]

    return Response({"transactions": transactions_list})


@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    print(username, password)
    user = authenticate(username=username, password=password)
    if user is not None:
        auth_login(request._request, user)
        return Response({"success": True})
    else:
        return Response({"success": False})
