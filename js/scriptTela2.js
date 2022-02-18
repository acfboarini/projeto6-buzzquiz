const LINK_API = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;

let promiseApi = axios.get(LINK_API);
promiseApi.catch(erro => console.error(erro))
promiseApi.then(ObjetoRecebido);

/* --- Recebe o objeto ---*/
function ObjetoRecebido(respostaServidor) {
    console.log(respostaServidor.data);
    desmontarObjeto(respostaServidor.data[11]) // pegando um quiz qualquer ALTERAR POSTERIORMENTE
    renderizarTituloQuiz();
    setTimeout(validarParaColocarNaTela); // exibe as resposta na tela
}


/* --- Coloca os itens do objeto em variaveis ---*/
let id, titulo, imagem, niveis, perguntas;
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
    respostaECorreta = resposta.isCorrect;
    deixarRespostaAleatoria(respostaTexto, respostaImagem, respostaECorreta, index);
    // renderizarRespostas(respostaTexto, respostaImagem, respostaECorreta, index);

}

/* --- Renderiza o título do quiz com a imagem de fundo ---*/
function renderizarTituloQuiz() {
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
function renderizarPerguntasQuiz(tituloPergunta, corPergunta,respostas, index) {

    const mainQuiz = document.querySelector(".tela2 .quiz");
    mainQuiz.innerHTML += `
    <!-- Uma pergunta do quiz -->
    <section id="pergunta-${index}"  class="pergunta-quiz">
        <div class="titulo-pergunta">${tituloPergunta}</div>
        <section class="bloco-imagens">
        </section>
    </section>
    `
    respostas.forEach(function(item){
        desmontarRespostas(item, index)})
}
/* --- embaralha as respostas ---*/
objetoRespostas = []
function deixarRespostaAleatoria(texto, imagem, isCorret, index){
    objeto = {
        text: texto,
        image: imagem,
        isCorret: isCorret,
        i: index
    }
    objetoRespostas.push(objeto);
    objetoRespostas.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5; 
}

/* --- chama a função renderizarRespostas para cada item do objeto --- */
function validarParaColocarNaTela(){
    objetoRespostas.forEach(function(item){
        renderizarRespostas(item.text, item.image,item.isCorrect, item.i)
    })
}

/* --- Era pra renderizar as respostas de acordo com as perguntas ---*/
function renderizarRespostas(texto, imagem, isCorret, index){

    let elemento = document.querySelector(`#pergunta-${index} .bloco-imagens`);
    elemento.innerHTML += `
        <figure onclick="clickNaResposta(this)">
            <img src=${imagem} />
            <figcaption>${texto}</figcaption>
        </figure>
    `
}


function clickNaResposta(elemento) {
    console.log(elemento);
}