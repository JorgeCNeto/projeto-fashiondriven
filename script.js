//let nomeUsuario = prompt("Qual o seu nome?");
let modelo, gola, tecido;

function desmarcacaoAnterior(seletor){
    const caixaSelecionada = document.querySelector(`${seletor} .selecionado`);
    if (caixaSelecionada !== null){
        caixaSelecionada.classList.remove('selecionado');
    }
}

function selecionarmodelo(modeloselecionado){
    desmarcacaoAnterior('.modelos');
    modeloselecionado.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    modelo = modeloselecionado.innerHTML;
    verificadordecompra();
}

function selecionargola(golaselecionada){
    desmarcacaoAnterior('.golas');
    golaselecionada.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    gola = golaselecionada.innerHTML;
    verificadordecompra();
}

function selecionartecido(tecidoselecionada){
    desmarcacaoAnterior('.tecidos');
    tecidoselecionada.querySelector('.ajusteImagem').querySelector('.fundo').classList.add('selecionado');
    tecido = tecidoselecionada.innerHTML;
    verificadordecompra();
}

function verificadordecompra(){
    console.log(modelo)
    console.log(gola)
    console.log(tecido)
    if ((modelo !== undefined) && (gola !== undefined) && (tecido !== undefined)){

        const ligar = document.querySelector('.confirmar');
        ligar.disabled = false;


        const botaoContinuar = document.querySelector('.confirmar');
        botaoContinuar.classList.add('botaoPronto');
        
    }
}