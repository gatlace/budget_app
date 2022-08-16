from rest_framework import serializers
from .models import Transaction
from users.models import Account
from users.serializers import AccountSerializer


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ("amount", "merchant", "date", "account")


def serialize(obj):
    if isinstance(obj, Account):
        return AccountSerializer(obj).data
    elif isinstance(obj, Transaction):
        return TransactionSerializer(obj).data
