from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer
from django.conf import settings
import requests
import datetime
import jwt
from rest_framework.permissions import IsAuthenticated
from users.decorators import role_required
from .utils import generate_zoom_oauth_token

@api_view(["POST"])
@permission_classes([IsAuthenticated])  
@role_required(['tutor', 'admin'])
def schedule_zoom_meeting(request):
    """API to schedule a Zoom meeting"""
    zoom_token = generate_zoom_oauth_token()
    
    if not zoom_token:
        return Response({"error": "Failed to get Zoom OAuth token"}, status=400)

    headers = {
        "Authorization": f"Bearer {zoom_token}",
        "Content-Type": "application/json",
    }

    meeting_data = {
        "topic": request.data.get("topic", "Zoom Meeting"),
        "type": 2,  
        "start_time": request.data.get("start_time"),
        "duration": request.data.get("duration", 30),
        "timezone": "UTC",
        "agenda": request.data.get("agenda", ""),
    }

    # Handle Recurrence
    if request.data.get("is_recurring"):
        meeting_data["recurrence"] = {
            "type": {
                "daily": 1,
                "weekly": 2,
                "monthly": 3
            }[request.data.get("recurrence_type", "weekly")],
            "repeat_interval": request.data.get("recurrence_interval", 1),
        }

    response = requests.post(
        f"https://api.zoom.us/v2/users/me/meetings",
        headers=headers,
        json=meeting_data,
    )

    if response.status_code == 201:
        meeting_info = response.json()
        
        meeting = Meeting.objects.create(
            topic=request.data.get("topic"),
            start_time=request.data.get("start_time"),
            duration=request.data.get("duration"),
            agenda=request.data.get("agenda"),
            created_by=request.user,
            zoom_meeting_id=meeting_info["id"],
            zoom_join_url=meeting_info["join_url"],  # Now valid
            zoom_start_url=meeting_info["start_url"],  # Now valid
            is_recurring=request.data.get("is_recurring", False),
            recurrence_type=request.data.get("recurrence_type"),
            recurrence_interval=request.data.get("recurrence_interval"),
        )
        return Response(MeetingSerializer(meeting).data, status=201)
    else:
        return Response(response.json(), status=response.status_code)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_meetings(request):
    """View all scheduled meetings"""
    meetings = Meeting.objects.all()
    return Response(MeetingSerializer(meetings, many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def join_meeting(request, meeting_id):
    """Join a scheduled Zoom meeting"""
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        return Response({"join_url": meeting.zoom_join_url}, status=200)
    except Meeting.DoesNotExist:
        return Response({'error': 'Meeting not found'}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@role_required(['tutor', 'admin'])
def reoccur_meeting(request, meeting_id):
    """Reoccur a scheduled meeting"""
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        new_meeting = Meeting.objects.create(
            topic=meeting.topic,
            start_time=meeting.start_time + datetime.timedelta(days=7),
            duration=meeting.duration,
            agenda=meeting.agenda,
            created_by=meeting.created_by,
            zoom_meeting_id=meeting.zoom_meeting_id,
            zoom_join_url=meeting.zoom_join_url,
            zoom_start_url=meeting.zoom_start_url,
            is_recurring=True,
            recurrence_type=meeting.recurrence_type,
            recurrence_interval=meeting.recurrence_interval,
        )
        return Response(MeetingSerializer(new_meeting).data, status=201)
    except Meeting.DoesNotExist:
        return Response({'error': 'Meeting not found'}, status=404)
