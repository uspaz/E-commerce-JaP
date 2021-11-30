const CATEGORIES_URL = "http://localhost:3000/categories";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "http://localhost:3000/products";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comments";
const CART_INFO_URL= "http://localhost:3000/cart";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function Persona(){ //Obtiene los datos del input para guardarlos en el localStorage
  let perfil = { dato: document.getElementById('user').value};
  perfil.imagen = "img/userIcon.png";
  let perfil_json = JSON.stringify(perfil);
  localStorage.setItem("user", perfil_json);
}
function recuperar(){ //
  if (localStorage.getItem("user")) { //Pasa los datos que estan en el localStorage a string y los muestra
    perfil_json = localStorage.getItem("user");
    perfil = JSON.parse(perfil_json);
    document.getElementById("dropdownMenuButton1").innerHTML = `<img src=${perfil.imagen} height="29px;" width="29px;" style="border-radius: 100px; margin: auto;"> ${perfil.dato}`;
  } else {
    document.getElementById("dropdownMenuButton1").innerHTML = `No hay datos almacenados`;
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", ()=>{
  recuperar();
});


const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.menu');

navToggle.addEventListener("click", ()=>{
  navMenu.classList.toggle("menu-visible");
});
