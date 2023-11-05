// Variables para la conexion con PeerJS
let peer;
let connection1;
let connection2;

let canalSalida;

function conectarPeer(id) {
    peer = new Peer(id);

    // Creamos el evento para la inicializacion de la conexion
    peer.on('open', function (idPeer) {
        console.log('PeerJS ID: ' + idPeer);
        log('PeerJS ID: ' + idPeer);
    });


    peer.on('connection', function (conn) {
        console.log('Conexión establecida', conn);
        log('Conexión establecida');

        connection1 = conn;

        aplicacion.idNombreRemoto = connection1.peer;
        document.getElementById('nombre-usuario-remoto').innerHTML = aplicacion.idNombreRemoto;

        // Ocultamos el div de conectar y mostramos el chat
        document.getElementById('div-conectar').style.display = 'none';
        document.getElementById('div-conversacion').style.display = 'block';

        // Creamos el evento para cuando se reciben datos
        connection1.on('data', function (data) {
            console.log('Recibido: ' + data);
            log('Recibido: ' + data);
            aplicacion.recibirMensaje(data);
        });
        canalSalida = connection1;

        // Conectamos con el remoto tambien
        conectarConRemoto(connection1.peer, true);

    });
}

function conectarConRemoto(idRemoto, esRespuesta) {
    console.log(connection2);
    if (connection2 == undefined) {
        connection2 = peer.connect(idRemoto);

        connection2.on('open', function () {

            aplicacion.idNombreRemoto = idRemoto;
            console.log('Conectado con ', idRemoto);
            log('Conectado con ' + idRemoto);
            document.getElementById('nombre-usuario-remoto').innerHTML = idRemoto;

            // Ocultamos el div de conectar y mostramos el chat
            document.getElementById('div-conectar').style.display = 'none';
            document.getElementById('div-conversacion').style.display = 'block';

            connection2.on('data', function (data) {
                console.log('Recibido: ' + data);
                log('Recibido: ' + data);
                aplicacion.recibirMensaje(data);
            });

            if (!esRespuesta)
            {
                canalSalida = connection2;
            }
        });
    }

}

function log(texto){
    document.getElementById('log').innerHTML += texto + '<br>';
}