from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password as django_validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import StudentProfile, CompanyProfile

User = get_user_model()


class StudentRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    field_of_study = serializers.CharField()
    study_level = serializers.CharField()

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name", "field_of_study", "study_level"]

    def validate_password(self, value):
        try:
            django_validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def create(self, validated_data):
        profile_data = {
            "first_name": validated_data.pop("first_name"),
            "last_name": validated_data.pop("last_name"),
            "field_of_study": validated_data.pop("field_of_study"),
            "study_level": validated_data.pop("study_level"),
        }
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role=User.STUDENT,
        )
        StudentProfile.objects.create(user=user, **profile_data)
        return user


class CompanyRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField()
    industry = serializers.CharField()
    contact = serializers.CharField()
    legal_id = serializers.CharField()

    class Meta:
        model = User
        fields = ["email", "password", "name", "industry", "contact", "legal_id"]

    def validate_password(self, value):
        try:
            django_validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def create(self, validated_data):
        profile_data = {
            "name": validated_data.pop("name"),
            "industry": validated_data.pop("industry"),
            "contact": validated_data.pop("contact"),
            "legal_id": validated_data.pop("legal_id"),
        }
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role=User.COMPANY,
            is_active=False,
        )
        CompanyProfile.objects.create(user=user, **profile_data)
        return user


class StudentProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = StudentProfile
        fields = ['email', 'first_name', 'last_name', 'field_of_study', 'study_level', 'skills', 'cv', 'updated_at']
        read_only_fields = ['updated_at']


class CompanyProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = CompanyProfile
        fields = ['email', 'name', 'description', 'industry', 'contact', 'logo', 'legal_id', 'status', 'updated_at']
        read_only_fields = ['status', 'updated_at']


class CompanyAdminSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = CompanyProfile
        fields = ['id', 'email', 'name', 'description', 'industry', 'contact', 'legal_id', 'status', 'updated_at']
