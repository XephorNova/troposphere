# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-09-22 22:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_maintenancenotice_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitemetadata',
            name='site_footer_link',
            field=models.CharField(default=b'http://user.cyverse.org/', help_text=b'Hyperlink in footer to host installation organization or product page.', max_length=254),
        ),
    ]
