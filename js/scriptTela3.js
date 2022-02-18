/* ---  tela 3-1 --- */

const inputTitulo = document.querySelector(".tela3-1 .titulo");
const inputURL = document.querySelector(".tela3-1 .url");
const inputQntPergutnas = document.querySelector(".tela3-1 .pergunta");
const inputQntNiveis = document.querySelector(".tela3-1 .nivel");

function prosseguirParaPerguntas(){
    if(validarInputs()){
        receberDadosInput()
    }else{
        alert("Preencha os dados corretamente");
    }
}

/*---  valida os inputs ---*/
function validarInputs(){
    if(inputTitulo.value.length > 20 && inputTitulo.value.length < 65){
        if(inputURL.value.includes("http")=== true){
            if(inputQntPergutnas.value >= 3){
                if(inputQntNiveis.value>=2){
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
    qPerguntas = inputQntPergutnas.value;
    qntNiveis = inputQntNiveis.value;
}


/* ---- tela 3-2 ----*/

