# Generated by Django 4.2.13 on 2024-08-30 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, default='avatars/default.png', null=True, upload_to='avatars/'),
        ),
    ]
