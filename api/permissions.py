from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # All permissions are only allowed to the owner of the snippet.
        print(obj.owner)
        return obj.owner == request.user
