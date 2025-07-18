from django.urls import path
from .views import schedule_zoom_meeting, view_meetings, join_meeting, reoccur_meeting

urlpatterns = [
    path("schedule/", schedule_zoom_meeting, name="schedule_zoom_meeting"),
    path("view/", view_meetings, name="view_meetings"),
    path("join/<int:meeting_id>/", join_meeting, name="join_meeting"),
    path("reoccur/<int:meeting_id>/", reoccur_meeting, name="reoccur_meeting"),
]
