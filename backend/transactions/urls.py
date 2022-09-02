from . import views
from django.urls import path

urlpatterns = [
    path("all/", views.get_all_transactions, name="all_transactions"),
    path("dashboard/", views.account_summary, name="account_summary"),
    path("create/", views.add_transaction, name="create_transaction"),
    path(
        "<str:merchant_name>/",
        views.get_merchant_transactions,
        name="merchant_transactions",
    ),
    path("edit/<int:id>/", views.edit_transaction, name="edit_transaction"),
    path("delete/<int:id>/", views.delete_transaction, name="delete_transaction"),
]
