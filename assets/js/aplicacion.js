class Aplicacion {


    // Nombre de usuario y el remoto
    idNombre;
    idNombreRemoto;
    objetoActual;

    constructor() {

        this.objetoActual = this;
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.getElementById('btnComenzar').addEventListener('click', () => {

            // Obtenemos el ID indicado
            this.idNombre = document.getElementById('idNombre').value;

            // Validamos que el nombre no este vacio
            if (this.idNombre.trim() == '') {

                document.getElementById('idNombre').style.border = 'solid 1px red';
                return;
            }

            // Realizamos la conexión con PeerJS
            conectarPeer(this.idNombre);

            // Mostramos la siguiente pantalla
            document.getElementById('div-inicial').style.display = 'none';
            document.getElementById('div-chat').style.display = 'block';
            document.getElementById('nombre-usuario').innerHTML = this.idNombre;
        });

        // Evento click del envio de mensaje
        document.getElementById('btnEnviar').addEventListener('click', () => {
            this.enviarMensaje();
        });

        // Evento click de conectar con un remoto
        document.getElementById('btnConectar',).addEventListener('click', () => {
            conectarConRemoto(document.getElementById('id-remoto').value);
        });
    }

    enviarMensaje() {

        var mensaje = document.getElementById('texto').value;

        let html = `<div class="mensaje">
                <div class="nombre">${this.idNombre}</div>
                ${mensaje}
                <span class="fecha">${new Date().toLocaleTimeString()}</span>
            </div>`;

        document.getElementById('div-conversacion').innerHTML += html;

        canalSalida.send(mensaje);

    }

    recibirMensaje(texto) {
        console.log('Recibido: ' + texto);
        let html = `<div class="mensaje derecha">
                <div class="nombre">${this.idNombreRemoto}</div>
                ${texto}
                <span class="fecha">${new Date().toLocaleTimeString()}</span>
            </div>`;

        document.getElementById('div-conversacion').innerHTML += html;
    }

}