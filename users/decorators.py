from functools import wraps
from rest_framework.response import Response

def role_required(allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if request.user.role not in allowed_roles:
                return Response({'error': 'Permission Denied'}, status=403)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
