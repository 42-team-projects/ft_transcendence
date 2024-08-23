from django.db import models

# Create your models here.

class Member(models.Model):
    # id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    age = models.IntegerField()
    
    def __str__(self):
        return self.username
