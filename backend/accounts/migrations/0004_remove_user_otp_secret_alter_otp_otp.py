# Generated by Django 4.2.13 on 2024-06-30 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_otp_secret_alter_otp_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='otp_secret',
        ),
        migrations.AlterField(
            model_name='otp',
            name='otp',
            field=models.IntegerField(),
        ),
    ]
