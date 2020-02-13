from django.urls import path
from knox.views import LogoutView

from .views import LoginAPI, UserAPI

urlpatterns = [
    path('login/', LoginAPI.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user/', UserAPI.as_view()),
]
