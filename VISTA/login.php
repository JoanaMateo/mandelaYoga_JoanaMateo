<nav arial-label="breadcrumb">
    <ol class="breadcrumb m-2">
    <li class="breadcrumb-item"><a class="text-reset text-decoration-none" href="index.php?nombPagina=home">Home</a></li>
    <li class="breadcrumb-item active"><a class="text-reset text-decoration-none" href="index.php?nombPagina=login">Login</a></li>
    </ol>
</nav>
    
    <div class="row mb-5 rounded shadow m-2">
        <div class="col bg d-none d-lg-flex col-md-5 col-xl-6 rounded-start p-0 ">
            <img class="img-fluid rounded-start" src="VISTA/img/comunidad.png" alt="">
        </div>
        <div class="col bg-white rounded-end">
            <div class="text-end">
                <h2 class="text-center pt-5 mb-5">Acceso al área de usuario</h2>
                <p class="text-start">Este es el espacio reservado para los miembros de nuestra tribu online.
                <br>Anímate a formar parte de él <a href="index.php?nombPagina=landing">aquí</a>.</p>
            </div>
            
            <form action="#" method="POST">
                <div class="form-group mb-4">
                    <label for="inputEmail">Email</label>
                    <input id="inputEmail" type="email" class="form-control" placeholder="Introduce tu email">
                </div>
                <div class="form-group mb-4">
                    <label for="inputPass">Contraseña</label>
                    <input id="inputPass" type="password" class="form-control" placeholder="Introduce tu contraseña">
                </div>
                <div class="form-check mb-4">
                    <input id="checkRecuerdame" type="checkbox" class="form-check-input">
                    <label for="checkRecuerdame">Recuérdame</label>
                </div>
                <div class="d-grid"> <!-- para que el botón ocupe lo mismo que el formulario-->
                    <button type="button" class="btn btn-primary">Acceder</button>
                </div>
            </form>
            <a href="#">¿Has olvidado tu contraseña?</a>
        </div>
    </div>

