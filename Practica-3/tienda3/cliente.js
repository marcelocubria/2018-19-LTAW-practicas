function main()
{

  var buscar = document.getElementById('buscar')
  var res_buscar = document.getElementById('res_buscar');

  buscar.onkeypress = ()=>{

    //-- Crear objeto para hacer peticiones AJAX
    m = new XMLHttpRequest();

    //-- Configurar la petición
    m.open("GET","http://localhost:8080/busqueda?texto=" + buscar.value, true);

    //-- Cuando la haya alguna noticia sobre la peticion
    //-- ejecuta este código
    m.onreadystatechange=function(){
       //-- Petición enviada y recibida. Todo OK!
       if (m.readyState==4 && m.status==200){

         //-- La respuesta es un objeto JSON
         var o = JSON.parse(m.responseText)

         //-- Borrar el resultado anterior que hubiese en el párrafo
         //-- de resultado
         resultado.innerHTML = "";

         //--Recorrer los productos del objeto JSON
         for (i=0; i < o.productos.length; i++) {

           //-- Añadir cada producto al párrafo de visualización
           resultado.innerHTML += o.productos[i];

           //-- Separamos los productos por ',''
           if (i<o.productos.length-1) {
             resultado.innerHTML += ', ';
           }
         }
       }
     }

     //-- Enviar la petición!
     m.send();
  }

}
