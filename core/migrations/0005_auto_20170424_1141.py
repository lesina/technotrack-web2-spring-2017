# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-24 11:41
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20170424_1032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountvalidation',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, unique=True),
        ),
    ]
