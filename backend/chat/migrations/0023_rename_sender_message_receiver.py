# Generated by Django 3.2.25 on 2024-08-26 14:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0022_alter_conversation_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='sender',
            new_name='receiver',
        ),
    ]