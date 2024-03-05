<nav arial-label="breadcrumb">
  <ol class="breadcrumb ms-2">
    <li class="breadcrumb-item"><a class="text-reset text-decoration-none" href="index.php?nombPagina=home">Home</a></li>
    <li class="breadcrumb-item active"><a class="text-reset text-decoration-none" href="index.php?nombPagina=galeria">Galeria</a></li>
  </ol>
</nav>

<nav class="navbar navbar-expand-lg bg-secondary p-2">
    <div class="container-fluid d-flex justify-content-center">
        <ul class="navbar-nav">
            <li><a id="todos" class="selcCategoria col-12 nav-link ms-2">Ver todo</a></li>
            <li><a id="talleres" class="selcCategoria col-12 nav-link ms-2">Talleres</a></li>
            <li><a id="producYoga" class="selcCategoria col-12 nav-link ms-2">Accesorios para Yoga</a></li>
            <li><a id="esterillas" class="selcCategoria col-12 nav-link ms-2">Esterillas</a></li>                                
        </ul>
        <form class="d-flex ps-5" role="search">
                <input id="inputBuscador" class="form-control me-2"  type="search" placeholder="Buscador Productos" data-table="table-id" aria-label="Search">
                <!--<button id="btnBuscador" class="btn" >Buscador</button>-->
        </form>
    </div>
</nav>
  <div class="row mb-2"><!--Titulo Galería de Productos-->
    <div class="d-flex col-4 align-items-center justify-content-end">  
      <h1>Galería de Productos</h1>
    </div>
    <div class="d-flex col-8 align-items-center justify-content-center">
      <img src="VISTA/img/productos.png" class="img-fluid" alt="">
    </div>
  </div>
<h3 id="textoInf1" class="d-flex justify-content-center m-4"></h3>
    <!--Zona donde estarán los items de la galeria-->
    <div id="contenedorGaleria" class="container">
        <div id="divRowProductoGaleria" class="row ms-2 me-2">
            <!--AQUI VA EL RESULTADO DE LOS PRODUCTOS-->
        </div>
    </div>

    <!--PAGINACION-->
<nav aria-label="Page navigation">
  <ul class="pagination pg-dark justify-content-center pb-5 pt-5 mb-0">
    <li class="page-item">
      <button id="pagPrimera" class="page-link" type="button" aria-label="Pagina primera">
        <span aria-hidden="true">Primera Pagina</span>
      </button>
    </li>
    <li class="page-item">
      <button id="pagAnterior" class="page-link" type="button" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>
    <div id="divPaginacion" class="d-flex justify-content-center">

    </div> 
    <li class="page-item">
      <button id="pagNext" class="page-link" type="button" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
    <li class="page-item">
      <button id="pagUltima" class="page-link" type="button" aria-label="Pagina ultima">
        <span aria-hidden="true">Ultima Pagina</span>
      </button>
    </li>
  </ul>
  <p id="textoInf2" class="d-flex justify-content-center"></p>
  <p id="textoInf3" class="d-flex justify-content-center"></p>
</nav>

                 

    