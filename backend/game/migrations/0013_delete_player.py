# Generated by Django 4.2.13 on 2024-09-01 18:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tournament', '0002_alter_tournament_owner_alter_tournament_players'),
        ('game', '0012_remove_player_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Player',
        ),
    ]
