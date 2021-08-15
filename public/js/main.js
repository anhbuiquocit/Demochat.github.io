const chatForm = document.getElementById('chat-form')

//Get user name form URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
// console.log(username)
const socket = io()
// Get message from server
socket.on('message', message =>{
    console.log(message)
    outputMessage(message.username, message.content, message.time)

    socket.emit('username', username);
})

// Message submit

chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value
    
    // emit message to server
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = ''
})


function outputMessage(username, message, time){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${username} <span>${time}</span></p>
    <p class="text">
       ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
}