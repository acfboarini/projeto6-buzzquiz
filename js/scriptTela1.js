lista_quizzes = null;

let request = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

request.then(resposta => {
    console.log(resposta.data)
    renderizarQuizzes(resposta.data);
})

function renderizarQuizzes(lista_quizzes) {
    const generalQuizzes = document.querySelector(".general-quizzes .lista-quizzes");
    for(let i = 0; i < lista_quizzes.length; i++){
        generalQuizzes.innerHTML += `
        <article class="quizz-card">
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