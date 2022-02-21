lista_quizzes = null;

function iniciarTela1() {
    if(lista_quizzes !== null){
        const noQuiz = document.querySelector('main section.no-quizz');
        noQuiz.classList.add('escondido');
    }else{
        const noQuiz = document.querySelector('main section.user-quizzes');
        noQuiz.classList.add('escondido');
    }

    let request = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    request.then(resposta => {
        renderizarQuizzes(resposta.data);
    })
}

/* --- renderiza quizzes do servidor --- */
function renderizarQuizzes(lista_quizzes) {
    const generalQuizzes = document.querySelector(".general-quizzes .lista-quizzes");
    for(let i = 0; i < lista_quizzes.length; i++){
        generalQuizzes.innerHTML += `
        <article class="quizz-card" onclick="clickQuiz(${lista_quizzes[i].id})">
            <p>${lista_quizzes[i].title}</p>
        </article>
        `;
        adicionarImagemDeFundo(i, lista_quizzes[i]);
    }
}

function adicionarImagemDeFundo(i, quizz) {
    let quizz_card = document.querySelectorAll(".tela1 .quizz .quizz-card");
    quizz_card[i].style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url(${quizz.image})`;
}

/* --- Click em um quiz --- */
function clickQuiz(id){
    esconderTela1()
    carregarQuizEspecifico(id) //função tela 2
}

/* --- esconde a tela 1  e abre a tela2 --- */
function esconderTela1(){
    const tela1 = document.querySelector('main.tela1');
    tela1.classList.add('escondido');
    const tela2 = document.querySelector('main.tela2');
    tela2.classList.remove('escondido')
}

iniciarTela1();