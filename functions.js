async function getPeopleConversation(){
    let data = await getDataInput();
    let messages = parseMessages(data);

    let users = [];
    for (let msg of messages){
        if (!users.includes(msg.user)){
            users.push(msg.user);
        }
        if (users.length === 2) break;
    }

    return users;
}

async function getDataInput(){
    let file = document.getElementById('inputConversation').files[0];
    let data = await file.text();
    return data;
}

// parser REAL para WhatsApp
function parseMessages(data){
    const regex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}.*?) - ([^:]+): (.*)$/gm;
    let matches;
    const messages = [];

    while ((matches = regex.exec(data)) !== null) {
        messages.push({
            datetime: matches[1].trim(),
            user: matches[2].trim(),
            message: matches[3].trim()
        });
    }

    return messages;
}

async function showConversation(){

    let conversationUser = await getPeopleConversation();

    document.getElementById('sectionInputFile').style.display = "none";
    document.getElementById('sectionSelectWhoYouAre').style.display = "block";

    let select = document.getElementById("underline_select");
    select.innerHTML = "";

    for (let user of conversationUser){
        let option = document.createElement("option");
        option.text = user;
        option.value = user;
        select.appendChild(option);
    }

    loadChats();
}

async function loadChats() {

    document.getElementById("showConversationBtn").style.display = "none";

    let you = document.getElementById('underline_select').value;
    let data = await getDataInput();

    let messages = parseMessages(data);

    let sectionChats = document.getElementById("sectionChats");
    sectionChats.innerHTML = "";

    for (let msg of messages){

        let chatElement = document.createElement('p');
        chatElement.textContent = `${msg.datetime} - ${msg.user}: ${msg.message}`;

        if (msg.user === you) {
            chatElement.classList.add('right');
        } else {
            chatElement.classList.add('left');
        }

        sectionChats.appendChild(chatElement);
    }

    scrollToBottom();
}

// scroll
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
