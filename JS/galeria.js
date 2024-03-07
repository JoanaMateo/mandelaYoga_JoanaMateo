 
 //ELEMENTOS HTML
const divRowProductoGaleria = document.getElementById('divRowProductoGaleria');
const textoInf1= document.getElementById('textoInf1');
const textoInf2 = document.getElementById('textoInf2');
const textoInf3= document.getElementById('textoInf3');

const divPaginaItem=document.getElementById('divPaginacion');
const divMigasPan = document.querySelector('ol');

//VARIABLES GLOBALES
let textBusqueda="null";
let tipoProduct;
let page;
let totalpages;
let totalConsul;
let registro;

//Esta función coge solo el valor de Get en la url
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
document.addEventListener('DOMContentLoaded', () => {
       if(divRowProductoGaleria!=null){
        let valorGet = getParameterByName('categoria')
        ajaxAllProductos(valorGet);

        /*GALERIA ZONA HOME*/
        const homeEnalceGaleria = document.querySelectorAll('homeEnalceTaller');
        const homeHeaderGaleria = document.getElementsByClassName("headerGaleria nav-link");
       
        homeEnalceGaleria.forEach(elementos =>{
            elementos.addEventListener('click', selecionaTipoCategoria);
        });
        homeHeaderGaleria[0].addEventListener('click', selecionaTipoCategoria);
       
        
        /*PAGINACIÓN*/
        const btnPagPrimera = document.getElementById("pagPrimera");
        const btnPagUltima = document.getElementById("pagUltima");
        const btnPagAnterior = document.getElementById("pagAnterior");
        const btnPagNext = document.getElementById("pagNext");
        btnPagAnterior.addEventListener('click', pagAnterior);
        btnPagNext.addEventListener('click', pagNext);
        btnPagPrimera.addEventListener('click', pagPrimera);
        btnPagUltima.addEventListener('click', pagUltima);       
        
        /*BUSCADOR*/
        const buscador = document.querySelector("input[type='search']");
        buscador.addEventListener("keyup", selecionaTipoCategoria);
        
        /*NAV ZONA GALERIA*/          
        const selcCategoria = document.querySelectorAll("li .selcCategoria");
        selcCategoria.forEach(selcCategoria =>{
            selcCategoria.addEventListener('click', selecionaTipoCategoria);
        })
    }

        //FUNCIONES
    function pagPrimera(event){
        page= 1;
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "Se encuentra en la primera página."
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divMigasPan.lastChild.remove();
        divPaginaItem.innerHTML="";
        
        llamadaApi(page, tipoProduct, textBusqueda);
    }
    function pagUltima(event){
        page=totalpages;
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "Ultima pagina. No hay mas registro."
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divMigasPan.lastChild.remove();
        divPaginaItem.innerHTML="";
        
        llamadaApi(page, tipoProduct, textBusqueda);
    }
    function pagNext(event){ //Buscar problema. No me carga. Algo mal.
        page++;
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "";
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divMigasPan.lastChild.remove();
        divPaginaItem.innerHTML="";

       if(page>=totalpages){
            page = totalpages;
            textoInf2.innerHTML= "Ultima pagina. No hay mas registro."
        }
        
        llamadaApi(page, tipoProduct, textBusqueda);
    }
    function pagAnterior (){
        page--;
        textoInf1.innerHTML ="";
        textoInf2.innerHTML= "";
        textoInf3.innerHTML ="";
        divRowProductoGaleria.innerHTML = "";
        divMigasPan.lastChild.remove();
        divPaginaItem.innerHTML="";

        if(page<=1){
            page=1;
            textoInf2.innerHTML= "Se encuentra en la primera página."
        }
        
        llamadaApi(page, tipoProduct, textBusqueda);
    }

    function selectPagina(event){ 
        pageEvento = event.target.textContent 
        
        
        if(pageEvento==0){
            textoInf1.innerHTML =" No Hay Registros En Tu Búsqueda";
        }else{
            textoInf1.innerHTML ="";
            textoInf2.innerHTML= "";
            textoInf3.innerHTML ="";
            divRowProductoGaleria.innerHTML = "";
            divMigasPan.lastChild.remove();

            divPaginaItem.innerHTML="";
            if(pageEvento<=1){
                page=1;
                textoInf2.innerHTML= "Se encuentra en la primera página."
            }else if(pageEvento>=totalpages){
                page = totalpages;
                textoInf2.innerHTML= "Ultima pagina. No hay mas registro."
            }

            //LLamamos Ajax
            llamadaApi(pageEvento, tipoProduct, textBusqueda);
        }    
    }

    function ajaxAllProductos(valorGet){
        
        pageEvento = 1;
        if(valorGet=="talleres"){
            tipoProduct="talleres"
        }else{
            tipoProduct = "null";
        }
        textBusqueda = "null";        

        llamadaApi(pageEvento, tipoProduct, textBusqueda);        
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
            divMigasPan.lastChild.remove();
            llamadaApi(page, tipoProduct, textBusqueda);
            break;
        } 
    }
        //FUNCION QUE HACE PETICIÓN AJAX
    function llamadaApi(pag, categ, textoBusq){
        if(categ==null){
            categ="null";
        }
        
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
                console.log(error);
            })
    }
        //FUNCION QUE CARGA LOS DATOS DE LA PETICIÓN AJAX
    function cargarDatosProductos(datos){
        datos.datosConsultaProductos.forEach(elementos => {
            const card = crearCard(elementos);
            divRowProductoGaleria.appendChild(card);
        })

        tipoProduct = datos['paginacion'].categoria;
        page = datos['paginacion'].pagina;
        totalpages= datos['paginacion'].paginas;
        totalConsul = datos['paginacion'].total;
        registro= datos['paginacion'].limite;
        
        //For para dibujar solo 3 paginas.
        if(totalConsul==0){
            const paginacion = crearPaginacion(0);
            divPaginaItem.appendChild(paginacion);
            textoInf1.innerHTML =" No Hay Registros En Tu Busqueda";
        }else{
            if(totalpages>=registro){
                switch(page){
                    case 1:
                        for(let i=page; i<=registro; i++){
                            const paginacion = crearPaginacion(i);
                            divPaginaItem.appendChild(paginacion);
                        }
                        break;
                        case (totalpages-1):
                            for(let i=page-1; i<=totalpages; i++){
                                const paginacion = crearPaginacion(i);
                                divPaginaItem.appendChild(paginacion);
                            }
                        break;
                        case totalpages:
                            for(let i=page-2; i<=totalpages; i++){
                                const paginacion = crearPaginacion(i);
                                divPaginaItem.appendChild(paginacion);
                            }
                        break;
                        default:
                            for(let i=page-1; i<=(page+1); i++){
                                const paginacion = crearPaginacion(i);
                                divPaginaItem.appendChild(paginacion);
                            }
                        break;
                   }
            }else{
                switch(page){
                    case 1:
                    default:
                        for(let i=page; i<=totalpages; i++){
                            const paginacion = crearPaginacion(i);
                            divPaginaItem.appendChild(paginacion);
                        }
                        break;
                        case (totalpages-1):
                        case totalpages:
                            for(let i=page-1; i<=totalpages; i++){
                                const paginacion = crearPaginacion(i);
                                divPaginaItem.appendChild(paginacion);
                            }
                        break;                     
                   }
            }       
            textoInf1.innerHTML =" Total Registros "+ totalConsul;
        }
       
        //Elementos de la paginacion
        const arrayNumPaginacion = divPaginaItem.getElementsByClassName('numPaginacion');
        const liPaginacion = divPaginaItem.getElementsByClassName('pagina page-item');
        
        //La pagina que se visualiza está activa
            for(let i=0; i<liPaginacion.length; i++){
                if(page== liPaginacion[i].textContent){
                    liPaginacion[i].className="pagina page-item active"
                }
            }
        
        //Seleccionamos num pagina y mostramos productos de esa pagina exacta.
        for(let i=0; i< arrayNumPaginacion.length; i++){
        arrayNumPaginacion[i].addEventListener('click', selectPagina);
        }
        //Actualizamos Migas de Pan
        let categMigas =  selectMigasPan(tipoProduct);
        divMigasPan.append(crearMigasPan(categMigas));

        //Titulos con información
        textoInf3.innerHTML= "Total Paginas "+ totalpages;
    }

        //FUNCIONES QUE PINTAN FORMATO HTML PRODUCTOS Y PAGINACION
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
        
        const buttonPag = document.createElement('button');
        buttonPag.className= "page-link numPaginacion";
        buttonPag.textContent = pagina;

        liPag.appendChild(buttonPag);

        return liPag;
    }
    function crearMigasPan(cat){
        const liMigasPan = document.createElement('li');
        liMigasPan.className= "breadcrumb-item";
        const aMigasPan = document.createElement('a');
        aMigasPan.href="";

        liMigasPan.appendChild(aMigasPan);
        liMigasPan.innerText = cat;
        return liMigasPan;
    }
    function selectMigasPan(cat){
        let nomMiga;
        if(cat== null){
            cat="null"
        }
        switch(cat){
            case "null":
            case "todos":
                nomMiga= "Todos los productos"
            break;    
            case "talleres":
                nomMiga= "Talleres";
            break;
            case "producYoga":
                nomMiga= "Productos de Yoga";
            break;
            case "esterillas":
                nomMiga= "Esterillas";
            break;
            case "inputBuscador":
                nomMiga="Buscador"
            break;
        }
        return nomMiga;
    }
});
