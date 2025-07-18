from django.db import models
from users.models import User
from groups.models import StudyGroup

class Discussion(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="discussions")
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name="discussions")
    created_at = models.DateTimeField(auto_now_add=True)
    is_moderated = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Reply(models.Model):
    discussion = models.ForeignKey(Discussion, related_name="replies", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)  # Moderators can approve/reject replies

    def __str__(self):
        return f"Reply by {self.user.username} on {self.discussion.title}"
