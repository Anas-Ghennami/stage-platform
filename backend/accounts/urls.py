from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import StudentRegisterView, CompanyRegisterView, LoginView

urlpatterns = [
    path("register/student/", StudentRegisterView.as_view(), name="register-student"),
    path("register/company/", CompanyRegisterView.as_view(), name="register-company"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]
