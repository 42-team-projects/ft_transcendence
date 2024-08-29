# Generated by Django 3.2.25 on 2024-08-28 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0028_message_is_read'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='conversation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.conversation'),
        ),
    ]