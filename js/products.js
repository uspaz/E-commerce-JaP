var productsArray = [];
var sort = 1;
var browse = "";
var lowPrice = 0;
var maxPrice = undefined;
var listProducts = [];

async function getAutosData() { //Tomo el JSON y lo guardo en una variable para luego utilizarla
    const productsArray = await getJSONData(PRODUCTS_URL);
    return productsArray;
}
document.addEventListener("DOMContentLoaded", async function (e) { // Utilizo la variable antes guardada con el JSON para mostrar la lista
  response = await getAutosData();
  productsArray = response.data;
  showProductsList(productsArray);
});

function sortProducts (shape, array) { //Esta función ordena los productos por precio y relevancia
  let result = [];
  if (shape === 1){
    result = array.sort((a, b)=>{
      if(a.cost > b.cost){
        return -1;
      }else if (a.cost < b.cost){
        return 1;
      }else {
        return 0;
      }
    });
  }else if (shape === 2){
    result = array.sort((a, b)=>{
      if(a.cost < b.cost){
        return -1;
      }else if (a.cost > b.cost){
        return 1;
      }else {
        return 0;
      }
    });
  }else if (shape === 3) {
    result = array.sort((a, b)=>{
      let amount = parseInt(a.soldCount);
      let quantity = parseInt(b.soldCount);

      if (amount > quantity){
        return -1;
      }else if (amount < quantity){
        return 1;
      }else {
        return 0;
      }
    });
  }
  return result;
}
function Filtrado(productsArray) {
  let autosFiltrados = [];
   for (let i = 0; i < productsArray.length; i++) {
       const car = productsArray[i];
       if (car.cost >= lowPrice && (maxPrice != null && car.cost <= maxPrice || maxPrice == null) && car.name.toLowerCase().includes(browse)) {
           autosFiltrados.push(car)
       }
   }
   autosFiltrados = sortProducts(sort, autosFiltrados)
   showProductsList(autosFiltrados);
}

function showProductsList(array){ //Funcion para mostrar los productos

  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
      let product = array[i];

    htmlContentToAppend += carsHtml(product);
  }
  document.getElementById("productos").innerHTML = htmlContentToAppend;
}

function carsHtml(product) { //Creamos el html que vamos agregar en la página
  return `
  <div class="col-md-4">
    <a class="card mb-4 shadow-sm custom-card" href="product-info.html">
      <div class="bd-placeholder-img card-img-top">
        <img src=" ${product.imgSrc} " alt=" ${product.description}" class="img-thumbnail">
      </div>
      <div class="col">
        <div class="">
          <h4 class="m-3"> ${product.name} </h4>
          <div>
            <p class="text-muted" style="font-size: 16px;">${product.description}</p>
            <small class="text-muted" style="font-size: 16px">  ${product.soldCount} ventas realizadas</small>
          </div>
        </div>
        <h5 class="text-muted text float-right"> ${product.currency}${product.cost}</h5>
      </div>
    </a>
   </div>
 `;
}

function sortAndshowProducts(sort, listProducts) { //Función para mostrar los productos ordenados
  byPrice = sort;
  if (listProducts != undefined) {
    productsArray = listProducts;
  }
  productsArray = sortProducts(byPrice, productsArray);
  showProductsList(productsArray); //Muestro los productos ordenados
}

document.getElementById("up").addEventListener("click", ()=> {
  sortAndshowProducts(1, productsArray)
});
document.getElementById("down").addEventListener("click", ()=> {
  sortAndshowProducts(2, productsArray)
});
document.getElementById("price").addEventListener("click", ()=> {
  sortAndshowProducts(3, productsArray)
});
document.getElementById("clear").addEventListener("click", ()=> { //Borro los datos colocados dentro de máximo, mínimo y el buscador
  document.getElementById("buscador").value = "";
  document.getElementById("countMin").value = "";
  document.getElementById("countMax").value = "";

  browse = "";
  lowPrice = undefined;
  maxPrice = undefined;
  showProductsList(productsArray);
});
document.getElementById("filter").addEventListener("click", ()=>{ //Obtengo el mínimo y máximo de productos que hay y luego los filtro

  lowPrice = document.getElementById("countMin").value;
  maxPrice = document.getElementById("countMax").value;

  if ((lowPrice != undefined) && (lowPrice != "") && (parseInt(lowPrice) >= 0)) {
    lowPrice = parseInt(lowPrice);
  } else {
    lowPrice = undefined;
  }
  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice) >= 0)) {
    maxPrice = parseInt(maxPrice);
  } else {
    maxPrice = undefined;
  }
  getAutosData();
  Filtrado(productsArray);
});

function buscar(){ // Esta función con ayuda del evento, al tocar una tecla muestra los articulos que contenga esa letra/numero
  let producto = document.getElementById("buscador").value;

  let filterProduct = productsArray.filter( auto => {
    return auto.name.toLowerCase().indexOf(producto.toLowerCase()) > -1;
  });
  showProductsList(filterProduct);
}
document.getElementById("buscador").addEventListener("keyup", ()=> {
  buscar();
});
