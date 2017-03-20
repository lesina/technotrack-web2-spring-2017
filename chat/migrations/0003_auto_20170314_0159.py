# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-14 01:59
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0002_userchat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='title',
            field=models.CharField(default=None, max_length=128, verbose_name='заголовок'),
        ),
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(max_length=1024, verbose_name='сообщение'),
        ),
        migrations.AlterUniqueTogether(
            name='userchat',
            unique_together=set([('user', 'chat')]),
        ),
    ]
