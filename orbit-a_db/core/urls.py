from django.urls import path
from .views import EmailSubscriptionAPIView, ContactFormAPIView

urlpatterns = [
    path('subscribe/', EmailSubscriptionAPIView.as_view(), name='subscribe'),
    path('contact/', ContactFormAPIView.as_view(), name='contact'),
]

