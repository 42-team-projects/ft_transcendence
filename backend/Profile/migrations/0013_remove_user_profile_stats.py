# Generated by Django 5.0.6 on 2024-07-23 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0012_user_profile_stats'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_profile',
            name='stats',
        ),
    ]