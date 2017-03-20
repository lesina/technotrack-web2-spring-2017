from __future__ import unicode_literals

from django.apps import AppConfig


class LikeConfig(AppConfig):
    name = 'like'

    def ready(self):
        import like.signals
        import like.api