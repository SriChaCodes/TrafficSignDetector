from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('predict-sign/', include('traffic_signs.urls')),  # Include the URLs from the traffic_signs app
]