from rest_framework import serializers

from .models import QueueToken


class QueueTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = QueueToken
        fields = '__all__'

        read_only_fields = [
            'patient',
            'token_number',
            'status',
            'created_at'
        ]

    def validate(self, data):

        patient = data.get('patient')
        hospital = data.get('hospital')
        department = data.get('department')
        doctor = data.get('doctor')

        # Check department belongs to hospital
        if department.hospital_id != hospital.id:
            raise serializers.ValidationError({
                'department':
                    'This department does not belong to the selected hospital.'
            })

        # Check doctor belongs to department
        if doctor.department_id != department.id:
            raise serializers.ValidationError({
                'doctor':
                    'This doctor does not belong to the selected department.'
            })

        return data