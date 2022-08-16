from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("first_name", "last_name", "budget", "balance")

    @property
    def balance(self):
        return self.instance.balance

    def __str__(self):
        return f"{self.instance.user.username}'s account"
