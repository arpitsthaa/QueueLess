from django.urls import path

from .views import (
    QueueTokenListCreateView,
    QueueTokenDetailView,
    CurrentQueueView,
    CallNextPatientView,
    CompletePatientView,
)


urlpatterns = [
    path('', QueueTokenListCreateView.as_view()),

    path(
        'current/',
        CurrentQueueView.as_view()
    ),

    path(
        '<int:pk>/',
        QueueTokenDetailView.as_view()
    ),
    path(
    'call-next/',
    CallNextPatientView.as_view()
    ),
    path(
    'complete/<int:pk>/',
    CompletePatientView.as_view()
    ),
]