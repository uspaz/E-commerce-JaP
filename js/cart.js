let carrito = [];
let usuario = JSON.parse(localStorage.getItem("user"));

async function Productos() { //Tomo el JSON de la informacion del articulo
    const carrito = await getJSONData(CART_INFO_URL);
    return carrito;
}

document.addEventListener("DOMContentLoaded", async function(e){ //Utilizo la variable con el JSON de antes para mostar la información de el/los articulos
  response = await Productos();
  carrito = response.data;
  showItems(carrito);
  //Dejo al comienzo todos los campos desactivados
  document.getElementById('numero').disabled = true;
  document.getElementById('fecha').disabled = true;
  document.getElementById('codigo').disabled = true;
  document.getElementById('cuenta').disabled = true;

});

function eliminar(posicion){
  carrito.articles.splice(posicion, 1);
  showItems(carrito);

  if (carrito.articles.length = 0) {
    Swal.fire({
      icon: "warning",
      text: "No hay articulos en su carrito"
    });
  }
}

function showItems(tabla) {  //En esta función recorro los objetos dentro del JSON, los coloco en una tabla ya creada y le doy unos detalles, además de filtrar y pasar a dolares
  let articulos = "";
  let i = 0;

  tabla.articles.forEach( (elemento) => {


    if (elemento.currency == "UYU") {
        elemento.currency = "USD";
        elemento.unitCost = elemento.unitCost / 40;
    }

    articulos +=
    `<tr>
      <td colspan="2"><img src="${elemento.src}" class="productos"><label class="productName">${elemento.name}</label></td>
      <td><input type="number" id="count${i}" value="${elemento.count}" min="0" onchange="subTotal();" class="cantidad"></td>
      <td class="text-center">${elemento.currency} <span class="monto">${elemento.unitCost}</span></td>
      <td class="text-center"><span id="subTotal${i}"></span></td>
      <td><div onclick="eliminar(${i});"><i class="fas fa-minus fa-2x icon"></i></div></td>
    </tr>
    <input type="hidden" value="${usuario.dato}" name="nombre"></input>`
    i++;
  });
  document.getElementById('cuerpo').innerHTML = articulos;
  subTotal();
}

function subTotal() { //Tomo los valores del precio y la cantidad, los parceo para poder calcularlos y luego mostrarlos a través de un id antes creado en la tabla
  let price = document.getElementsByClassName('monto');
  let amount = document.getElementsByClassName('cantidad');

  let subtotal = 0;
  for (let i = 0; i < price.length; i++) {

    subtotal = parseFloat(price[i].innerHTML) * parseFloat(amount[i].value).toFixed(2)
    console.log(subtotal);
    document.getElementById('subTotal'+ i).innerHTML = subtotal;
  }
  total();
}

function total(){ //Tomo los valores de cada SubTotal antes calculado y los sumo, para luego mostrarlos en un h5 creado en el documento html
  let total = 0;
  let envios = document.getElementsByName('publicationType');

  for (let i = 0; i < carrito.articles.length; i++) {

    total += parseFloat(document.getElementById('subTotal'+ i).innerHTML);
  }

  for (let i = 0; i < envios.length; i++) {
    if (envios[i].checked) {
      total = parseFloat(envios[i].value) * total;
    }

  }
  document.getElementById('total').innerHTML = (total).toFixed(2);
}

function enableTarjeta() {

  document.getElementById('numero').disabled = false;
  document.getElementById('fecha').disabled = false;
  document.getElementById('codigo').disabled = false;

  document.getElementById('cuenta').disabled = true;

  document.getElementById('forma').innerHTML = `<span  class="ml-2"> Tarjeta de credito </span>`
}
function enableCuenta() {

  document.getElementById('cuenta').disabled = false;

  document.getElementById('numero').disabled = true;
  document.getElementById('fecha').disabled = true;
  document.getElementById('codigo').disabled = true;

  document.getElementById('forma').innerHTML = `<span  class="ml-2"> Transferencia bancaria </span>`
}
