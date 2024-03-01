from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is the owner of the object with `user_field`. Otherwise it only allows safe methods. `user_field` defaults to "user"
    """

    user_field = "user"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return obj[self.user_field] == request.user


class BoardUserIsProjectOwnerOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is the owner of the project. `user_field` defaults to "user"
    """

    user_field = "user"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return obj.project.owner == request.user
