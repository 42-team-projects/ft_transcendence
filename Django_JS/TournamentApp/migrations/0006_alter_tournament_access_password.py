# Generated by Django 3.2.25 on 2024-08-13 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TournamentApp', '0005_remove_tournament_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tournament',
            name='access_password',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]