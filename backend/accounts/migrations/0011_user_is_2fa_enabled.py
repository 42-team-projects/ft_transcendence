# Generated by Django 4.2.13 on 2024-07-31 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_user_totp_secret_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_2fa_enabled',
            field=models.BooleanField(default=False),
        ),
    ]