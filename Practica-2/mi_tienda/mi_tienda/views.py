from django.http import HttpResponse
from django.template import Template, Context

def mi_funcion(request):
    html = "Hola que tal"
    return HttpResponse(html)

def mi_producto(request, param):
    numero = int(param)
    html = "acceso al producto: %i" % numero;
    return HttpResponse(html)

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
