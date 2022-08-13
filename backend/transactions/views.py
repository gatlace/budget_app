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
    transactions = Transaction.objects.filter(account=account)
    merchants = set([transaction.merchant for transaction in transactions])
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
        for merchant in merchants
    }

    return Response(
        {
            "companies": merchant_percentages,
            "balance": account.balance,
            "transactions": [serialize(transaction) for transaction in transactions][
                :50:
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
