from django.db import models
from random import choice

# Create your models here.
class Transaction(models.Model):
    account = models.ForeignKey("users.Account", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    merchant = models.ForeignKey("Merchant", on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.account.user.username}'s transaction on {self.date}"


def generate_color():
    choices = [i for i in range(0, 10)]
    choices.extend([i for i in "abcdef"])
    numbers = []
    for i in range(0, 6):
        numbers.append(str(choice(choices)))
    return "#" + "".join(numbers)


class Merchant(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50, default=generate_color)

    @property
    def transactions(self):
        return Transaction.objects.filter(merchant=self)

    @property
    def total(self):
        return sum([t.amount for t in self.transactions])

    def __str__(self):
        return self.name
