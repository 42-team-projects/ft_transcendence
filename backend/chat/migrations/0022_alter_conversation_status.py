# Generated by Django 3.2.25 on 2024-08-25 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0021_rename_typee_conversation_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='status',
            field=models.CharField(choices=[('C', 'Chat'), ('G', 'Group')], max_length=1),
        ),
    ]
