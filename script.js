let usuario = 0;
let infoResposta = "";

function obterUsuário (){
    usuario = prompt ("Digite seu nome");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: usuario});
    promise.catch(obterUsuário);
    promise.then(manterConexao);
    promise.then(obterMensagens);
    promise.then(renderizarMensagens);
}

function manterConexao(resposta) {
	const statusCode = resposta.status;
	console.log(statusCode);

    setInterval (function (){
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name: usuario});
        promise.then(resposta => console.log(resposta.status));
        promise.catch(resposta => console.log(erro.resposta.status));
    }, 5000);
}

function obterMensagens(resposta){
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promise.then(resposta => { 
            infoResposta = resposta.data;
            setInterval(obterMensagens, 3000);
            renderizarMensagens(infoResposta);
            colocarUltimaMensagem();
            return(infoResposta);    
        });
        promise.catch( erro => {
            alert(erro.resposta.status);
        })        
}

function renderizarMensagens(infoResposta){
    
    const lista = document.querySelector(".lista-de-mensagens");
    lista.innerHTML = "";

    let textoHTML = null;

    for (let i = 0; i < infoResposta.length; i++){
        let remetente = infoResposta[i].from;
        let destinatario = infoResposta[i].to;
        let mensagem = infoResposta[i].text;
        let tipo = infoResposta[i].type;
        let hora = infoResposta[i].time;
    
        if(tipo === "status") {
            textoHTML = `<ul class = "lista-de-mensagens"><li class="mensagem-status"><span class="horario-mensagem">${hora}</span><span class="usuario">${remetente}</span><span class="mensagem">${mensagem}</span> </li></ul>`
        }

        if(tipo === "message") {
            textoHTML = `<ul class = "lista-de-mensagens"><li class="mensagem-publica"><span class="horario-mensagem">(09:21:45)</span><span class="remetente">João</span><b>para</b><span class="destinatario">Maria</span><b>:</b><span class="mensagem">Esta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publica</span></li></ul>`
        }

        if(tipo === "private_message") {
            textoHTML = `<ul class = "lista-de-mensagens"><li class="mensagem-privada"><span class="horario-mensagem">(09:21:45)</span><span class="remetente">João</span><b>para</b><span class="destinatario">Maria</span><b>:</b><span class="mensagem">Esta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publicaEsta é uma mensagem publica</span></li></ul>`
        }
    
        lista.innerHTML += textoHTML;
    }

}

function colocarUltimaMensagem (){
    const ultimo = document.querySelector(".corpo-mensagens .lista-mensagens");
    const ultimaMensagem = ultimo.lastElementChild;
    ultimaMensagem.scrollIntoView();
}

obterUsuário();








