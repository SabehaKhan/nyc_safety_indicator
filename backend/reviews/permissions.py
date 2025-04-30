from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of a review to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are GET, HEAD, and OPTIONS (read-only access)
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Write permissions are only allowed to the owner of the review
        return obj.user == request.user