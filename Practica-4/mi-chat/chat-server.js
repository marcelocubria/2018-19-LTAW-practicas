var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
  });

  //-- Detectar si se ha recibido un mensaje del cliente
   socket.on('new_message', msg => {

     //-- Notificarlo en la consola del servidor
     console.log("Mensaje recibido: " + msg)

     if (msg == '/help') {
       respuesta = "Lista de comandos: \n \/help: muestra esta lista de comandos"
       respuesta += "\n \/list: muestra la lista de usuarios activos \n"
       respuesta += "\/hello: el servidor te saluda \n \/date: fecha actual \n "
       socket.emit("respuesta_comando", respuesta)
     } else if (msg == /list) {
       socket.emit("respuesta_comando", 'prueba')
     } else if (msg == /hello) {
       socket.emit("respuesta_comando", 'prueba')
     } else if (msg == /date) {
       socket.emit("respuesta_comando", 'prueba')
     } else {
       io.emit('new_message', 'mensaje normal');
     }
   });
});

custom_id = 0;

io.engine.generateId = (req) => {
  return "custom:id:" + custom_id++; // custom id must be unique
}
