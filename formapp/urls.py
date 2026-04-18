from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('', views.form_page),
    path('submit/', views.submit_form),
]