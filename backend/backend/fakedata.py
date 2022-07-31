from decimal import Decimal
from pickletools import read_unicodestring1
from random import randint
from faker import Faker
from uuid import uuid4

from users.models import Account, Transaction
from django.contrib.auth.models import User

faker = Faker()


class FakeUser:
    def __init__(self):
        # self.password = faker.password(
        #    length=10, special_chars=True, digits=True, upper_case=True, lower_case=True
        # )
        self.password = "1l;2rwfnla"
        self.username = faker.user_name()
        User.objects.create_user(
            username=self.username,
            password=self.password,
        ).save()


class FakeAccount:
    def __init__(self, user: User):
        self.id = uuid4()
        self.user = user
        self.email = faker.email()
        self.name = faker.name()
        self.budget = Decimal(faker.numerify(text="#####.##"))
        Account(
            name=self.name, user=self.user, budget=self.budget, email=self.email
        ).save()

    def __str__(self):
        return f"{self.name}"


class FakeTransaction:
    def __init__(self, account):
        self.id = uuid4()
        self.account = account
        self.amount = Decimal(faker.numerify(text="###.##")) * (randint(0, 1) * 2 - 1)
        self.date = faker.date_time_this_century()
        Transaction(
            id=self.id,
            account=Account.objects.get(id=account.id),
            amount=self.amount,
            date=self.date,
        ).save()

    def __str__(self):
        return f"{self.amount} - {self.date}"

    def __repr__(self):
        return f"{self.amount} - {self.date}"


def get_mock_data():
    user = FakeUser()
    print(f"Created user: {user.username}")
    db_user = User.objects.get(username=user.username)
    account = FakeAccount(db_user)
    dbaccount = Account.objects.get(user=db_user)
    for i in range(randint(10, 20)):
        transaction = FakeTransaction(dbaccount)
        print(f"Created transaction: {transaction}")
