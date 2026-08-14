from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import QueueToken
from .serializers import QueueTokenSerializer


class QueueTokenListCreateView(generics.ListCreateAPIView):

    queryset = QueueToken.objects.all()
    serializer_class = QueueTokenSerializer

    def perform_create(self, serializer):

        today = timezone.localdate()

        patient = self.request.user.patient

        last_token = QueueToken.objects.filter(
            hospital=serializer.validated_data['hospital'],
            department=serializer.validated_data['department'],
            created_at__date=today
        ).order_by('-token_number').first()

        if last_token:
            next_token = last_token.token_number + 1
        else:
            next_token = 1

        serializer.save(
            patient=patient,
            token_number=next_token
        )

class QueueTokenDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = QueueToken.objects.all()
    serializer_class = QueueTokenSerializer


class CurrentQueueView(APIView):

    def get(self, request):

        hospital_id = request.query_params.get('hospital')
        department_id = request.query_params.get('department')

        if not hospital_id:
            return Response({
                'error': 'hospital parameter is required.'
            }, status=400)

        if not department_id:
            return Response({
                'error': 'department parameter is required.'
            }, status=400)

        try:
            hospital_id = int(hospital_id)
            department_id = int(department_id)
        except ValueError:
            return Response({
                'error': 'hospital and department must be numbers.'
            }, status=400)

        today = timezone.localdate()

        serving_token = QueueToken.objects.filter(
            hospital_id=hospital_id,
            department_id=department_id,
            created_at__date=today,
            status='SERVING'
        ).first()

        waiting_tokens = QueueToken.objects.filter(
            hospital_id=hospital_id,
            department_id=department_id,
            created_at__date=today,
            status='WAITING'
        ).order_by('token_number')

        current_token = (
            serving_token.token_number
            if serving_token
            else 0
        )

        return Response({
            'current_token': current_token,
            'waiting_tokens': [
                token.token_number
                for token in waiting_tokens
            ],
            'total_waiting': waiting_tokens.count()
        })

class CallNextPatientView(APIView):

    def post(self, request):

        hospital_id = request.query_params.get('hospital')
        department_id = request.query_params.get('department')

        if not hospital_id:
            return Response({
                'error': 'hospital parameter is required.'
            }, status=400)

        if not department_id:
            return Response({
                'error': 'department parameter is required.'
            }, status=400)

        try:
            hospital_id = int(hospital_id)
            department_id = int(department_id)
        except ValueError:
            return Response({
                'error': 'hospital and department must be numbers.'
            }, status=400)

        today = timezone.localdate()

        current_token = QueueToken.objects.filter(
            hospital_id=hospital_id,
            department_id=department_id,
            created_at__date=today,
            status='SERVING'
        ).first()

        if current_token:
            return Response({
                'error': 'A patient is already being served.',
                'current_token': current_token.token_number
            }, status=400)

        next_token = QueueToken.objects.filter(
            hospital_id=hospital_id,
            department_id=department_id,
            created_at__date=today,
            status='WAITING'
        ).order_by('token_number').first()

        if not next_token:
            return Response({
                'message': 'No patients are waiting.'
            }, status=404)

        next_token.status = 'SERVING'
        next_token.save()

        return Response({
            'message': 'Patient called successfully.',
            'token_number': next_token.token_number,
            'status': next_token.status
        })


class CompletePatientView(APIView):

    def post(self, request, pk):

        try:
            token = QueueToken.objects.get(pk=pk)
        except QueueToken.DoesNotExist:
            return Response({
                'error': 'Queue token not found.'
            }, status=404)

        if token.status != 'SERVING':
            return Response({
                'error': 'Only a serving patient can be completed.'
            }, status=400)

        token.status = 'COMPLETED'
        token.save()

        return Response({
            'message': 'Patient visit completed.',
            'token_number': token.token_number,
            'status': token.status
        })