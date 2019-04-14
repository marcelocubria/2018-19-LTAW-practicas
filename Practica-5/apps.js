const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function main() {
  console.log("Hola!!!!-------------")

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")
  var nombre = document.getElementById("nombre")

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', nombre.value + ': ' + msg.value);
    document.getElementById("msg").value = '';

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    console.log("me llega un mensaje")
    para = document.createElement("p");
    para.innerHTML = msg;

    display = document.getElementById("display");
    child = display.firstChild;
    display.insertBefore(para,child);
    //display.innerHTML = msg + '</br>' + display.innerHTML;
  });

  socket.on('server_message', msg => {
    para = document.createElement("p");
    para.innerHTML = msg;
    para.className = "res_comando";

    display = document.getElementById("display");
    child = display.firstChild;
    display.insertBefore(para,child);
  });

}
