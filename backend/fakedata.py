from faker import Faker
from random import randint, choice
from users.models import Account
from django.contrib.auth.models import User
from transactions.models import Transaction, Merchant

faker = Faker()

companies = [faker.company() for _ in range(12)]

for i in companies:
    Merchant.objects.create(name=i)

User.objects.create_user(username="testuser", password="testpassword")
Account.objects.create(
    user=User.objects.get(username="testuser"),
    first_name="Test",
    last_name="User",
    budget=0,
)

for i in range(200):
    print(
        Transaction.objects.create(
            account=User.objects.get(username="testuser").account,
            amount=faker.pydecimal(left_digits=2, right_digits=2, positive=True),
            merchant=Merchant.objects.get(name=choice(companies)),
            date=faker.date_this_year(),
        )
    )
