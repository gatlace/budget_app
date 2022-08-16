from faker import Faker
from random import randint, choice
from users.models import Account
from django.contrib.auth.models import User
from transactions.models import Transaction

faker = Faker()

companies = [faker.company() for _ in range(7)]

for i in range(100):
    print(
        Transaction.objects.create(
            account=User.objects.get(username="testuser").account,
            amount=faker.pydecimal(left_digits=2, right_digits=2, positive=True),
            merchant=choice(companies),
            date=faker.date_this_year(),
        )
    )
