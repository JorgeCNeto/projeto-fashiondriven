let nomeUsuario = prompt("Qual o seu nome?");
let modelo, gola, tecido, input;
let camisaEncomendada = [];


function desmarcacaoAnterior(seletor){
    const caixaSelecionada = document.querySelector(`${seletor} .selecionado`);
    if (caixaSelecionada !== null){
        caixaSelecionada.classList.remove('selecionado');
    }
}

function selecionarmodelo(modeloselecionado){
    desmarcacaoAnterior('.modelos');
    modeloselecionado.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    modelo = modeloselecionado.querySelector('.nomeImagem').innerHTML;
    if(modelo === "T-shirt"){
        modelo = "t-shirt";
    } else if(modelo === "Camiseta"){
        modelo = "top-tank"
    } else {
        modelo = "long"
    }
    
    verificadordecompra();
}

function selecionargola(golaselecionada){
    desmarcacaoAnterior('.golas');
    golaselecionada.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    gola = golaselecionada.querySelector('.nomeImagem').innerHTML;
    if(gola === "Gola V"){
        gola = "v-neck";
    } else if(gola === "Gola Redonda"){
        gola = "round"
    } else {
        gola = "polo"
    }
    verificadordecompra();
}

function selecionartecido(tecidoselecionada){
    desmarcacaoAnterior('.tecidos');
    tecidoselecionada.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    tecido = tecidoselecionada.querySelector('.nomeImagem').innerHTML;
    if(tecido === "Seda"){
        tecido = "silk";
    } else if(tecido === "Algodão"){
        tecido = "cotton"
    } else {
        tecido = "polyester"
    }
    verificadordecompra();
}


function verificadordecompra(){
        
    if ((modelo !== undefined) && (gola !== undefined) && (tecido !== undefined) && ((input !== undefined) && (input !== ''))){

        const ligar = document.querySelector('.confirmar');
        ligar.disabled = false;


        const botaoContinuar = document.querySelector('.confirmar');
        botaoContinuar.classList.add('botaoPronto');
        
    }
}

function enviarPedido(){
    
    camisaEncomendada = {
        model: modelo,
        neck: gola,
        material: tecido,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FFicheiro%3APac_Man.svg&psig=AOvVaw2ocjCTRgRjqaQ8o_8HMV24&ust=1675455158671000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPDUrf7S9_wCFQAAAAAdAAAAABAE",
        owner: nomeUsuario,
        author: nomeUsuario
    }
    console.log(camisaEncomendada)
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", camisaEncomendada);
    promise.then((res) => {
        alert('Encomenda confirmada!')
        renderizarPedidoFeitos();
    })
    promise.catch((error) => {
        alert('Ops, não conseguimos processar sua encomenda')
    })
}


///////////// fim do envio do pedido

function refazerPedido(){

}

function renderizarPedidoFeitos(){

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promise.then((res) => {
        console.log(res.data)
        let pedidosFeitos = document.querySelector(".ultimosPedidos");
        
        for(let i = 0; i < res.data.length ; i++){
            pedidosFeitos.innerHTML += `
                    <div onclick="refazerPedido()" class="caixa">
                        <img class="camisaPronta" src="${res.data[i].image}">
                        <div class="textoVendido">
                            <span class="strong">Criador:&nbsp;</span>
                            <span class="nomeVendido">${res.data[i].owner}</span>
                        </div>
                    </div>
            `
        }
    })
    promise.catch((error) => {
        console.log("erro na renderização dos últimos pedidos")
    })
    
}

renderizarPedidoFeitos();


