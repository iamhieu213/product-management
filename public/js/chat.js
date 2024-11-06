// var socket = io();

const innerForm = document.querySelector('[inner-form]');
if(innerForm) {
    innerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content  = e.target.elements[0].value;
        socket.emit('client_send_message', content);
        e.target.elements[0].value = '';
    });
}

socket.on('server_return_message', (data) => {
    console.log(data);
    const chatFrame = document.querySelector('.chat-messages[my-id]');
    const userId = chatFrame.getAttribute('my-id');
    const div = document.createElement('div');
    if(data.userId == userId) {
        div.classList.add('message', 'sent');
    }
    else{
        div.classList.add('message', 'received');
    }
    div.innerHTML = `
        <span class="time">${data.userId != userId?data.fullName:''}</span>
        <p>${data.content}</p>
    `;
    chatFrame.appendChild(div);
})