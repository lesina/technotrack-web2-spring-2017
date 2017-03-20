from __future__ import unicode_literals

from django.apps import AppConfig


class UgcConfig(AppConfig):
    name = 'ugc'

    def ready(self):
        import ugc.signals
        import ugc.api