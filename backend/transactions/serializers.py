from rest_framework import serializers
from .models import Transaction, Merchant
from users.models import Account
from users.serializers import AccountSerializer


class TransactionSerializer(serializers.ModelSerializer):
    merchant_name = serializers.SerializerMethodField()

    def get_merchant_name(self, obj):
        return obj.merchant.name

    class Meta:
        model = Transaction
        fields = ("amount", "merchant_name", "date", "id")


class MerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = ("name", "color", "id")


def serialize(obj):
    if isinstance(obj, Account):
        return AccountSerializer(obj).data
    elif isinstance(obj, Transaction):
        return TransactionSerializer(obj).data
    elif isinstance(obj, Merchant):
        return MerchantSerializer(obj).data
