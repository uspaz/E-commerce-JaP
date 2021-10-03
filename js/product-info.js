let info = [];
let comments = [];

async function getInfoP() { //Tomo el JSON de la informacion del auto y lo guardo en una variable para luego utilizarla
    const info = await getJSONData(PRODUCT_INFO_URL);
    return info;
}
async function getInfoC() {
  const comments = await getJSONData(PRODUCT_INFO_COMMENTS_URL);//Tomo el JSON de los comentarios y lo guardo en una variable para luego utilizarla
  return comments;
}
document.addEventListener("DOMContentLoaded", async function (e) { // Utilizo las variables antes guardadas en el JSON para mostrar la información del auto, imagenes y los comentarios
  response = await getInfoP();
  info = response.data;
  showFeatures(info);
  showImages(info);
  showRelatedProducts(info);

  res = await getInfoC();
  comments = res.data;
  showComments(comments);
});
function showFeatures(producto){ //Mostrar la información del auto

   let htmlContentToAppend = "";
   htmlContentToAppend += agregarPropiedades(producto);
   document.getElementById("info").innerHTML = htmlContentToAppend;
}
function agregarPropiedades(producto){ //Codigo de como se van a mostrar la información
 return `
  <div class="list-group-item">
      <h3 class="text-center"> ${producto.category}</h3>
      <hr><br>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src=" ${producto.images[0]}" alt="">
          </div>
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1"> ${producto.name} - ${producto.currency} ${producto.cost}</h4>
          </div><br>
          <p class="">${producto.soldCount} ventas realizadas</p><br>
          <p class="mb-3">${producto.description} </p>
        </div>
      </div>
    </div>
  </div><br>`;
}

function showImages(producto){ //Mostrar las imagenes del auto

    let htmlContentToAppend = "";
    htmlContentToAppend += agregarImagenes(producto)
    document.getElementById("imagenes").innerHTML = htmlContentToAppend;
}

function agregarImagenes(producto){ //Codigo de como se van a mostrar las imagenes
  return `
  <div class="carousel-item active">
      <img src="${producto.images[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${producto.images[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${producto.images[3]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${producto.images[4]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>`;
}
function showRelatedProducts(producto){ //Muestro los productos relacionados
  let htmlContentToAppend = "";
  htmlContentToAppend += productosRelacionados(producto)
  document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}
function productosRelacionados(producto){ //Codigo de como sevan a mostrar los productos relacionados
  return `
  <div class="row">
    <div class="col-lg-3 col-md-4 col-6">
      <div class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="img/prod2.jpg"  alt="">
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <div class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="img/prod3.jpg"  alt="">
      </div>
    </div>
  </div>`
}

function showComments(producto){ //Mostrar los comentarios del auto con su respectiva calificación
  let htmlContentToAppend = "";
  for(let i = 0; i < producto.length; i++){
      let comentario = producto[i];
      htmlContentToAppend += agregarComentarios(comentario)
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}
function agregarComentarios(comentario) { //Codigo de como se van a mostrar los comentarios
  return `
  <div class="list-group-item">
    <div class="col-12">
      <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1"> ${comentario.user}</h4>
        <h6 class="float-right "> Calificación: `+ placeEmojis(comentario.score) +` </h6>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1">${comentario.description} </h6>
      </div><br>
      <div class="d-flex w-100 justify-content-between">
        <small>Fecha: ${comentario.dateTime}</small>
      </div>
    </div>
  </div><br>`
}
function placeEmojis(n){//Agrega los emoji como metodo de calificación
  let estrellas = "";
  for (i = 1; i <= 5; i++){
    if (n == 1 ){
      estrellas = '<i class="fas fa-angry r"></i> <i class="far fa-frown"></i> <i class="far fa-meh"></i> <i class="far fa-smile "></i> <i class="far fa-grin-beam "></i>';
    }else if (n == 2) {
      estrellas ='<i class="fas fa-angry r"></i> <i class="fas fa-frown n"></i> <i class="far fa-meh"></i> <i class="far fa-smile "></i> <i class="far fa-grin-beam "></i>';
    }else if (n == 3) {
      estrellas ='<i class="fas fa-angry r"></i> <i class="fas fa-frown n"></i> <i class="fas fa-meh a"></i> <i class="far fa-smile "></i> <i class="far fa-grin-beam "></i>';
    }else if (n == 4) {
      estrellas ='<i class="fas fa-angry r"></i> <i class="fas fa-frown n"></i> <i class="fas fa-meh a"></i> <i class="fas fa-smile s"></i> <i class="far fa-grin-beam "></i>';
    }else if (n == 5) {
      estrellas ='<i class="fas fa-angry r"></i> <i class="fas fa-frown n"></i> <i class="fas fa-meh a"></i> <i class="fas fa-smile s"></i> <i class="fas fa-grin-beam v"></i>';
    }
  }
  return estrellas;
}

function verificarComment () {//Coloca alertas si el nombre y apellido no estan separados por un guion bajo o si el campo no fue completado, también al realizarse el comentario
  let nombre  = document.getElementById("nameComment").value;
  let guion = "_"
  if (nombre == "" || !nombre.includes(guion)) {
      Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Escriba el nombre y apellido (separados por un "_")',
      showConfirmButton: true,
      })
  }else {
    Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu comentario se ha enviado con exito',
    timer: 1000,
    showConfirmButton: false,
    });

    document.getElementById("nameComment").value = "";
    document.getElementById("textComment").value = "";
  }
}
