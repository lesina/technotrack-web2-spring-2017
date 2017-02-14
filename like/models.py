from django.db import models
from core.models import Authored, Dated, Attached


class Like(Authored, Dated, Attached):
    class Meta:
        unique_together = (('author', 'content_type', 'object_id'),)