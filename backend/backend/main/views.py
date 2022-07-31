from datetime import datetime
from django.http import JsonResponse


def index(request):
    return JsonResponse({"datetime": datetime.now().isoformat()})


def check_login(request):
    print(account)
    if request.user.is_authenticated:
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})
