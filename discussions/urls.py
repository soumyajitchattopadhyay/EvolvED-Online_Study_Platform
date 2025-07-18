from django.urls import path
from .views import create_discussion, view_discussions, reply_to_discussion, moderate_discussion, moderate_reply

urlpatterns = [
    path('create/', create_discussion, name="create_discussion"),
    path('view/', view_discussions, name="view_discussions"),
    path('reply/<int:discussion_id>/', reply_to_discussion),
    path('moderate/<int:discussion_id>/', moderate_discussion),
    path('moderate-reply/<int:reply_id>/', moderate_reply),
]
