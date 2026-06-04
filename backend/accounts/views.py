from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password as django_validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from decouple import config


def paginate_queryset(queryset, request, serializer_class):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    page = paginator.paginate_queryset(queryset, request)
    return paginator.get_paginated_response(serializer_class(page, many=True).data)
from .serializers import (
    StudentRegisterSerializer, CompanyRegisterSerializer,
    StudentProfileSerializer, CompanyProfileSerializer, CompanyAdminSerializer
)
from .models import CompanyProfile
from .permissions import IsAdmin

User = get_user_model()


class StudentRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = StudentRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Student account created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CompanyRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Company account created. Waiting for admin approval."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.data.get("setup_key") != config("ADMIN_SETUP_KEY"):
            return Response({"error": "Invalid setup key."}, status=status.HTTP_403_FORBIDDEN)

        if User.objects.filter(role=User.ADMIN).exists():
            return Response({"error": "An admin account already exists."}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            django_validate_password(password)
        except DjangoValidationError as e:
            return Response({"error": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(email=email, password=password, role=User.ADMIN, is_staff=True, is_superuser=True)
        return Response({"message": "Admin account created."}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, username=email, password=password)

        if user is None:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({"error": "Your account is not active yet. Please wait for admin approval."}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role,
            "id": str(user.id),
            "email": user.email,
        })


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get("refresh"))
            token.blacklist()
            return Response({"message": "Logged out successfully."})
        except TokenError:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'student':
            serializer = StudentProfileSerializer(user.student_profile)
        elif user.role == 'company':
            serializer = CompanyProfileSerializer(user.company_profile)
        else:
            return Response({"email": user.email, "role": user.role, "id": str(user.id)})
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        if user.role == 'student':
            serializer = StudentProfileSerializer(user.student_profile, data=request.data, partial=True)
        elif user.role == 'company':
            serializer = CompanyProfileSerializer(user.company_profile, data=request.data, partial=True)
        else:
            return Response({"error": "Admin profile not editable here."}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminCompanyListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        status_filter = request.query_params.get('status', 'pending')
        if status_filter == 'all':
            companies = CompanyProfile.objects.all().order_by('-updated_at')
        else:
            companies = CompanyProfile.objects.filter(status=status_filter).order_by('-updated_at')
        return paginate_queryset(companies, request, CompanyAdminSerializer)


class AdminCompanyApproveView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            company = CompanyProfile.objects.get(pk=pk)
        except CompanyProfile.DoesNotExist:
            return Response({"error": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        company.status = CompanyProfile.APPROVED
        company.user.is_active = True
        company.user.save()
        company.save()
        return Response({"message": "Company approved."})


class AdminCompanyRejectView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            company = CompanyProfile.objects.get(pk=pk)
        except CompanyProfile.DoesNotExist:
            return Response({"error": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        company.status = CompanyProfile.REJECTED
        company.save()
        return Response({"message": "Company rejected."})
