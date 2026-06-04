import uuid
from django.db import models
from django.conf import settings
from offers.models import Offer


class Application(models.Model):
    PENDING = "pending"
    REVIEWING = "reviewing"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    CANCELLED = "cancelled"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (REVIEWING, "Reviewing"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
        (CANCELLED, "Cancelled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("student", "offer")

    def __str__(self):
        return f"{self.student} → {self.offer}"


class InternshipReport(models.Model):
    PENDING = "pending"
    VERIFIED = "verified"
    NON_COMPLIANT = "non_compliant"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (VERIFIED, "Verified"),
        (NON_COMPLIANT, "Non Compliant"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.OneToOneField(Application, on_delete=models.CASCADE, related_name="report")
    file = models.FileField(upload_to="reports/")
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f"Report - {self.application.student}"
