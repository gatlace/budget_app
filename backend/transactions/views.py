from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import Account
from .models import Transaction
from .serializers import serialize

# Create your views here.


@api_view(["GET"])
def account_summary(request):
    account = Account.objects.get(user=request.user)
    transactions = sorted(
        Transaction.objects.filter(account=account), key=lambda x: x.date
    )
    merchant_set = set([transaction.merchant for transaction in transactions])
    merchant_percentages = {
        merchant: (
            sum(
                [
                    transaction.amount
                    for transaction in transactions
                    if transaction.merchant == merchant
                ]
            )
            / account.balance
        )
        for merchant in merchant_set
    }
    merchants = [
        {
            "name": merchant,
            "percentage": merchant_percentages[merchant],
        }
        for merchant in merchant_set
    ]

    return Response(
        {
            "merchants": merchants,
            "account": serialize(account),
            "transactions": [serialize(transaction) for transaction in transactions][
                :-26:-1
            ],
        }
    )


@api_view(["GET"])
def get_all_transactions(request):
    account = Account.objects.get(user=request.user)
    transactions = Transaction.objects.filter(account=account)
    serialized_transactions = [serialize(transaction) for transaction in transactions]
    return Response({"transactions": serialized_transactions})


@api_view(["GET"])
def get_merchant_transactions(request, merchant):
    account = Account.objects.get(user=request.user)
    transactions = Transaction.objects.filter(account=account, merchant=merchant)
    if not transactions:
        return Response({"message": "No transactions found for this merchant."})
    merchant_percentage = sum([t.amount for t in transactions]) / account.balance
    return Response(
        {
            "merchant": merchant,
            "percentage": merchant_percentage,
            "transactions": [serialize(transaction) for transaction in transactions],
        }
    )
