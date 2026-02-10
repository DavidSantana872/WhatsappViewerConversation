async function getPeopleConversation(){
    let data = await getDataInput()
    let data1 = data.split(' p. m. - ')
    let data2 = data.split(' a. m. - ')
    let i = data1.length - 1
    let user1 = null
    let user2 = null
    for(let j = i; j > 0; j--){
        let actual = data1[j]
        actual = actual.split(':')
        if (user1 == null){
            user1 = actual[0]
        }else{
            user2 = actual[0]
            if(user1 != user2){
                break
            }
        }
    }
    return [user1, user2]
}
async function getDataInput(){
    let file = document.getElementById('inputConversation').files[0];
    let data = await file.text();
    return data;
}
async function showConversation(){
    // element index 0 is rigth and index 1 is left
    let conversationUser = await getPeopleConversation()
      
    // ocultar entrada de archivos
    document.getElementById('sectionInputFile').style.display = "none"
    //sectionSelectWhoYouAre show
    document.getElementById('sectionSelectWhoYouAre').style.display = "block"
    // underline_select poner de hijos options
    for (let user of conversationUser){
        let option = document.createElement("option");
        option.text = user;
        option.value = user;
        document.getElementById("underline_select").appendChild(option);
    }
    loadChats()
}

async function loadChats() {
    document.getElementById("showConversationBtn").style.display = "none"
    let you = document.getElementById('underline_select').value
    // render chats
    let data = await getDataInput()
    data = data.split(`/${new Date().getFullYear()},`)
    // clear 

    let sectionChats = document.getElementById("sectionChats")
    while (sectionChats.firstChild) {
        sectionChats.removeChild(sectionChats.firstChild);
    }
    for (let chat of data){
        
        if(chat.length >= "9/1/2025, 9:55 p. m. -".length){  
            let user = chat.split('-')[1].split(":")[0].trim()
           
            let chatElement = document.createElement('p')
            chatElement.textContent = chat
            // if user is you, class element is right
            if (user === you) {
                chatElement.classList.add('right');
            } else {
                chatElement.classList.add('left');
            }
            sectionChats.appendChild(chatElement)
        }
    }
}

    // Función para hacer scroll hasta el final
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
