from django.db import models
from users.models import User
from django.conf import settings

class StudyGroup(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="created_groups")
    members = models.ManyToManyField(User, related_name="joined_groups")

    def __str__(self):
        return self.name
