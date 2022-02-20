const LINK_API = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;
let qntPerguntas = 0;
let qntClick = 0;
let qntAcertos = 0;
let posicaoScroll = []; // recebe as coordenadas do scroll em cada pergunta

/* --- função chamada na tela1 passando o id do quiz--- */
function carregarQuizEspecifico(ID){
    let promiseApi = axios.get(`${LINK_API}/${ID}`);
    promiseApi.catch(erro => console.error(erro))
    promiseApi.then(ObjetoRecebido);
}

/* --- Recebe o objeto ---*/
let objetoEspecifico = {};
function ObjetoRecebido(respostaServidor) {
    objetoEspecifico = respostaServidor.data // Alterar posteriormente"
    carregarTela(objetoEspecifico);
}
/* --- Carrega toda a tela com o objeto do servidor --- */
let id, titulo, imagem, niveis, perguntas;
function carregarTela(dadosServidor) {

    function inicializador() {
        desmontarObjeto(dadosServidor) // pegando um quiz qualquer ALTERAR POSTERIORMENTE
        renderizarTituloQuiz();
        setTimeout(validarParaColocarNaTela, 50); // exibe as resposta na tela
    }


    /* --- Coloca os itens do objeto em variaveis ---*/
    function desmontarObjeto(objetoServidor) {
        id = objetoServidor.id;
        titulo = objetoServidor.title;
        imagem = objetoServidor.image;
        niveis = objetoServidor.levels; //array
        perguntas = objetoServidor.questions; //array
    }

    /* --- Coloca os itens do objeto PERGUNTAS em variaveis ---*/
    let perguntaTitulo, perguntaCor, respostas;
    function desmontarPerguntas(pergunta, index) {
        perguntaTitulo = pergunta.title;
        perguntaCor = pergunta.color;
        respostas = pergunta.answers;
        renderizarPerguntasQuiz(perguntaTitulo, perguntaCor, respostas, index);
    }

    /* --- Coloca os itens do objeto RESPOSTA em variaveis ---*/
    let respostaTexto, respostaImagem, respostaECorreta;
    function desmontarRespostas(resposta, index) {
        respostaTexto = resposta.text;
        respostaImagem = resposta.image;
        respostaECorreta = resposta.isCorrectAnswer;
        deixarRespostaAleatoria(respostaTexto, respostaImagem, respostaECorreta, index);
    }

    /* --- embaralha as respostas ---*/
    objetoRespostas = []
    function deixarRespostaAleatoria(texto, imagem, isCorret, index) {
        objeto = {
            text: texto,
            image: imagem,
            isCorrect: isCorret,
            i: index
        }
        objetoRespostas.push(objeto);
        objetoRespostas.sort(comparador);
    }

    /* --- Renderiza o título do quiz com a imagem de fundo ---*/
    function renderizarTituloQuiz() {

        const mainTela2 = document.querySelector(".tela2");
        mainTela2.innerHTML = `
        <main class="quiz">
            <!-- Nome do quiz com a imagem de fundo -->
            <figure class="titulo-quiz">
                    <div class="imagem"</div>
                    <p>${titulo}</p>
            </figure>
        </main>
      `
        const divImagem = document.querySelector(".tela2 .titulo-quiz .imagem");
        divImagem.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url(${imagem})`
        divImagem.style.backgroundSize = `100vw 142px`
        perguntas.forEach(desmontarPerguntas);
    }

    /* --- Renderiza as perguntas do quiz ---*/
    function renderizarPerguntasQuiz(tituloPergunta, corPergunta, respostas, index) {

        const mainQuiz = document.querySelector(".tela2 .quiz");
        mainQuiz.innerHTML += `
    <!-- Uma pergunta do quiz -->
    <section id="pergunta-${index}"  class="pergunta-quiz" data-identifier="question">
        <div class="titulo-pergunta">${tituloPergunta}</div>
        <section class="bloco-imagens">
        </section>
    </section>
    `
        const divTitulo = document.querySelector(`#pergunta-${index} .titulo-pergunta`)
        divTitulo.style.backgroundColor = `${corPergunta}`
        pregarDadosScroll(divTitulo, index);
        respostas.forEach(function (item) {
            desmontarRespostas(item, index)
        })
        qntPerguntas += 1;
    }
    /* --- recebe dados da posiçao na tela de cada pergunta ---*/
    function pregarDadosScroll(elemento, index) {
        id = `pergunta-${index}`;
        posicaoY = elemento.getBoundingClientRect().y;
        objetoPosicao = {
            id: id,
            y: posicaoY
        }
        posicaoScroll.push(objetoPosicao);
    }

    /* --- renderizar as respostas de acordo com as perguntas ---*/
    let indiceImagem = 0;
    function renderizarRespostas(texto, imagem, isCorret, index) {

        let elemento = document.querySelector(`#pergunta-${index} .bloco-imagens`);
        elemento.innerHTML += `
        <figure onclick="clickNaResposta(this)" iscorrect="${isCorret}" data-identifier="answer">
            <div class="imagem-${indiceImagem}"></div>
            <figcaption>${texto}</figcaption>
        </figure>
    `
        const imagemResposta = document.querySelector(`#pergunta-${index} .bloco-imagens figure .imagem-${indiceImagem}`);
        imagemResposta.style.backgroundImage = `url(${imagem})`
        imagemResposta.style.backgroundSize = `cover`
        indiceImagem += 1;
    }


    /* --- chama a função renderizarRespostas para cada item do objeto --- */
    function validarParaColocarNaTela() {
        objetoRespostas.forEach(function (item) {
            renderizarRespostas(item.text, item.image, item.isCorrect, item.i)
        })
    }


    function comparador() {
        return Math.random() - 0.5;
    }

    /* --- verifica a cada 50ms se a função é verdadeira ----*/
    let intervalo = setInterval(function () {
        if (qntClick >= 1) {
            if (qntClick === qntPerguntas) {
                clearInterval(intervalo);
                calcularResultado();
            }
        }

    }, 50)

    inicializador();
}

