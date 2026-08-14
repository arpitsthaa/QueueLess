from django.db import models
from django.contrib.auth.models import User


class Patient(models.Model):

    user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name='patient',
    null=True,
    blank=True
)
    
    name = models.CharField(max_length=200)

    phone = models.CharField(max_length=15)

    age = models.IntegerField()

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES
    )

    def __str__(self):
        return self.name