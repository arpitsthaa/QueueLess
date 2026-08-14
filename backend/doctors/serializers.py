from rest_framework import serializers
from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = '__all__'

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Doctor name cannot be empty."
            )

        if len(value) < 2:
            raise serializers.ValidationError(
                "Doctor name must contain at least 2 characters."
            )

        return value

    def validate_specialization(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Specialization cannot be empty."
            )

        return value