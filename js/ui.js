class ChatUI {
    constructor(list, typingIndicator){
      this.list = list;
      this.typingIndicator = typingIndicator;
    }
    clear(){
      this.list.innerHTML = '';
    }
    render(data){
      const when = dateFns.distanceInWordsToNow(
        data.created_at.toDate(),
        { addSuffix:true }
      );
      const html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${data.message}</span>
          <div class="time">${when}</span>
        </li>
      `;
      this.list.innerHTML += html;
    }

    showTypingIndicator(data){
      if(data.isTyping) {
        this.typingIndicator.innerHTML = `${data.username} is typing...`;
      } else {
        this.typingIndicator.innerHTML = '';
      }
    }
}
