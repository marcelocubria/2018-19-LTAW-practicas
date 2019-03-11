var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...");


http.createServer(function (req, res) {
  //-- Mostrar en la consola el recurso al que se accede
  var q = url.parse(req.url, true);
  var peticion = q.pathname;
  var tipofichero = peticion.split(".")[1];
  if (peticion == "/") {
    peticion = "./pagina1.html";
    tipofichero = "html"
  } else {
    peticion = "." + peticion;
  }
  console.log(peticion);
  console.log(tipofichero);

  //-- Leer las cookies
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  fs.readFile(peticion, function(err, data) {

    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found, Fichero no encontrado");
    }
    mime = "text/html";
    if (tipofichero == ("jpg" || "png")) {
      mime = "image/" + tipofichero;
    } else if (tipofichero == "css") {
      mime = "text/css";
    }

    //manejo cookie
    if (!cookie) {
      data.replace("Bienvenido,", "Bienvenido, usuario no registrado")
    } else {
      data.replace("Bienvenido,", "Bienvenido, " + cookie);
    }
    
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
  console.log("Peticion atendida");
}).listen(8080);
