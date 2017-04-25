from celery import task
from .models import Event
from django.contrib.contenttypes.models import ContentType


@task(bind=True, default_retry_delay=10)
def event_creator(self, obj_id, obj_ct):
    try:
        type = ContentType.objects.get_for_id(obj_ct)
        instance = type.get_object_for_this_type(pk=obj_id)
        Event.objects.create(content_object=instance, author=instance.get_author(), title=instance.get_description())
    except Exception as exc:
        raise self.retry(exc=exc)