from django.contrib import admin # type: ignore
from .models import UserForm

admin.site.register(UserForm)