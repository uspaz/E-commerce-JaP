function verificar(){ //Verificar si se escribe algo en los input en el login
  let usu = document.getElementById('user');
  let contr = document.getElementById('key');
  if (usu.value.trim() === "" || contr.value.trim() === ""){

    Swal.fire({ //Muestra una alerta si no fueron completado los input
      title: "Bienvenido!",
      text: "Por favor complete todos los campos",
      icon: "warning",
      confirmButtonText: "Entiendo"
    });
  }else {
    location.href ="inicio.html"; //Envia a la pagina principal
    Persona(); 
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
