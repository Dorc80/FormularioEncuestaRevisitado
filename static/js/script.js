let enviar = document.querySelector('#enviar');
let dataServerSpan = document.querySelector('#data-server');
let ramdomNumServerSpan = document.querySelector('#ramdomnum-server');
let serverMessageDiv = document.querySelector('#server-message');

enviar.addEventListener('click', function() {
    
    let socket = io('http://localhost:8000');

    let msg = {
        name: document.querySelector('#name').value,
        location: document.querySelector('#location').value,
        language: document.querySelector('#language').value,
        comment: document.querySelector('#comment').value
    }

    console.log('msg', msg);

    socket.emit('formulario_publicacion', msg );

    socket.on('mensaje_actualizado', function(data) {

        removeClass('none-display');
        dataServerSpan.innerText = JSON.stringify(data);

    });

    socket.on('numero_aleatorio', function(data) {

        removeClass('none-display');
        ramdomNumServerSpan.innerText = data;
        
    });

});

function removeClass(className) {
    if(serverMessageDiv.classList.contains(className)) {
        serverMessageDiv.classList.remove(className);
    }
}