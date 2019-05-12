var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...");


http.createServer((req, res) => {
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

  switch (tipofichero) {

    case "html":

      var cookie = req.headers.cookie;
      console.log("Cookie: " + cookie);

      if (q.pathname == "/" && req.method === 'POST') {

        content = '';

        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            content += data;
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            res.statusCode = 200;
         });

         req.on('end', ()=> {
           res.setHeader('Set-Cookie', content);
           cookie += content + ";";
         });
      } else if (q.pathname == "/comprar.html" && req.method === 'POST') {
        content = '';

        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            content += data;
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            res.statusCode = 200;
         });

         req.on('end', ()=> {
           datos += content;
           console.log(datos);
         });
      }

      fs.readFile(peticion, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found, Fichero no encontrado");
      }
      htmlstring = data.toString();
      //manejo cookie
      if (!cookie) {
        htmlstring2 = htmlstring.replace("Bienvenido,", "Bienvenido, usuario no registrado")
      } else {
        indexuser = cookie.lastIndexOf('Nombre=');
        finaluser = cookie.indexOf(';', indexuser);
        indexcarro = cookie.lastIndexOf('Carro=');
        usuario = cookie.slice(indexuser+7, finaluser);
        htmlstring2 = htmlstring.replace("Bienvenido,", "Bienvenido, " + usuario);
      }
      if (q.pathname == '/carrito.html') {
        if (cookie.indexOf('re2') != -1) {
          htmlstring2 = htmlstring2.replace("<!-- 1", '');
          htmlstring2 = htmlstring2.replace("1 -->", '');
        }
        if (cookie.indexOf('me') != -1) {
          htmlstring2 = htmlstring2.replace("<!-- 2", '');
          htmlstring2 = htmlstring2.replace("2 -->", '');
        }
        if (cookie.indexOf('anthem') != -1) {
          htmlstring2 = htmlstring2.replace("<!-- 3", '');
          htmlstring2 = htmlstring2.replace("3 -->", '');
        }
      }

      mime = "text/html";
      res.writeHead(200, {'Content-Type': mime});
      res.write(htmlstring2);
      return res.end();
      });
    break;

    case "jpg":
    case "png":
    case "css":
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
        res.writeHead(200, {'Content-Type': mime});
        res.write(data);
        return res.end();
      });
    break;
  }

  console.log("Peticion atendida");
  console.log("");
}).listen(8080);
