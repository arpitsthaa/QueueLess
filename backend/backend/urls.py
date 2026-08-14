from django.contrib import admin
from django.urls import path, include

from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/login/', obtain_auth_token),

    path('api/hospitals/', include('hospitals.urls')),

    path('api/doctors/', include('doctors.urls')),

    path('api/patients/', include('patients.urls')),

    path('api/queues/', include('queues.urls')),
]