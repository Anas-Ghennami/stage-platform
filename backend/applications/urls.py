from django.urls import path
from .views import (
    ApplyView, StudentApplicationListView, CompanyApplicationListView,
    ApplicationDetailView, ReportSubmitView, StudentReportListView,
    AdminReportListView, ReportDetailView
)

urlpatterns = [
    path('apply/', ApplyView.as_view(), name='apply'),
    path('my/', StudentApplicationListView.as_view(), name='student-applications'),
    path('company/', CompanyApplicationListView.as_view(), name='company-applications'),
    path('<str:pk>/', ApplicationDetailView.as_view(), name='application-detail'),
    path('reports/submit/', ReportSubmitView.as_view(), name='report-submit'),
    path('reports/my/', StudentReportListView.as_view(), name='student-reports'),
    path('reports/all/', AdminReportListView.as_view(), name='admin-reports'),
    path('reports/<str:pk>/', ReportDetailView.as_view(), name='report-detail'),
]
