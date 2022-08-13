from . import views
from django.urls import path

urlpatterns = [
    path("all/", views.get_all_transactions, name="all_transactions"),
    path("dashboard/", views.account_summary, name="account_summary"),
    path("<str:merchant>/", views.get_merchant_transactions, name="merchant_transactions"),
]
