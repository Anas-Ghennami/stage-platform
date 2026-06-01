from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", User.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    STUDENT = "student"
    COMPANY = "company"
    ADMIN = "admin"
    ROLE_CHOICES = [
        (STUDENT, "Student"),
        (COMPANY, "Company"),
        (ADMIN, "Admin"),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    study_level = models.CharField(max_length=50)
    skills = models.TextField(blank=True)
    cv = models.FileField(upload_to="cvs/", null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class CompanyProfile(models.Model):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (APPROVED, "Approved"),
        (REJECTED, "Rejected"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="company_profile")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=100, blank=True)
    logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    legal_id = models.CharField(max_length=50, blank=True)  # SIRET/ICE legal number
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return self.name
