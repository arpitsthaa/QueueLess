from django.db import models


class Hospital(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Department(models.Model):
    hospital = models.ForeignKey(
        Hospital,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name