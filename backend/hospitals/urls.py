from django.urls import path
from .views import (
    HospitalListCreateView,
    HospitalDetailView,
    DepartmentListCreateView,
    DepartmentDetailView,
)

urlpatterns = [
    path('', HospitalListCreateView.as_view()),
    path('<int:pk>/', HospitalDetailView.as_view()),

    path('departments/', DepartmentListCreateView.as_view()),
    path('departments/<int:pk>/', DepartmentDetailView.as_view()),
]