from django.db import models
from users.models import User
from groups.models import StudyGroup

class Meeting(models.Model):
    topic = models.CharField(max_length=255)
    start_time = models.DateTimeField()  # Ensure this is in your model
    duration = models.IntegerField()
    agenda = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    # group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)
    zoom_meeting_id = models.CharField(max_length=100, null=True, blank=True)  
    zoom_join_url = models.URLField(max_length=500)
    zoom_start_url = models.URLField(max_length=500)
    is_recurring = models.BooleanField(default=False)
    recurrence_type = models.CharField(max_length=50, null=True, blank=True)  
    recurrence_interval = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.topic