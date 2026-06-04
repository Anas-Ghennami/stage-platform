from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    StudentRegisterView, CompanyRegisterView, AdminRegisterView,
    LoginView, LogoutView, ProfileView,
    AdminCompanyListView, AdminCompanyApproveView, AdminCompanyRejectView
)

urlpatterns = [
    path("register/student/", StudentRegisterView.as_view(), name="register-student"),
    path("register/company/", CompanyRegisterView.as_view(), name="register-company"),
    path("register/admin/", AdminRegisterView.as_view(), name="register-admin"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("admin/companies/", AdminCompanyListView.as_view(), name="admin-companies"),
    path("admin/companies/<str:pk>/approve/", AdminCompanyApproveView.as_view(), name="admin-company-approve"),
    path("admin/companies/<str:pk>/reject/", AdminCompanyRejectView.as_view(), name="admin-company-reject"),
]
