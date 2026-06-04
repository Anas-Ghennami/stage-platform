from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Application, InternshipReport
from .serializers import ApplicationSerializer, InternshipReportSerializer
from offers.models import Offer
from accounts.permissions import IsStudent, IsCompany, IsAdmin


class ApplyView(APIView):
    permission_classes = [IsStudent]

    def post(self, request):
        offer_id = request.data.get('offer')
        try:
            offer = Offer.objects.get(pk=offer_id, status=Offer.APPROVED)
        except Offer.DoesNotExist:
            return Response({'error': 'Offer not found or not available.'}, status=status.HTTP_404_NOT_FOUND)
        if offer.application_deadline < timezone.now().date():
            return Response({'error': 'Application deadline has passed.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ApplicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentApplicationListView(APIView):
    permission_classes = [IsStudent]

    def get(self, request):
        applications = Application.objects.filter(student=request.user).order_by('-applied_at')
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class CompanyApplicationListView(APIView):
    permission_classes = [IsCompany]

    def get(self, request):
        applications = Application.objects.filter(offer__company=request.user).order_by('-applied_at')
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class ApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            app = Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return None, 'not_found'
        if user.role == 'admin':
            return app, None
        if user.role == 'student' and app.student != user:
            return None, 'forbidden'
        if user.role == 'company' and app.offer.company != user:
            return None, 'forbidden'
        return app, None

    def get(self, request, pk):
        app, error = self.get_object(pk, request.user)
        if error == 'not_found':
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        if error == 'forbidden':
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(ApplicationSerializer(app).data)

    def patch(self, request, pk):
        if request.user.role != 'company':
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        app, error = self.get_object(pk, request.user)
        if error == 'not_found':
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        if error == 'forbidden':
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        new_status = request.data.get('status')
        allowed = [Application.REVIEWING, Application.ACCEPTED, Application.REJECTED]
        if new_status not in allowed:
            return Response({'error': f'Invalid status. Allowed: {allowed}'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = new_status
        app.save()
        return Response(ApplicationSerializer(app).data)

    def delete(self, request, pk):
        if request.user.role != 'student':
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        app, error = self.get_object(pk, request.user)
        if error == 'not_found':
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        if error == 'forbidden':
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        if app.status not in [Application.PENDING, Application.REVIEWING]:
            return Response({'error': 'Cannot cancel at this stage.'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = Application.CANCELLED
        app.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReportSubmitView(APIView):
    permission_classes = [IsStudent]

    def post(self, request):
        application_id = request.data.get('application')
        try:
            application = Application.objects.get(pk=application_id, student=request.user, status=Application.ACCEPTED)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found or not in accepted state.'}, status=status.HTTP_404_NOT_FOUND)
        if hasattr(application, 'report'):
            return Response({'error': 'Report already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = InternshipReportSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentReportListView(APIView):
    permission_classes = [IsStudent]

    def get(self, request):
        reports = InternshipReport.objects.filter(application__student=request.user).order_by('-submitted_at')
        serializer = InternshipReportSerializer(reports, many=True)
        return Response(serializer.data)


class AdminReportListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        reports = InternshipReport.objects.all().order_by('-submitted_at')
        serializer = InternshipReportSerializer(reports, many=True)
        return Response(serializer.data)


class ReportDetailView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request, pk):
        try:
            report = InternshipReport.objects.get(pk=pk)
        except InternshipReport.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        new_status = request.data.get('status')
        allowed = [InternshipReport.VERIFIED, InternshipReport.NON_COMPLIANT]
        if new_status not in allowed:
            return Response({'error': f'Invalid status. Allowed: {allowed}'}, status=status.HTTP_400_BAD_REQUEST)
        report.status = new_status
        report.save()
        return Response(InternshipReportSerializer(report).data)
