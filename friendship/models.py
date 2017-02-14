from django.db import models
from core.models import User


class Friendship(models.Model):
    initiator = models.ForeignKey(User, blank=False, related_name='initiator')
    recipient = models.ForeignKey(User, blank=False, related_name='recipient')
    approved = models.BooleanField(default=False)


class Friends(models.Model):
    first = models.ForeignKey(User, blank=False, related_name='first')
    second = models.ForeignKey(User, blank=False, related_name='second')

    class Meta:
        verbose_name = u'Friends'
        verbose_name_plural = u'Friends'