// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const typingIndicator = document.querySelector('.typing-indicator');

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
  chatroom.setTypingStatus(false);
});

// detect typing
newChatForm.message.addEventListener('input', () => {
  chatroom.setTypingStatus(newChatForm.message.value.length > 0);
});

// update the username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
    chatroom.getTypingStatus(data => chatUI.showTypingIndicator(data));
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList, typingIndicator);
const chatroom = new Chatroom('gaming', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));
chatroom.getTypingStatus(data => chatUI.showTypingIndicator(data));
