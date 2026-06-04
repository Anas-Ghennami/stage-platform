from django.urls import path
from .views import (
    OfferListView, OfferCreateView, OfferDetailView,
    CompanyOffersView, PendingOffersView, OfferApproveView, OfferRejectView
)

urlpatterns = [
    path('', OfferListView.as_view(), name='offer-list'),
    path('create/', OfferCreateView.as_view(), name='offer-create'),
    path('my/', CompanyOffersView.as_view(), name='company-offers'),
    path('pending/', PendingOffersView.as_view(), name='pending-offers'),
    path('<str:pk>/', OfferDetailView.as_view(), name='offer-detail'),
    path('<str:pk>/approve/', OfferApproveView.as_view(), name='offer-approve'),
    path('<str:pk>/reject/', OfferRejectView.as_view(), name='offer-reject'),
]
