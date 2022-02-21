function prosseguirParaPerguntas(){
    if(validarInputs()){
        receberDadosInput();
        tela3_1.classList.add("escondido");
        tela3_2.classList.remove("escondido");
        renderizaPerguntas();
        tela3_2.scrollIntoView();
    }else{
        alert("Preencha os dados corretamente");
    }
}

/*---  valida os inputs ---*/
function validarInputs(){
    if(inputTitulo.value.length > 20 && inputTitulo.value.length < 65){
        if(inputURL.value.includes("http") === true){
            if(inputQntPerguntas.value >= 3){
                if(inputqntLevels.value >= 2){
                    return true
                }
            }
        }
    }else {
        return false
    }
}


function receberDadosInput(){
    tituloQuiz = inputTitulo.value;
    urlImagem = inputURL.value;
    qntPerguntas = parseInt(inputQntPerguntas.value);
    qntLevels = parseInt(inputqntLevels.value);
}

/*------ variaveis e declaraçoes ------*/
const inputTitulo = document.querySelector(".tela3-1 .titulo");
const inputURL = document.querySelector(".tela3-1 .url");
const inputQntPerguntas = document.querySelector(".tela3-1 .pergunta");
const inputqntLevels = document.querySelector(".tela3-1 .nivel");

const tela3_1 = document.querySelector(".tela3-1");
const tela3_2 = document.querySelector(".tela3-2");
const tela3_3 = document.querySelector(".tela3-3");
const tela3_4 = document.querySelector(".tela3-4");

let tituloQuiz = null;
let urlImagem = null;
let qntPerguntas = 0;
let qntLevels = 0;