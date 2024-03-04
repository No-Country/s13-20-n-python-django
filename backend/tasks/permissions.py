from rest_framework import permissions


class ProjectIsOwnerOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is the owner of a Project object. Otherwise it only allows safe methods.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return obj.owner == request.user


class BoardUserIsProjectOwnerOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is the owner of the project.
    """

    user_field = "user"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return obj.project.owner == request.user


class ListUserIsProjectMemberOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is a member of the of the project for lists.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return (
            obj.board.project.member == request.user
            or obj.board.project.owner == request.user
        )


class TaskUserIsProjectMemberOrReadOnly(permissions.BasePermission):
    """
    This permission checks if the request user is a member of the of the project for tasks.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the blog.
        return (
            obj.list.board.project.member == request.user
            or obj.list.board.project.owner == request.user
        )
