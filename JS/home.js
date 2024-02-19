/*
<div class="carousel-inner">
<div class="carousel-item active">
  <img src="" alt="slide 1" class="d-block" style="width:100%">
</div>
<div class="carousel-item">
  <img src="" alt="slide 2" class="d-block" style="width:100%">
</div>
<div class="carousel-item">
  <img src="" alt="slide 3" class="d-block" style="width:100%">
</div>
</div>
const divCarouselInner = document.querySelector('div .carousel-inner');

document.addEventListener('DOMContentLoaded', ()=>{


  fetch(`http://localhost:8888/mandelaYoga_JoanaMateo/API/mostrarProductoAPI.php?nombPagina=home`, {method: 'GET'})
    .then(response => response.json())
        //.then(datos=>console.log(typeof(datos)))
        //.then(datos=>console.log(datos))
        .then(datos => cargarDatos(datos))

const carouselIndicators = document.getElementById('btnCarouselIndicators');
carouselIndicators.addEventListener('click',()=>{
    location.href="index.php?nombPagina=galeria&categoria=todos";
});

console.log(carouselIndicators)
function cargarDatos(datos){
    datos.datosConsultaProductos.forEach(elementos => {
        const carousel = crearCarousel(elementos);
        divCarouselInner.append(carousel);
        console.log(carousel)
    })
    const carouselItem = document.getElementsByClassName('d-flex carousel-item');
    carouselItem[0].className='carousel-item active';
}

function crearCarousel(objeto){
    const divCarousel = document.createElement('div');
    divCarousel.className="d-flex carousel-item";

    const hcinq = document.createElement('h5');
    hcinq.className = "card-title pt-4";
    hcinq.textContent = objeto.nombre; //Aquí el nombre
    const hcuat = document.createElement('h4');
    hcuat.className = "card-price";
    hcuat.textContent = objeto.precio+" €"; //Aquí el precio

    const imgCarousel = document.createElement('img');
    imgCarousel.src="VISTA/"+objeto.imgUrl; //Aquí va la imagen
    imgCarousel.alt;
    imgCarousel.className="d-block";
    imgCarousel.style="width:20%";

    divCarousel.appendChild(imgCarousel);
    
    return divCarousel;
}

});
*/