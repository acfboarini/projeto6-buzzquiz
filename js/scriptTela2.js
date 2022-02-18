/*const LINK_API = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;

// let promiseApi = axios.get(LINK_API);
promiseApi.catch(erro => console.error(erro))
promiseApi.then(ObjetoRecebido);

/* --- Recebe o objeto ---*/
/*function ObjetoRecebido(respostaServidor) {
    console.log(respostaServidor.data);
    desmontarObjeto(respostaServidor.data[27]) // pegando um quiz qualquer
    renderizarTituloQuiz();
}


/* --- Coloca os itens do objeto em variaveis ---*/
/*let id, titulo, imagem, niveis, perguntas;
function desmontarObjeto(objetoServidor) {
    id = objetoServidor.id;
    titulo = objetoServidor.title;
    imagem = objetoServidor.image;
    niveis = objetoServidor.levels; //array
    perguntas = objetoServidor.questions; //array
}

/* --- Coloca os itens do objeto PERGUNTAS em variaveis ---*/
/*let perguntaTitulo, perguntaCor, respostas;
function desmontarPerguntas(pergunta) {
    perguntaTitulo = pergunta.title;
    perguntaCor = pergunta.color;
    respostas = pergunta.answers;
    renderizarPerguntasQuiz(perguntaTitulo, perguntaCor, respostas);
}
/* --- Coloca os itens do objeto RESPOSTA em variaveis ---*/
/*let respostaTexto, respostaImagem, respostaECorreta;
function desmontarRespostas(resposta) {
    respostaTexto = resposta.text;
    respostaImagem = resposta.image;
    respostaECorreta = resposta.isCorrect;
    renderizarRespostas(respostaTexto, respostaImagem, respostaECorreta);
}
/* --- Renderiza o título do quiz com a imagem de fundo ---*/
/*function renderizarTituloQuiz() {
    const mainTela2 = document.querySelector(".tela2");
    mainTela2.innerHTML = `
        <main class="quiz">
            <!-- Nome do quiz com a imagem de fundo -->
            <figure class="titulo-quiz">
                    <img src=${imagem} />
                    <p>${titulo}</p>
            </figure>
        </main>
      `
    perguntas.forEach(desmontarPerguntas);
}

/* --- Renderiza as perguntas do quiz ---*/
/*function renderizarPerguntasQuiz(tituloPergunta, corPergunta,respostas) {

    const mainQuiz = document.querySelector(".tela2 .quiz");
    mainQuiz.innerHTML += `
    <!-- Uma pergunta do quiz -->
    <section class="pergunta-quiz">
        <div class="titulo-pergunta">${tituloPergunta}</div>
        <section class="bloco-imagens">
        </section>
    </section>
    `
    respostas.forEach(desmontarRespostas)
}

/* --- Era pra renderizar as respostas de acordo com as perguntas ---*/
/*function renderizarRespostas(texto, imagem, isCorret){
    console.log(texto) // consigo receber as respostas normalmente


    /*--- testei da forma que a gente fazia mas não deu certo ---*/
    
    // let elemento = document.querySelector(".bloco-imagens");
    // elemento.innerHTML += `
    //     <figure onclick="clickNaResposta(this)">
    //         <img src=${imagem} />
    //         <figcaption>${texto}</figcaption>
    //     </figure>
    // `
//}

function clickNaResposta(elemento) {
    console.log(elemento);
}