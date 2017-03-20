# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-14 01:59
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friendship', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='friendship',
            name='author',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='автор'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='friendship',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='дата создания'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='friendship',
            name='friend',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='friends', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='friendship',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='дата изменения'),
        ),
        migrations.AlterUniqueTogether(
            name='friendship',
            unique_together=set([]),
        ),
        migrations.AlterUniqueTogether(
            name='friendshiprequest',
            unique_together=set([('initiator', 'recipient')]),
        ),
        migrations.RemoveField(
            model_name='friendship',
            name='first',
        ),
        migrations.RemoveField(
            model_name='friendship',
            name='second',
        ),
    ]
