<nav arial-label="breadcrumb">
    <ol class="breadcrumb ms-2">
    <li class="breadcrumb-item"><a class="text-reset text-decoration-none" href="index.php?nombPagina=home">Home</a></li>
    <li class="breadcrumb-item active"><a class="text-reset text-decoration-none" href="index.php?nombPagina=contacto">Contacto</a></li>
    </ol>
</nav>

<div class="row mb-5 rounded shadow m-2">

    <!-- para la imagen de fondo -->
    <div class="col bg d-none d-lg-flex col-md-5 col-xl-6 rounded-start p-0 ">
        <img class="img-fluid rounded-start" src="VISTA/img/contactoYoga.png"  alt="necesitas ayuda">
    </div>

        <!-- para el contenido -->        
        <div class="col bg-white rounded-end">
            <div class="text-end">
                <h2 class="text-center pt-5 mb-5">Si necesitas ayuda no dudes en contactarnos</h2>
            </div>
        <!-- LOGIN -->   
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="asuntoC" class="form-label">Asunto/ Nº de pedido *</label>
                    <input type="text" class="form-control" name="asunto" id="asuntoC">
                </div>

                <div class="mb-4">
                    <label for="emailC" class="form-label">Correo electronico *</label>
                    <input type="email" class="form-control" name="email" id="emailC">
                </div>

                <div class="mb-4">
                    <label for="cars" class="form-label">Motivo de la consulta</label>
                    <select name="motivo" id="cars">
                        <option disabled selected value> --- Selecciona una opción ---</option>
                            <option value="talleres">Informacion sobre próximos talleres</option>
                            <option value="envio">Dudas sobre envíos</option>
                            <option value="pedido">Dudas sobre tu pedido</option>
                            <option value="problemas">Problemas con un pedido</option>
                    </select>
                </div>
                                            
                <div class="form-outline">
                    <label for="textAreaExample1" class="form-label">Texto adicional</label>
                        <textarea class="form-control" id="textAreaExample1" rows="4" placeholder="Detalla aquí tu consulta..."></textarea>
                </div>
                <div class="input-group mb-5">
                    <div class="custom-file">
                        <label class="custom-file-label" for="inputGroupFile01">Adjuntar archivo</label>
                        <input type="file" class="custom-file-input" id="inputGroupFile01"
                                                    aria-describedby="inputGroupFile01">
                    </div>
                </div>
                    <div class="d-grid"> <!-- para que el botón ocupe lo mismo que el formulario-->
                        <button type="button" class="btn btn-primary">Enviar</button>
                        </div>

                    <!-- comprobar si tiene cuenta o si quiere recordar contraseña-->
                        <div class="my-3">
                            <span>Si lo necesitas puedes consultar las <a href="index.php?nombPagina=preguntasFrecuentes">Preguntas Frecuentes</a></span> <br>
                        </div>
            </form>                
        </div>
    </div>    
</div>

