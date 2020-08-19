from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'event_name', 'event_category', 'event_place', 'event_address', 'event_initial_date', 'event_final_date', 'event_type', 'thumbnail')
	#, 'owner')
        owner = serializers.ReadOnlyField(source='owner.id')

class UserSerializer(serializers.ModelSerializer):
    events = serializers.PrimaryKeyRelatedField(many=True, queryset=Event.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'events']
