var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usuarios = [];

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

app.get('/styles.css', function(req, res){
  res.sendFile(__dirname + '/styles.css');
  console.log('Fichero css solicitado');
})

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  socket.broadcast.emit('server_message', 'Se ha conectado un nuevo usuario!');
  socket.emit("server_message", 'Bienvenido');
  usuarios.push(socket.id);
  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    socket.broadcast.emit('server_message', 'Se ha desconectado un usuario!');
  });

  //-- Detectar si se ha recibido un mensaje del cliente
   socket.on('new_message', msg => {

     //-- Notificarlo en la consola del servidor
     console.log("Mensaje recibido: " + msg)

     if (msg.slice(-5) == '/help') {
       respuesta = "Lista de comandos: <br> /help: muestra esta lista de comandos"
       respuesta += "<br> /list: muestra la lista de usuarios activos <br>"
       respuesta += "/hello: el servidor te saluda <br> /date: fecha actual"
       socket.emit("server_message", respuesta)
     } else if (msg.slice(-5) == '/list') {
       socket.emit("server_message", usuarios)
     } else if (msg.slice(-6) == '/hello') {
       socket.emit("server_message", 'Buenos días, usuario')
     } else if (msg.slice(-5) == '/date') {
       socket.emit("server_message", 'La hora actual es ' + new Date())
     } else {
       io.emit('new_message', msg);
     }
   });
});
