from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Offer
from .serializers import OfferSerializer
from accounts.permissions import IsApprovedCompany, IsCompany, IsAdmin


def paginate_queryset(queryset, request, serializer_class):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    page = paginator.paginate_queryset(queryset, request)
    return paginator.get_paginated_response(serializer_class(page, many=True).data)


class OfferListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        offers = Offer.objects.filter(status=Offer.APPROVED).order_by('-created_at')
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)


class OfferCreateView(APIView):
    permission_classes = [IsApprovedCompany]

    def post(self, request):
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(company=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyOffersView(APIView):
    permission_classes = [IsCompany]

    def get(self, request):
        offers = Offer.objects.filter(company=request.user).order_by('-created_at')
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)


class OfferDetailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsApprovedCompany()]

    def get_object(self, pk):
        try:
            return Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            return None

    def get(self, request, pk):
        offer = self.get_object(pk)
        if not offer:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        is_admin = request.user.is_authenticated and request.user.role == 'admin'
        is_owner = request.user.is_authenticated and offer.company == request.user
        if not is_admin and not is_owner and offer.status != Offer.APPROVED:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(OfferSerializer(offer).data)

    def put(self, request, pk):
        offer = self.get_object(pk)
        if not offer:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        if offer.company != request.user:
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = OfferSerializer(offer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(status=Offer.PENDING)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        offer = self.get_object(pk)
        if not offer:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        if offer.company != request.user:
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PendingOffersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        status_filter = request.query_params.get('status', 'pending')
        if status_filter == 'all':
            offers = Offer.objects.all().order_by('-created_at')
        else:
            offers = Offer.objects.filter(status=status_filter).order_by('-created_at')
        return paginate_queryset(offers, request, OfferSerializer)


class OfferApproveView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            offer = Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        offer.status = Offer.APPROVED
        offer.rejection_reason = ''
        offer.save()
        return Response({'message': 'Offer approved.'})


class OfferRejectView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            offer = Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        offer.status = Offer.REJECTED
        offer.rejection_reason = request.data.get('reason', '')
        offer.save()
        return Response({'message': 'Offer rejected.'})
