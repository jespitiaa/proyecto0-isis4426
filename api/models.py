
import uuid

from django.db import models
from django.conf import settings

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    event_name = models.TextField()

    cats=models.TextChoices('event_category','CONFERENCE SEMINAR CONGRESS COURSE')
    event_category = models.CharField(max_length=20, choices=cats.choices)

    event_place = models.TextField()

    event_address = models.TextField()

    event_initial_date = models.DateTimeField()

    event_final_date = models.DateTimeField()

    tps=models.TextChoices('event_type', 'VIRTUAL PRESENCIAL')
    event_type = models.CharField(max_length=20, choices=tps.choices)

    thumbnail = models.TextField()

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
