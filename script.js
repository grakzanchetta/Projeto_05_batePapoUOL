let usuario = 0;

function obterUsuário (){
    usuario = prompt ("Digite seu nome");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: usuario });
    promise.catch(obterUsuário);
    promise.then(obterMensagens);

}

function obterMensagens (resposta){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(resposta => {
        console.log(resposta.data);
        
      });

}





obterUsuário();