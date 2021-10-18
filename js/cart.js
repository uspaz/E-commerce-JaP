let carrito = {};

async function Productos() { //Tomo el JSON de la informacion del articulo
    const carrito = await getJSONData(CART_INFO_URL);
    return carrito;
}

document.addEventListener("DOMContentLoaded", async function(e){ //Utilizo la variable con el JSON de antes para mostar la información de el/los articulos
  response = await Productos();
  carrito = response.data;
  showItems(carrito);
});

function showItems(tabla) {  //En esta función recorro los objetos dentro del JSON, los coloco en una tabla ya creada y le doy unos detalles, además de filtrar y pasar a dolares
  let articulos = "";

  tabla.articles.forEach( (elemento,i) => {

    if (elemento.currency == "UYU") {
        elemento.currency = "USD";
        elemento.unitCost = elemento.unitCost / 40;
    }

    articulos +=
    `<tr>
      <td colspan="2"><img src="${elemento.src}" class="productos"><label class="productName">${elemento.name}</label></td>
      <td><input type="number" id="count${i}" value="1" min="0" onchange="subTotal();" class="cantidad"></td>
      <td class="text-center">${elemento.currency} <span class="monto">${elemento.unitCost}</span></td>
      <td class="text-center"><span id="subTotal${i}"></span></td>
    </tr>`
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

    document.getElementById('subTotal'+ i).innerHTML = subtotal;
  }
  total();
}

function total(){ //Tomo los valores de cada SubTotal antes calculado y los sumo, para luego mostrarlos en un h5 creado en el documento html
  let total = 0;

  for (let i = 0; i < carrito.articles.length; i++) {

    total += parseFloat(document.getElementById('subTotal'+ i).innerHTML);
  }
  document.getElementById('total').innerHTML = (total).toFixed(1);
}
