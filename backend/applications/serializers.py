from rest_framework import serializers
from .models import Application, InternshipReport


class ApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    offer_title = serializers.CharField(source='offer.title', read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'student', 'student_name', 'offer', 'offer_title', 'status', 'applied_at', 'updated_at']
        read_only_fields = ['student', 'status', 'applied_at', 'updated_at']

    def get_student_name(self, obj):
        try:
            profile = obj.student.student_profile
            return f"{profile.first_name} {profile.last_name}"
        except Exception:
            return obj.student.email


class InternshipReportSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = InternshipReport
        fields = ['id', 'student_name', 'application', 'file', 'submitted_at', 'updated_at', 'status']
        read_only_fields = ['submitted_at', 'updated_at', 'status']

    def get_student_name(self, obj):
        try:
            profile = obj.application.student.student_profile
            return f"{profile.first_name} {profile.last_name}"
        except Exception:
            return ''
