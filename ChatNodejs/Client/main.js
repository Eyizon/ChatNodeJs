var socket = io.connect('http://localhost:6677',{'forceNew':true});

//lo que emite el servicio lo recoge
socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message,index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.textMessage} </p>
            </div>
            `);
    }).join(' '); 
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

//crea el mensaje lo extrate de los valores dentro de html y usa el socket
//para la funcion request y le envia el mensaje
function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        textMessage: document.getElementById('textMessage').value
    };

    document.getElementById('nickname').style.display = "none";
    socket.emit('add-message',message);
    return false;
}