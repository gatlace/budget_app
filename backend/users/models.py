from django.db import models
from transactions.models import Transaction


class Account(models.Model):
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def balance(self):
        transactions = Transaction.objects.filter(account=self)
        print([transaction.amount for transaction in transactions])
        return sum([transaction.amount for transaction in transactions])

    def __str__(self):
        return f"{self.user.username}'s account"
