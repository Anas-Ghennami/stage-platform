from django.db import models
from django.conf import settings


class Offer(models.Model):
    # Statuses
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXPIRED = "expired"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (APPROVED, "Approved"),
        (REJECTED, "Rejected"),
        (EXPIRED, "Expired"),
    ]

    # Stage types
    PFE = "pfe"
    OBSERVATION = "observation"
    INTERNSHIP = "internship"
    TYPE_CHOICES = [
        (PFE, "PFE"),
        (OBSERVATION, "Observation"),
        (INTERNSHIP, "Internship"),
    ]

    company = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="offers"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    skills_required = models.TextField()
    duration = models.CharField(max_length=100)
    stage_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=INTERNSHIP)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    salary = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    application_deadline = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    rejection_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