/* --- recebe o elemento que foi clicado ---- */
function clickNaResposta(elemento) {
    divImagens = [...elemento.parentNode.children]
    elemento.classList.add('selecionado');
    divImagens.forEach((elemento) => { elemento.setAttribute('onclick', ""); });
    divImagens.forEach(verificarSeFoiSelecionado);
    qntClick += 1;
    setTimeout(()=>scrollarTela(elemento),2000)
    
}

function scrollarTela(elementoHtml) {
    elementoAvoId = elementoHtml.parentNode.parentNode.id
    for(let i=0; i<posicaoScroll.length; i++){
        if(posicaoScroll[i].id === elementoAvoId){
            if(posicaoScroll[i+1]===undefined || posicaoScroll[i+1]===null){
                // ultima posição 
                setTimeout(()=>window.scrollBy(0,window.innerHeight),500)
                window.scrollBy(0,window.innerHeight);
            }else{
                window.scrollBy(0,(posicaoScroll[i+1].y)+30);
            }
        }
    }
}


/*--- Verfica quais elementos do array não foram selecinados ---*/
function verificarSeFoiSelecionado(elemento) {
    verificarSeECorreta(elemento)
    if (!elemento.classList.contains("selecionado")) {
        esbraquicarRestoRespostas(elemento);
    }
}

/* --- Verifica é a resposta correta ou não ---*/
function verificarSeECorreta(resposta) {
    if (resposta.getAttribute('iscorrect') === "true") {
        mudarCorTextoVerde(resposta)
        verificarSeContemSelecinado(resposta)

    } else {
        mudarCorTextoVermelho(resposta)
    }
}

/* --- deixa o fundo esbraquiçado ---*/
function esbraquicarRestoRespostas(divImagem) {
    divImagem.style.opacity = `0.3`
}

/* --- mudar a cor do texto pra vermelho ---*/
function mudarCorTextoVermelho(divImagem) {
    divImagem.children[1].classList.add('texto-vermelho');
}

/* --- mudar a cor do texto pra verde ---*/
function mudarCorTextoVerde(divImagem) {
    divImagem.children[1].classList.add('texto-verde')
}

/* --- verifica se acertou o click ou não ----*/
function verificarSeContemSelecinado(resposta) {
    if (resposta.classList.contains('selecionado')) {
        qntAcertos += 1;
    }
}


/* --- calcula o resultado da porcentagem ---*/
let porcentagem = 0;
function calcularResultado() {
    porcentagem = Math.round((qntAcertos * 100) / qntPerguntas);
    receberDadosResultado();
    lerResultado()
}


/* --- separa os valores minimos em um array --- */
let arrayNiveisMinValue = []
function receberDadosResultado() {
    niveis.forEach((nivel) => {
        arrayNiveisMinValue.push(nivel.minValue)
    })

    arrayNiveisMinValue.forEach(verificarNivel)
}

/* ---- compara os valores min do array com a porcentagem ---*/
let valorNivel = 0;
function verificarNivel(valorMinimo, index) {
    if (porcentagem >= valorMinimo) {
        valorNivel = valorMinimo;
    }
}

/*--- verifica se o valor do array é igual ao valor minimo do objeto ---*/
function lerResultado() {
    niveis.forEach(function (nivel) {
        if (nivel.minValue === valorNivel) {
            renderizarResultadoFinal(nivel);
        }
    })
}

/* --- Renderiza o resultado final na tela  --- */
function renderizarResultadoFinal(nivelFinal) {
    const quizMain = document.querySelector('.tela2 .quiz');
    quizMain.innerHTML += `
    <!-- Resultado Final do quiz -->
    <section class="pergunta-quiz resultado-quiz" data-identifier="quizz-result">
        <div class="titulo-pergunta">${porcentagem}% ${nivelFinal.title}!</div>
        <section class="imagem-resultado">
            <img src=${nivelFinal.image} />
            <p>${nivelFinal.text}</p>
        </section>
    </section>
    <button class="reinicar-quiz" onclick="reinicarQuiz()">Reiniciar Quizz</button>
    <button class="voltar-home" onclick="voltarHome()">Voltar para home</button>
     `
}

function reinicarQuiz() {
    resetarVariaveisEElementos();
    carregarTela(objetoEspecifico)
}

function resetarVariaveisEElementos(){
    qntPerguntas = 0;
    qntClick = 0;
    qntAcertos = 0;
    let elementosSelecionados = document.querySelectorAll('.bloco-imagens figure');
    elementosSelecionados.forEach(function (item) {
        item.classList.remove('selecionado')
    })
}

function voltarHome() {
    // voltar para o menu
    esconderTela2()

}

function esconderTela2(){
    const tela1 = document.querySelector('main.tela2');
    tela1.classList.add('escondido');
    const tela2 = document.querySelector('main.tela1');
    tela2.classList.remove('escondido')
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}