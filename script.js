let nomeUsuario = prompt("Qual o seu nome?");
let modelo, gola, tecido, input, image;
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
    const validate = /(https?:\/\/.*\.(?:png|jpg))/i;
    input = document.querySelector('.typeText');
    let linkValido = validate.test(input.value);
        
    if ((modelo !== undefined) && (gola !== undefined) && (tecido !== undefined) /*&& (linkValido === true)*/){

        const ligar = document.querySelector('.confirmar');
        ligar.disabled = false;


        const botaoContinuar = document.querySelector('.confirmar');
        botaoContinuar.classList.add('botaoPronto');
        
    }
}

function enviarPedido(reenvio){
    
    if(reenvio){
        input = image;
    } else {
        input = document.querySelector("input").value;
    }
   

    camisaEncomendada = {
        model: modelo,
        neck: gola,
        material: tecido,
        image: input,
        owner: nomeUsuario,
        author: nomeUsuario
    };
    
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

function refazerPedido(elemento){
    confirm("Deseja refazer este pedido?");
    console.log(elemento)
    if (confirm() == true) {
        modelo = elemento.querySelector(".model").innerHTML;
        gola = elemento.querySelector(".neck").innerHTML;
        tecido = elemento.querySelector(".material").innerHTML;
        owner = elemento.querySelector(".nomeVendido").innerHTML;
        image = elemento.querySelector(".camisaPronta").src;
        
        enviarPedido(true);
      }
}

function renderizarPedidoFeitos(){

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promise.then((res) => {
        let pedidosFeitos = document.querySelector(".ultimosPedidos");
        
        for(let i = 0; i < res.data.length ; i++){
            pedidosFeitos.innerHTML += `
                    <div onclick="refazerPedido(this)" class="caixa">
                        <img class="camisaPronta" src="${res.data[i].image}">
                        <div class="textoVendido">
                            <span class="strong">Criador:&nbsp;</span>
                            <span class="nomeVendido">${res.data[i].owner}</span>
                            <p class="material escondido">${res.data[i].material}</p>
                            <p class="model escondido">${res.data[i].model}</p>
                            <p class="neck escondido">${res.data[i].neck}</p>
                            <p class="id escondido">${res.data[i].id}</p>
                        </div>
                    </div>
            `
        }
       
    })
    
    promise.catch((error) => {
        console.log("Erro na renderização dos últimos pedidos")
    })
    
}

renderizarPedidoFeitos();


