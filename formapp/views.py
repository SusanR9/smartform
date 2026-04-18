from django.shortcuts import render # type: ignore
from django.http import JsonResponse # type: ignore
from .models import UserForm
import json

def form_page(request):
    return render(request, 'form.html')


def submit_form(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get('email')

        # Duplicate check
        if UserForm.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        UserForm.objects.create(
            name=data.get('name'),
            email=email,
            password=data.get('password')
        )

        return JsonResponse({'message': 'Success'})