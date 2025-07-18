from django.urls import path
from .views import create_group, view_groups, join_group

urlpatterns = [
    path('create/', create_group, name="create_group"),
    path('view/', view_groups, name="view_groups"),
    path('join/<int:group_id>/', join_group, name="join_group"),
]
