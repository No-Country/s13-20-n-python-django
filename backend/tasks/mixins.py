from django.contrib.auth.mixins import LoginRequiredMixin


class FilterByUserMixin(LoginRequiredMixin):
    """
    This mixin filters the provided queryset with `self.request.user` in a `user_field`. `user_field` defaults to "user"
    """

    user_field = "user"

    def get_queryset(self, *args, **kwargs):
        return (
            super()
            .get_queryset(*args, **kwargs)
            .filter(**{self.user_field: self.request.user})
        )
