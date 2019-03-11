# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'main.html', {'user':'Obijuan'})

def pagina1(request):
    return render(request, 'pagina1.html', {})

def producto(request):
    return render(request, 'producto.html', {})
