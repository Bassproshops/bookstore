from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser

class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user