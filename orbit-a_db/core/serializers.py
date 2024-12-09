from rest_framework import serializers
from .models import EmailSubscription, ContactForm

class EmailSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscription
        fields = ['id', 'email', 'subscribed_at']

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['id', 'name', 'email', 'subject', 'message', 'submitted_at']
