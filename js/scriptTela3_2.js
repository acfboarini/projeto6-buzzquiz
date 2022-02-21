function renderizaPerguntas() {
    let section = document.querySelector(".tela3-2");

    for(let i = 0; i < qntPerguntas; i++){
        section.innerHTML += `
            <article class="pergunta${i+1} container" onclick="ocultar(this)">
                <article>
                    <h2>Pergunta ${i+1}</h2>
                    <ion-icon name="create-outline"></ion-icon>
                </article>

                <article>
                    <div class="pergunta">
                        <input type="text" placeholder="Texto da pergunta">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div>

                    <h3>Resposta Correta</h3>

                    <div class="resposta">
                        <input type="text" placeholder="Resposta correta">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>

                    <h3>Respostas Incorretas</h3>

                    <div class="resposta">
                        <input type="text" placeholder="Resposta incorreta 1">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>

                    <div class="resposta">
                        <input type="text" placeholder="Resposta incorreta 2">
                        <input type="text" placeholder="URL da imagem 2">
                    </div>

                    <div class="resposta">
                        <input type="text" placeholder="Resposta incorreta 3">
                        <input type="text" placeholder="URL da imagem 3">
                    </div>
                </article>
            </article>
        `;
    }
    section.innerHTML += `<button onclick="verificarValores()">Prosseguir para criar Níveis</button>`;
}

function verificarValores() {

    listaPerguntas = [];

    for(let i = 0; i < qntPerguntas; i++){
    
        let classe = document.querySelector(`.pergunta${i+1}`);
        let perguntaQuizz = classe.querySelector(".pergunta");
        let respostas = classe.querySelectorAll(".resposta");

        let objetoPergunta = {
            title: perguntaQuizz.children[0].value,
            color: perguntaQuizz.children[1].value,  
            answers: criarListaRespostas(respostas)
        }
        listaPerguntas.push(objetoPergunta);   
    }
    if(validarDados(listaPerguntas)){
        alert("deu tudo certo!");
        tela3_2.classList.add("escondido");
        tela3_3.classList.remove("escondido");
        renderizaLevels();
        tela3_3.scrollIntoView();
        excluirRespostasVaziasDaListaPergunta();
    }else{
        alert("Preencha os dados corretamente");
    }
}

function criarListaRespostas(respostas) {
    listaResposta = [];
    let objetoResposta = {};

    for(let i = 0; i < respostas.length; i++){
        objetoResposta = {
            text: respostas[i].children[0].value,
            image: respostas[i].children[1].value,
            isCorrectAnswer: isCorreta(i)
        }
        listaResposta.push(objetoResposta);
    }
    return listaResposta;
}

function isCorreta(i) {
    if(i == 0){
        return true;
    }else{
        return false;
    }
}

function excluirRespostasVaziasDaListaPergunta() {
    for(let i = 0; i < listaPerguntas.length; i++) {
        let respostas = [];
        for(let c = 0; c < listaPerguntas[i].answers.length; c++){
            if(listaPerguntas[i].answers[c].text !== "" || listaPerguntas[i].answers[c].image !== ""){
                respostas.push(listaPerguntas[i].answers[c]);
            }
        }
        listaPerguntas[i].answers = respostas;
    }
}

function validarDados(lista) {
    let validar = true;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].title.length < 20){
            validar = false;
        }else if(validarCor(lista[i].color.toLowerCase())){
            validar = false;
        }else if(validarRespostas(lista[i].answers)){
            validar = false;
        }
    }
    return validar;
}

function validarCor(textoCor) {
    let validar = false;
    if(textoCor.length !== 7){
        validar = true;
    }else{
        if(textoCor[0] !== "#"){
            validar = true;
        }else{
            for(let i = 1; i < textoCor.length; i++){
                if(textoCor[i] !== "a" && textoCor[i] !== "b" && textoCor[i] !== "c" && textoCor[i] !== "d" && textoCor[i] !== "e" && textoCor[i] !== "f"){
                    validar = true;
                }
            }
        }
    }
    return validar;
}

function validarRespostas(respostas) {
    let validar = false;
    let contador = 0;
    listaResposta = [];

    if(respostas[0].text == "" || respostas[0].image == ""){
        validar = true;
    }else{
        listaResposta.push(respostas[0]);
        for(let i = 1; i < respostas.length; i++){
            if(respostas[i].text !== ""){
                if(respostas[i].image !== ""){
                    if(respostas[i].image.includes("http")){
                        contador++;
                        listaResposta.push(respostas[i]);
                    }
                }else{
                    validar = true;
                }
            }else{
                if(respostas[i].image !== ""){
                    validar = true;
                }
            }
        }
        if(contador < 1){
            validar = true;
        }
    }
    return validar;
}

/***** funcao do clique na pergunta para ocultar ******/
function ocultar(article) {
    if(article.children[1].classList.contains("escondido")){
        article.children[1].classList.remove("escondido");
    }else{
        article.children[1].classList.add("escondido");
    }
}

/***** variaveis e declaracoes******/
let listaPerguntas = [];
let listaResposta = [];