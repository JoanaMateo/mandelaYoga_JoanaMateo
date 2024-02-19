const divRowProductoGaleria = document.getElementById('divRowProductoGaleria');
console.log(divRowProductoGaleria)
const btnPagAnterior = document.getElementById("pagAnterior");
console.log(btnPagAnterior)
const btnPagNext = document.getElementById("pagNext");
console.log(btnPagNext)
const textoInf1= document.getElementById('textoInf1');
console.log(textoInf1)
const textoInf2 = document.getElementById('textoInf2');
console.log(textoInf2)
const textoInf3= document.getElementById('textoInf3');
console.log(textoInf3)

const divPaginaItem=document.getElementById('divPaginacion');
console.log(divPaginaItem)
//Pendiente poner el liPaginacion para crear el evento de pulsar una página y cargarla. TERMINAR!!!
const liPaginacion = "";
console.log(liPaginacion);
//const divMigasPan = document.querySelector('ol');

let textBusqueda;
let tipoProduct;
let page;
let totalpages;
let totalConsul;
let registro;
//let limite= 3;

document.addEventListener('DOMContentLoaded', ()=>{
    if(divRowProductoGaleria != null){ 
        ajaxAllProductos();

        /*GALERIA ZONA HOME*/
        const homeEnalceGaleria = document.querySelectorAll('homeEnalceTaller');
        const homeHeaderGaleria = document.getElementsByClassName("headerGaleria nav-link");
       
        homeEnalceGaleria.forEach(elementos =>{
            elementos.addEventListener('click', selecionaTipoCategoria);
        });
        homeHeaderGaleria[0].addEventListener('click', selecionaTipoCategoria);
       
        
        /*PAGINACIÓN*/
        btnPagAnterior.addEventListener('click', pagAnterior);
        btnPagNext.addEventListener('click', pagNext);
       
        //No funciona!!!! PENDIENTE TERMINAR!!!!
        for(let i=0; i<liPaginacion.length; i++){
            console.log(liPaginacion[i])

            liPaginacion[i].addEventListener('click', selectPagina);
        }
        
        /*BUSCADOR*/
        const buscador = document.querySelector("input[type='search']");
        buscador.addEventListener("keyup", selecionaTipoCategoria);
        
        /*NAV ZONA GALERIA*/          
        const selcCategoria = document.querySelectorAll("li .selcCategoria");
        selcCategoria.forEach(selcCategoria =>{
            selcCategoria.addEventListener('click', selecionaTipoCategoria);
        })
    }
    function pagNext(event){ //Buscar problema. No me carga. Algo mal.
        page++;
        
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "";
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divPaginaItem.innerHTML="";
       
        if(page>=totalpages-2){
            limite=totalpages-2;
        }
        if(page>=totalpages){
            page = totalpages;
            textoInf2.innerHTML= "Ultima pagina. No hay mas registro."
            //btnPagNext.disabled = true;    //El botón se desactiva
        }
        //limite++;
        // console.log("Datos limite botonNext: "+limite);
        console.log("Datos pagina botonNext: "+page+typeof(page));
        console.log("Datos categoria botonNext: "+tipoProduct+typeof(tipoProduct));
        console.log("Datos textoBusqueda botonNext: "+textBusqueda+typeof(textBusqueda));

        llamadaApi(page, tipoProduct, textBusqueda);

    }
    function pagAnterior (){
        page--;

        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "";
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divPaginaItem.innerHTML="";
        if(page<=1){
            page=1;
            textoInf2.innerHTML= "Se encuentra en la primera página."
            //btnPagAnterior.ariaDisabled = true;
        }
        if(page>=totalpages-2){
            limite=totalpages-2;
        }
        //limite--;
        //console.log("Datos limite botonNext: "+limite);
        console.log("Datos pagina botonNext: "+page);
        console.log("Datos categoria botonNext: "+tipoProduct+typeof(tipoProduct));
        console.log("Datos textoBusqueda botonNext: "+textBusqueda+typeof(textBusqueda));

        llamadaApi(page, tipoProduct, textBusqueda);
    }
    
    function selectPagina(event){ //PENDIENTE TERMINAR/ Probar.!!!!!!!!!
       page = event.target.value //cogemos el valor del li de la pagina.
       //LLamamos Ajax
       
       llamadaApi(page, tipoProduct, textBusqueda);
    }
   
    function ajaxAllProductos(){
        page = 1;
        textBusqueda = 'null';
        tipoProduct = 'null';
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "";
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        
        llamadaApi(page, tipoProduct, textBusqueda);
    }

    function selecionaTipoCategoria(event){
        page =1;
        tipoProduct = event.target.id;
        textBusqueda = event.target.value;
        if(textBusqueda == undefined){
            textBusqueda = "null";
        }
        switch(tipoProduct){
            case "todos":
            case "talleres":
            case "producYoga":
            case "esterillas":
            case "inputBuscador":

            textoInf1.innerHTML ="";
            textoInf2.innerHTML= "";
            textoInf3.innerHTML ="";
            divRowProductoGaleria.innerHTML = "";
            divPaginaItem.innerHTML="";

            llamadaApi(page, tipoProduct, textBusqueda);
            break;
        } 
    }
    function llamadaApi(pag, categ, textoBusq){
        if(categ==null){
            categ="null";
        }
        console.log("Datos pagina al hacer la llamada Api: "+pag+typeof(pag));
        console.log("Datos categoria al hacer la llamada Api: "+categ+typeof(categ));
        console.log("Datos textoBusqueda al hacer la llamada Api: "+textoBusq+typeof(textoBusq));
        const headers = new Headers();
        headers.append('pragma', 'no-cache');
        headers.append('cache-control', 'no-cache');
        const url = `http://localhost:8888/mandelaYoga_JoanaMateo/API/mostrarProductoAPI.php?nombPagina=galeria&categoria=${categ}&pagina=${pag}&buscador=${textoBusq.toLocaleLowerCase().trim()}`;
        
        fetch(url,{headers}, {method: 'GET'})
            //.then(response => console.log(response))
            .then(response => response.json())
            //.then(datos=>console.log(typeof(datos)))
            //.then(datos=>console.log(datos))
            .then(datos => cargarDatosProductos(datos))
            .catch((error)=>{
                console.log(error.message);
            })
    }
    function cargarDatosProductos(datos){
        datos.datosConsultaProductos.forEach(elementos => {
            const card = crearCard(elementos);
            divRowProductoGaleria.appendChild(card);
        })

        tipoProduct = datos['paginacion'].categoria;
        console.log("Datos recibidos del api categoria"+tipoProduct+ typeof(tipoProduct))
        page = datos['paginacion'].pagina;
        console.log("Datos recibidos del api pagina"+page)
        totalpages= datos['paginacion'].paginas;
        console.log("Datos recibidos del api totalPaginas"+totalpages)
        totalConsul = datos['paginacion'].total;
        console.log("Datos recibidos del api totalConsulta"+totalConsul)
        registro= datos['paginacion'].limite;
        console.log("Datos recibidos del api registro"+registro)
        
        //for para dibujar solo 3 paginas.
        let limite= page+2
        for(let i=page; i<=limite; i++){
            const paginacion = crearPaginacion(i);
            divPaginaItem.appendChild(paginacion);
            }
        
        textoInf1.innerHTML =" Total registros "+ totalConsul;
        textoInf3.innerHTML= "Total paginas "+ totalpages;
    }
    function crearCard(objeto){
        const divCol = document.createElement('div');
        divCol.className = "col-4 mb-3";
        const divCard = document.createElement('div');
        divCard.className = "card d-flex d-flex align-items-center text-center";
        const divCardBody = document.createElement('div');
        divCardBody.className = "card-body";

        const hcinq = document.createElement('h5');
        hcinq.className = "card-title pt-4";
        hcinq.textContent = objeto.nombre; //Aquí el nombre
        const hcuat = document.createElement('h4');
        hcuat.className = "card-price";
        hcuat.textContent = objeto.precio+" €"; //Aquí el precio
        const imgProduct = document.createElement('img');
        imgProduct.src="VISTA/"+objeto.imgUrl; //Aquí va la imagen
        imgProduct.className = "card-img img-fluid";
        imgProduct.style = "height:50%; width:50%";
        imgProduct.alt = "";
        const buttonAddProduct = document.createElement('button');
        buttonAddProduct.id = "btnAddProductosCarrito";
        buttonAddProduct.type = "button";
        buttonAddProduct.className = "btn btn-primary";
        buttonAddProduct.textContent = "Añadir al Carrito";

        divCol.insertAdjacentElement("afterbegin",divCard);
        divCard.appendChild(hcinq);
        divCard.appendChild(imgProduct);
        divCard.append(divCardBody);
        divCardBody.appendChild(hcuat);
        divCardBody.appendChild(buttonAddProduct);

        return divCol;
    }
    function crearPaginacion(pagina){
        const liPag = document.createElement('li');
        liPag.className= "pagina page-item";
        
        const aPag = document.createElement('a');
        aPag.className= "page-link";
        //aPag.href="#";
        aPag.textContent = pagina;

        liPag.appendChild(aPag);

        return liPag;
    }
    function crearMigasPan(){
        const liMigasPan = document.createElement('li');
        liMigasPan.className= "breadcrumb-item";
        const aMigasPan = document.createElement('a');
        aMigasPan.href="";

        liMigasPan.appendChild(aMigasPan);
        liMigasPan.innerText = categoria;
        return liMigasPan;
    }
}); 