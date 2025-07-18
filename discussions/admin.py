from django.contrib import admin
from .models import Discussion, Reply 

@admin.register(Discussion)
class DiscussionAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'group', 'created_at', 'is_moderated')
    list_filter = ('group', 'is_moderated', 'created_at')
    search_fields = ('title', 'content', 'created_by__email')
    ordering = ('-created_at',)
    list_editable = ('is_moderated',)

@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ('user', 'discussion', 'created_at', 'is_approved')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('user__email', 'content', 'discussion__title')
    ordering = ('-created_at',)
    list_editable = ('is_approved',)
