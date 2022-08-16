from . import views
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("new/", views.create_account, name="create_account"),
    path("login/", obtain_auth_token, name="login"),
    path("account/", views.get_account, name="get_account"),
]
