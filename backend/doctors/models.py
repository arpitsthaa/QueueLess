from django.db import models
from hospitals.models import Department


class Doctor(models.Model):
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200)

    def __str__(self):
        return self.name