# Generated by Django 4.2.13 on 2024-08-29 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0007_rename_userprofile_player_delete_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to='covers/'),
        ),
    ]
