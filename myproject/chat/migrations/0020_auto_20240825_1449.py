# Generated by Django 3.2.25 on 2024-08-25 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0019_rename_type_conversation_chat_or_group'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conversation',
            name='chat_or_group',
        ),
        migrations.AddField(
            model_name='conversation',
            name='typee',
            field=models.CharField(choices=[('chat', 'Chat'), ('group', 'Group')], default=1, max_length=5),
            preserve_default=False,
        ),
    ]
