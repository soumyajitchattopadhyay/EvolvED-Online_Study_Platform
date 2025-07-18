from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StudyGroup
from .serializers import StudyGroupSerializer
from users.decorators import role_required

@api_view(['POST'])
@role_required(['admin', 'tutor'])
def create_group(request):
    group = StudyGroup.objects.create(
        name=request.data['name'],
        description=request.data['description'],
        created_by=request.user
    )
    return Response(StudyGroupSerializer(group).data)

@api_view(['GET'])
def view_groups(request):
    groups = StudyGroup.objects.all()
    return Response(StudyGroupSerializer(groups, many=True).data)

@api_view(['POST'])
@role_required(['admin', 'tutor', 'student'])
def join_group(request, group_id):
    group = StudyGroup.objects.get(id=group_id)
    group.members.add(request.user)
    return Response({'message': 'Successfully joined the group'})