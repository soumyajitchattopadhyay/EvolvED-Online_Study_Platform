from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Discussion, Reply
from .serializers import DiscussionSerializer, ReplySerializer
from users.decorators import role_required
from groups.models import StudyGroup

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'student', 'tutor'])
def create_discussion(request):
    """ Allow students and tutors to create discussions. """
    data = request.data
    try:
        group = StudyGroup.objects.get(id=data['group_id'])

        discussion = Discussion.objects.create(
            title=data['title'],
            content=data['content'],
            created_by=request.user,
            group=group  # Assign the actual group instance, not just `group_id`
        )
        return Response(DiscussionSerializer(discussion).data, status=status.HTTP_201_CREATED)
    
    except StudyGroup.DoesNotExist:
        return Response({"error": "Invalid group ID. Group not found."}, status=status.HTTP_400_BAD_REQUEST)
    except KeyError:
        return Response({"error": "Missing required fields. Ensure 'title', 'content', and 'group_id' are provided."},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_discussions(request):
    user = request.user
    discussions = Discussion.objects.all()  
    serializer = DiscussionSerializer(discussions, many=True)
    return Response(serializer.data)  

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'student', 'tutor'])
def reply_to_discussion(request, discussion_id):
    """ Allow users to reply to discussions. """
    try:
        discussion = Discussion.objects.get(id=discussion_id)
        reply = Reply.objects.create(
            discussion=discussion,
            user=request.user,
            content=request.data['content']
        )
        return Response(ReplySerializer(reply).data, status=status.HTTP_201_CREATED)
    except Discussion.DoesNotExist:
        return Response({'error': 'Discussion not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'tutor'])
def moderate_discussion(request, discussion_id):
    """ Allow tutors to mark discussions as moderated. """
    try:
        discussion = Discussion.objects.get(id=discussion_id)
        discussion.is_moderated = True
        discussion.save()
        return Response({'message': 'Discussion moderated'}, status=status.HTTP_200_OK)
    except Discussion.DoesNotExist:
        return Response({'error': 'Discussion not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'tutor'])
def moderate_reply(request, reply_id):
    """ Allow tutors to approve or reject replies. """
    try:
        reply = Reply.objects.get(id=reply_id)
        reply.is_approved = request.data.get('is_approved', True)
        reply.save()
        return Response({'message': 'Reply moderated'}, status=status.HTTP_200_OK)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=status.HTTP_404_NOT_FOUND)
