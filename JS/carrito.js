// Variables
//Me crea una variable con el array de todos los botones para añadir los productos
const contenedorProductosGaleria = document.getElementById('contenedorGaleria');
const btnCarrito = document.querySelector('.btnCarrito');

const headerSpanCarritoCount = document.getElementById('headerSpanCarritoCount');
const carritoCalculoTotal = document.querySelector(".carritoCalculoTotal");
const smsFinalizarCompra = document.getElementById('smsFinalizarCompra');
const divZonaProductosEnElCarrito = document.querySelector('.divZonaProductosEnElCarrito');
const btnVaciarCarrito = document.querySelector('.btnVaciarCarrito');
const btnEnviarCarrito = document.querySelector('.btnCarritoEnviar');

//Recuperamos en la variable array los datos del localStorage.
let arrayProductosCarrito = JSON.parse(window.localStorage.getItem('carritoContent'));
let productCarrito;

iniciar()

function iniciar(){

    if(arrayProductosCarrito == null){
        arrayProductosCarrito = []
    }else{
        arrayProductosCarrito.forEach(element => {
            productCarrito = montarFilaCarrito(element);
            divZonaProductosEnElCarrito.append(productCarrito);    
            //creamos el evento para eliminar los productos del carrito:
    productCarrito.querySelector('.buttonDelete').addEventListener('click', borrarProductoCarrito);

    //trabajamos la cantidad de los productos
    productCarrito.querySelector('.shoppingCartItemQuantity').addEventListener('change',variacionCantidadProductos);
         
        });  
        
        calculoTotalCarrito(arrayProductosCarrito);
    
    }
    
    if(contenedorProductosGaleria != null){
        contenedorProductosGaleria.addEventListener("click",comprobar);
    }
    
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
btnEnviarCarrito.addEventListener('click', finalizarCompra);


function comprobar(event){
    var elemento=event.target;
    
    if(elemento.textContent === "Añadir al Carrito"){
        addToCartCarritoList(elemento);
        btnCarrito.className="d-inline-block align-text-top animate__animated animate__rubberBand";
        
        setTimeout(() => {
            btnCarrito.className="d-inline-block align-text-top";
        }, "1000")
    }
}

//Evento cuando seleccionamos un producto
function addToCartCarritoList(elemento){

//capturamos el div con toda la info del producto
const producto = elemento.closest('.card');
//capturamos la informacion del div
const productoTitle = producto.querySelector('.card-title').textContent;
const productoImg = producto.querySelector('.card-img').src;
const productoPrice = producto.querySelector('.card-price').textContent;

addProductoAlCarrito(productoTitle, productoImg, productoPrice );
}


//a esta función le pasamos las 3variables con la información del producto.
function addProductoAlCarrito(productoTitle, productoImg, productoPrice){
smsFinalizarCompra.innerText = '';

//creamos objetoProducto
let objetoProdutoCarrito = 
    {
        cantidad:1,
        titulo: productoTitle,
        precio: productoPrice,
        imagen: productoImg,
    };

    if(arrayProductosCarrito.length == 0){
        arrayProductosCarrito.push(objetoProdutoCarrito);

        //Introducimos esta info en la variable de la fila del carrito
        productCarrito = montarFilaCarrito(objetoProdutoCarrito);
        divZonaProductosEnElCarrito.append(productCarrito);
        calculoTotalCarrito(arrayProductosCarrito)
    }else{
    //Primero evaluamos que el producto esté en el carrito
    const arrayElementosCarrito = divZonaProductosEnElCarrito.getElementsByClassName('shoppingCartItemTitle');
        //recorremos el array
        for(let i=0; i< arrayProductosCarrito.length; i++){
            if(arrayProductosCarrito[i].titulo === productoTitle){
            arrayProductosCarrito[i].cantidad++;
            calculoTotalCarrito(arrayProductosCarrito);
            //Pintamos el aumento de la cantidad del elemento que ya está en el array del carrito
                for(let j=0; j<arrayElementosCarrito.length; j++){
                    if(arrayElementosCarrito[j].innerText == productoTitle){
                        let cantidadElementos = arrayElementosCarrito[j].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
                        cantidadElementos.value++;
                        return;
                    }
                }
            }
        }

            arrayProductosCarrito.push(objetoProdutoCarrito);
            //Introducimos esta info en la variable de la fila del carrito
            productCarrito = montarFilaCarrito(objetoProdutoCarrito);
            divZonaProductosEnElCarrito.append(productCarrito);

            calculoTotalCarrito(arrayProductosCarrito);
        
    }
    //creamos el evento para eliminar los productos del carrito:
    productCarrito.querySelector('.buttonDelete').addEventListener('click', borrarProductoCarrito);

    //trabajamos la cantidad de los productos
    productCarrito.querySelector('.shoppingCartItemQuantity').addEventListener('change',variacionCantidadProductos);

}
    
function borrarProductoCarrito(event){
    const btnBorrarProductoCarrito = event.target;
    let newArrayEliminarElemento = [];
    let textTitulo = (btnBorrarProductoCarrito.closest('.productoDelCarrito').innerText)
    //Recorremos el array para borrar el elemento seleccionado
    for(let i=0; i<arrayProductosCarrito.length; i++){
        if(textTitulo.includes(arrayProductosCarrito[i].titulo) ){
            newArrayEliminarElemento = arrayProductosCarrito.filter(elemento => elemento.titulo != arrayProductosCarrito[i].titulo )
        }
    }
    //Se borra la imagen del elemento seleccionado
    btnBorrarProductoCarrito.closest('.productoDelCarrito').remove();
    arrayProductosCarrito = newArrayEliminarElemento;

    calculoTotalCarrito(arrayProductosCarrito);
}

function variacionCantidadProductos(event){
    const inputCantidadProducto = event.target;
    let textTitulo = (inputCantidadProducto.closest('.productoDelCarrito').innerText)

    if (inputCantidadProducto.value <= 0){
        inputCantidadProducto.value = 1 //De esta forma el usuario no podrá bajar de cero.
    }

    for(let i=0; i<arrayProductosCarrito.length; i++){
        if(textTitulo.includes(arrayProductosCarrito[i].titulo) ){
            arrayProductosCarrito[i].cantidad = Number(inputCantidadProducto.value);
        }
    }

    calculoTotalCarrito(arrayProductosCarrito);
}

function calculoTotalCarrito(arrayProductos){
    console.log(arrayProductos)
let total= 0
let totalCantidad = 0;

//Iteramos el array para hacer el calculo del total
for(let i=0; i<arrayProductos.length; i++){
    const precioProducto = arrayProductos[i].precio;
    const cantidadProducto = Number(arrayProductos[i].cantidad);

//Operamos
total =total +  (Number(precioProducto.replace('€',''))* cantidadProducto);
totalCantidad += cantidadProducto;
}

carritoCalculoTotal.innerText = total.toFixed(2);
headerSpanCarritoCount.innerText = totalCantidad;

// SE USA LOCALSTORAGE
window.localStorage.setItem("carritoContent", JSON.stringify(arrayProductos) );
window.localStorage.setItem("headerSpanCarritoNum", headerSpanCarritoCount.innerText);
}
function vaciarCarrito(){
    while(divZonaProductosEnElCarrito.firstChild){
        divZonaProductosEnElCarrito.removeChild(divZonaProductosEnElCarrito.firstChild);
    }
    arrayProductosCarrito=[];
    calculoTotalCarrito(arrayProductosCarrito);
}

function finalizarCompra(event){
event.preventDefault()    //Al finalizar la compra se borrará el contenido del carrito

if(Number(carritoCalculoTotal.textContent) === 0 || carritoCalculoTotal.textContent === 0.00 ){
    smsFinalizarCompra.innerText= "El carrito está vacio."
}else{
    console.log("Se envia por post:")
    console.log(arrayProductosCarrito)

    vaciarCarrito();
    smsFinalizarCompra.innerText= "Su compra se ha enviado correctamente. Gracias"
}
    
}

}
//funcion montar la filaCarrito
function montarFilaCarrito(objeto){
    
//Div del Modal
const divFilaproductoCarrito = document.createElement('div');
divFilaproductoCarrito.className= "row productoDelCarrito";
const divImg = document.createElement('div');
divImg.className= "col-6";
const divPrecio = document.createElement('div');
divPrecio.className= "col-2";
const divInputBtn = document.createElement('div');
divInputBtn.className= "col-4";

const divModalImg= document.createElement('div');
divModalImg.className = "modal-cart-item d-flex justify-content-center align-items-center border-bottom pb-2 pt-3 h-100";
const divModalPrecio= document.createElement('div');
divModalPrecio.className = "modal-cart-item d-flex justify-content-center align-items-center border-bottom pb-2 pt-3 h-100";
const divModalInputBtn= document.createElement('div');
divModalInputBtn.className = "modal-cart-quantity d-flex justify-content-between aling-items-center border-bottom pb-2 pt-3 h-100";

//Imagen
const imgProducto = document.createElement('img');
imgProducto.src = objeto.imagen; //Le damos el valor del parámetro.
imgProducto.style.width = "60px";
imgProducto.style.height= "60px";
imgProducto.className="modal-cart-img";

//Titulo
const tituloProducto = document.createElement('h6');
tituloProducto.className="modal-cart-title shoppingCartItemTitle text-truncate ml-3 mb-0";
tituloProducto.textContent = objeto.titulo; //Le damos el valor del parámetro.

//Precio
const pProducto = document.createElement('p');
pProducto.className= "modal-cart-price shoppingCartItemPrice ml-3 mb-0";
pProducto.textContent = objeto.precio; //Le damos el valor del parámetro.

//input cantidad producto
const inputModalProducto= document.createElement('input');
inputModalProducto.className = "form-control shoppingCartItemQuantity";
inputModalProducto.type = "number";
inputModalProducto.value = objeto.cantidad;
//boton eliminar producto
const btnModalProducto = document.createElement('button');
btnModalProducto.className = "btn btn-danger buttonDelete";
btnModalProducto.type= "button";
btnModalProducto.textContent= "X";

//Montamos el modal:
divModalImg.append(tituloProducto);
divModalImg.prepend(imgProducto);
divImg.insertAdjacentElement("afterbegin",divModalImg);

divModalPrecio.appendChild(pProducto);
divPrecio.insertAdjacentElement("afterbegin",divModalPrecio);

divModalInputBtn.append(btnModalProducto);
divModalInputBtn.prepend(inputModalProducto);
divInputBtn.appendChild(divModalInputBtn);

divFilaproductoCarrito.insertAdjacentElement("afterbegin", divImg);
divFilaproductoCarrito.append(divPrecio);
divFilaproductoCarrito.insertAdjacentElement("beforeend",divInputBtn);
 
return divFilaproductoCarrito;
}
