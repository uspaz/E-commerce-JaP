document.addEventListener("DOMContentLoaded", function (e) { //Hago uso de la funcion perfilImg y luego guardo la foto y los datos del localStorage en sus respectivas variables para matener los campos con su información
  perfilImg();

  let img = document.getElementById('perfil-img');
  let perfil = JSON.parse(localStorage.getItem('user'));

  if(perfil != null && perfil.apellidos != undefined && perfil.correo != undefined && perfil.telefono != undefined){
    document.getElementById('camp1').value = perfil.dato;
    document.getElementById('camp2').value = perfil.apellidos;
    document.getElementById('camp3').value = perfil.contraseña;
    document.getElementById('camp4').value = perfil.edad;
    document.getElementById('camp5').value = perfil.correo;
    document.getElementById('camp6').value = perfil.telefono;
  }else{
    img.src = "img/userIcon.png";
  }
});
function perfilImg() { //Obtengo los datos del inicio de sesion y los utilizo para agregar la foto al apartado del perfil
  let avatar = JSON.parse(localStorage.getItem("user"));
  document.getElementById("perfil-img").src = avatar.imagen;
}

function editar(){ //Esta funcion activa los campos para que se les pueda ingresar la información
  document.getElementById('camp1').disabled = false;
  document.getElementById('camp2').disabled = false;
  document.getElementById('camp3').disabled = false;
  document.getElementById('camp4').disabled = false;
  document.getElementById('camp5').disabled = false;
  document.getElementById('camp6').disabled = false;
}

function savePerfil() { //Aquí obtenemos la imagen cargada y los datos agregados a cada campo para guardarlo en el localStorage y luego desactivar los campos
    let img = document.getElementById('perfil-img');
    let perfil = {};

    perfil.dato = document.getElementById('camp1').value;
    perfil.apellidos = document.getElementById('camp2').value;
    perfil.contraseña = md5(document.getElementById('camp3').value);
    perfil.edad = document.getElementById('camp4').value;
    perfil.correo = document.getElementById('camp5').value;
    perfil.telefono = document.getElementById('camp6').value;
    perfil.imagen = img.src;

    localStorage.setItem('user', JSON.stringify(perfil));
    document.getElementById('camp1').disabled = true;
    document.getElementById('camp2').disabled = true;
    document.getElementById('camp3').disabled = true;
    document.getElementById('camp4').disabled = true;
    document.getElementById('camp5').disabled = true;
    document.getElementById('camp6').disabled = true;
}

document.addEventListener("click", "#photo", function(){ // Esta función sirve para que al dar click en cualquier lugar del apartado "agrega tu foto" aparezca la ventana emergente para agregar la imagen deseada
  $("#add-photo").click();
});

function vistaPrevia() { // Obtenemos la foto que esta ya antes cargada, luego de seleccionar la nueva y estar cargarse se muestra en la vista previa de la foto del perfil para luego reemplazarla
    let preview = document.getElementById('perfil-img');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      document.getElementById('perfil-img').innerHTML= reader.result;

    }
    if (file) {
      reader.readAsDataURL(file);
    }
    else {
      preview.src = "img/userIcon.png";
    }
  }
