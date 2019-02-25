from django.http import HttpResponse
from django.template import Template, Context
from django.shortcuts import render

def mi_funcion(request):
    html = "Hola que tal"
    return HttpResponse(html)

def mi_producto(request, param):
    numero = int(param)
    html = "acceso al producto: %i" % numero;
    return HttpResponse(html)

def principal(request):
    html = open('mi_tienda/pagina1.html')
    return HttpResponse(html)

def damecss(request):
    html = open('mi_tienda/styles.css')
    return HttpResponse(html)

from django.http import HttpResponse
from django.template import Template, Context

def index(request):
    return render(request, 'main.html', {'user':'Obijuan'})

def re(request):
    return render(request, 'pagina2.html', {'titulo':'Resident Evil 2 Remake', 'portada':'/static/templates/images/re2.png'})

PLANTILLA = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Saludo</title>
  </head>
  <body>

    <p>Bienvenido a mi tienda, {{user}}</p>

  </body>
</html>
"""

def saludo(request):
    t = Template(PLANTILLA)
    c = Context({'user': 'pepe'})

    html = t.render(c)
    return HttpResponse(html)
