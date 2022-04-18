let usuario = 0;
let infoResposta = "";

function obterUsuário (){
    usuario = prompt ("Digite seu nome");
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: usuario});
    promise.catch(obterUsuário);
    promise.then(() => {
        obterMensagens();
        setInterval(obterMensagens, 3000);
        setInterval(manterConexao, 5000);
    });
}

function manterConexao(resposta) {
        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: usuario});
        promise.then(resposta => console.log(resposta.status));
        promise.catch(resposta => console.log(resposta.status));
}

function obterMensagens(resposta){
        const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
        promise.then((resposta) => { 
            renderizarMensagens(resposta.data);
            scrollNoFim(); 
        });
        promise.catch( erro => {
            alert(erro.resposta.status);
        })     
}

function renderizarMensagens(infoResposta){
    
    const lista = document.querySelector(".lista-de-mensagens");
    lista.innerHTML = "";
    
    for (let i = 0; i < infoResposta.length; i++){
        let remetente = infoResposta[i].from;
        let destinatario = infoResposta[i].to;
        let mensagem = infoResposta[i].text;
        let tipo = infoResposta[i].type;
        let hora = infoResposta[i].time;

        if(tipo === "status") {
            lista.innerHTML += `<li class="mensagem-status"><span class="horario-mensagem">${hora}</span><span class="usuario">${remetente}</span><span class="mensagem">${mensagem}</span> </li>`
        }

        if(tipo === "message") {
            lista.innerHTML += `<li class="mensagem-publica"><span class="horario-mensagem">${hora}</span><span class="remetente">${remetente}</span><b>para</b><span class="destinatario">${destinatario}</span><b>:</b><span class="mensagem">${mensagem}</span></li>`
        }

        if(tipo === "private_message") {
            if ((destinatario === usuario) || (remetente === usuario)){
                lista.innerHTML += `<li class="mensagem-privada"><span class="horario-mensagem">${hora}</span><span class="remetente">${remetente}</span><b>para</b><span class="destinatario">${destinatario}</span><b>:</b><span class="mensagem">${mensagem}</span></li>`
            }    
        }   
    }
}
 
function scrollNoFim() {
    const ul = document.querySelector("main ul");
    const ultimaMensagem = ul.lastElementChild;
    ultimaMensagem.scrollIntoView();
}

function enviarMensagem() {
    const input = document.querySelector("footer input");
    const mensagem = input.value;
    const infoMensagem = {
        from: usuario,
        to: "Todos",
        text: mensagem,
        type: "message"
    }
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", infoMensagem);
    promise.catch(function (erro) {
        console.log(erro.response.status);
        alert("A mensagem não foi enviada! Por favor, entre novamente.");
        window.location.reload();
      });
    
    promise.then(function(resposta){
        console.log(resposta.status);
        console.log(infoMensagem);
        obterMensagens(resposta);
    });
      
    input.value = ""; 
}

obterUsuário();