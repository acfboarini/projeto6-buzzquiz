function renderizaLevels() {
    let section = document.querySelector(".tela3-3");

    for(let i = 0; i < qntLevels; i++){
        section.innerHTML += `
            <article class="level${i+1} container">
                <article  onclick="ocultar(this)">
                    <h2>Nivel ${i+1}</h2>
                    <ion-icon name="create-outline"></ion-icon>
                </article>
                <div>
                    <input type="text" placeholder="Título do nível">
                    <input type="number" placeholder="% acerto mínima">
                    <input type="text" placeholder="URL da imagem do nível">
                    <textarea type="text" placeholder="Descricao do nível"></textarea>
                </div>
            </article>
        `;
    }
    section.innerHTML += `<button onclick="verificarLevels()">Finalizar Quizz</button>`;
}

function verificarLevels() {

    listaLevels = [];
    
    for(let i = 0; i < qntLevels; i++){
    
        let classe = document.querySelector(`.level${i+1}`);
        let input = classe.querySelectorAll("input");
        let textarea = classe.querySelector("textarea");
        
        let objetoLevel = {
            title: input[0].value,
            image: input[2].value,  
            text: textarea.value,
            minValue: parseInt(input[1].value),
        }
        listaLevels.push(objetoLevel);
    }
    if(validarDadosLevel(listaLevels)){
        tela3_3.classList.add("escondido");
        tela3_4.classList.remove("escondido");
        alert("deu tudo certo");
        finalizarQuizz();

    }else{
        alert("preencha os dados corretamente");
    }
}

function validarDadosLevel(lista) {
    let validar = true;

    for(let i = 0; i < lista.length; i++){
        if(lista[i].title.length < 10){
            validar = false;
        }else if(lista[i].minValue < 0 || lista[i].minValue > 100){
            validar = false;
        }else if(!(lista[i].image.includes("http"))){
            validar = false;
        }else if(lista[i].text.length < 30){
            validar = false;
        }
    }
    if(verificaLevelZero(lista)){
        validar = false;
    }
    return validar;
}

function verificaLevelZero(lista) {
    let validar = true;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].minValue === 0){
            validar = false;
        }
    }
    return validar;
}

function finalizarQuizz() {
    let quizz = {
        title: tituloQuiz,
        image: urlImagem,
        questions: listaPerguntas,
        levels: listaLevels
    };
    console.log(quizz);
    let request = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);
    request.then(resposta => {
        console.log(resposta.data);
    });
}

let listaLevels = [];