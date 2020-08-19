from django.shortcuts import render
from rest_framework import viewsets, permissions, parsers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import EventSerializer, UserSerializer
from .models import Event
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
import traceback

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))

def createUser(request):
    data = request.data.dict()
    print(data)
    try:
        user = User.objects.create_user(data['username'], data['email'], data['password'])
        user.first_name=data['first_name']
        user.last_name=data['last_name']
        user.save()
        return Response(status=201)
    except:
        traceback.print_exc()
        return Response(status=400)


# Create your views here.
class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = EventSerializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    def get_queryset(self):
        try:
            print(self.request.user)
            return Event.objects.filter(owner=self.request.user).order_by('event_name')
        except:
            return []
