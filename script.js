let usuario = 0;

function obterUsuário (){
    usuario = prompt ("Digite seu nome");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: usuario});
    promise.catch(obterUsuário);
    promise.then(manterConexao);
    promise.then(obterMensagens);
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
            console.log(resposta.data);
        });
        setInterval(obterMensagens, 3000);
}




obterUsuário();








