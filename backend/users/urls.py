from . import views
from django.urls import path

urlpatterns = [
    path("new/", views.create_account, name="create_account"),
    path("login/", views.login, name="login"),
    path("edit_account/", views.edit_account, name="edit_account"),
    path("edit_login/", views.edit_login, name="edit_password"),
    path("account_info/", views.account_details, name="account_details"),
]
