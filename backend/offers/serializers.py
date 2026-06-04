from rest_framework import serializers
from django.utils import timezone
from .models import Offer


class OfferSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = Offer
        fields = [
            'id', 'company', 'company_name', 'title', 'description', 'skills_required',
            'duration', 'duration_unit', 'stage_type', 'city', 'address', 'salary',
            'start_date', 'application_deadline', 'status', 'rejection_reason',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['company', 'status', 'rejection_reason', 'created_at', 'updated_at']

    def get_company_name(self, obj):
        try:
            return obj.company.company_profile.name
        except Exception:
            return ''

    def validate(self, data):
        today = timezone.now().date()
        deadline = data.get('application_deadline')
        start_date = data.get('start_date')

        if deadline and deadline < today:
            raise serializers.ValidationError(
                {"application_deadline": "Deadline cannot be in the past."}
            )
        if start_date and deadline and start_date <= deadline:
            raise serializers.ValidationError(
                {"start_date": "Start date must be after the application deadline."}
            )
        return data
