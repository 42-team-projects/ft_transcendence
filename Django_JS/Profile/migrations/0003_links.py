# Generated by Django 5.0.6 on 2024-07-23 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_user_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Links',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('url', models.URLField()),
            ],
        ),
    ]