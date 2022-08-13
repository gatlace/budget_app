from django.db import models

# Create your models here.
class Transaction(models.Model):
    account = models.ForeignKey("users.Account", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    merchant = models.CharField(max_length=50)
    date = models.DateField()

    def __str__(self):
        return f"{self.account.user.username}'s transaction on {self.date}"
