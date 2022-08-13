from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


def serialize(obj):
    if isinstance(obj, Transaction):
        return TransactionSerializer(obj).data
