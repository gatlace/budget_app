from decimal import Decimal
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
        Transaction.objects.filter(account=account), key=lambda x: x.date, reverse=True
    )
    if transactions is None:
        return Response({"message": "No transactions found"}, status=404)
    merchant_set = set([transaction.merchant for transaction in transactions])
    merchant_percentages = {
        merchant: (
            (
                round(
                    sum(
                        [
                            transaction.amount
                            for transaction in transactions
                            if transaction.merchant == merchant
                        ]
                    )
                    / account.balance,
                    2,
                )
            )
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
            "transactions": [serialize(transaction) for transaction in transactions],
        }
    )


@api_view(["GET"])
def get_all_transactions(request):
    account = Account.objects.get(user=request.user)
    transactions = Transaction.objects.filter(account=account)
    serialized_transactions = sorted(
        [serialize(transaction) for transaction in transactions],
        key=lambda x: x["date"],
        reverse=True,
    )
    return Response({"transactions": serialized_transactions})
    return Response({"transactions": serialized_transactions})


@api_view(["GET"])
def get_merchant_transactions(request, merchant):
    account = Account.objects.get(user=request.user)
    transactions = Transaction.objects.filter(account=account, merchant=merchant)
    if not transactions:
        return Response({"message": "No transactions found for this merchant."})
    merchant_percentage = sum([t.amount for t in transactions]) / account.balance * 100
    total = sum([t.amount for t in transactions])
    return Response(
        {
            "merchant": merchant,
            "percentage": round(merchant_percentage, 2),
            "transactions": sorted(
                [serialize(transaction) for transaction in transactions],
                key=lambda x: x["date"],
                reverse=True,
            ),
            "total": total,
        }
    )


@api_view(["PUT"])
def edit_transaction(request, id):
    transaction = Transaction.objects.get(id=id)
    transaction.amount = request.data["amount"]
    transaction.merchant = request.data["merchant"]
    transaction.date = request.data["date"]
    transaction.save()
    return Response({"message": "Transaction updated successfully."})


@api_view(["DELETE"])
def delete_transaction(request, id):
    transaction = Transaction.objects.get(id=id)
    transaction.delete()
    return Response({"message": "Transaction deleted successfully."})


@api_view(["POST"])
def add_transaction(request):
    account = Account.objects.get(user=request.user)
    transaction = Transaction(
        account=account,
        amount=request.data["amount"],
        merchant=request.data["merchant"],
        date=request.data["date"],
    )
    transaction.save()
    return Response({"message": "Transaction added successfully."})
