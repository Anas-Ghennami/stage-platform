from rest_framework import serializers
from django.contrib.auth import get_user_model
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
            is_active=False,  # company must wait for admin approval
        )
        CompanyProfile.objects.create(user=user, **profile_data)
        return user
