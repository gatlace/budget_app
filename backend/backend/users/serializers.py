from .models import Account, Transaction
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id", "name", "budget", "balance")


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


def serialize(obj, request):
    if isinstance(obj, Account):
        return AccountSerializer(obj, context={"request": request}).data
    elif isinstance(obj, Transaction):
        return TransactionSerializer(obj, context={"request": request}).data
    else:
        return obj
