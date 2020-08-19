from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views as authviews
from . import views

router = routers.DefaultRouter()
router.register(r'events', views.EventViewSet, basename='events')

urlpatterns = [
    path('', include(router.urls)),
    path('create-user/', views.createUser),
    path('api-auth/', authviews.obtain_auth_token),
]
