const memory_game = document.querySelector(".memory-game");
const modal = document.querySelector("#modal");
var container = document.querySelector("#containerCards");
const body = document.querySelector("body");
var nomePLayer;
var flipp = 0;
var arryCards = [];
var nome;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let clickOriginal;
let avisoPrimario = 1;
let alerContidade = 2;

const resetGame = () => {
    flipp = 0;
    avisoPrimario = 1;
    alerContidade = 2;
    hasFlippedCard = false;
    lockBoard = false;
    container.remove();
    memory_game.innerHTML += `
    <div id="containerCards"> </div>
    `;
    container = document.querySelector("#containerCards");
    console.log(container);
    reiniciando();
};

const cards = document.querySelectorAll(".memory-card");

function flipCard(e, x) {
    if (x.classList.contains("achou")) {
        if (avisoPrimario <= 3) {
            alert(
                `Por favor não Escolha cartas que já foram encontradas *obs esse aviso vai aparecer mais: ${alerContidade}.`
            );
            alerContidade--;
            avisoPrimario++;
        }
    } else {
        if (lockBoard) return;
        if (e === firstCard) return;

        e.classList.add("flip");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = e;
            return;
        }

        secondCard = e;
        lockBoard = true;
        clickOriginal = x;

        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.children[0].classList.add("achou");
    secondCard.children[0].classList.add("achou");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    flipp++;
    hasWon();
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function hasWon() {
    if (flipp == 6) {
        setTimeout(() => {
            alert(`Parabéns ${nomePLayer} você é muito bom!! Click no "ok" para jogar novamente!!
            `);
            resetGame();
        }, 250);
    }
}

function embaralhar(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sorteado(max, quant) {
    let numeroS = [];
    while (numeroS.length < quant) {
        e = Math.ceil(Math.random() * max);
        if (numeroS.indexOf(e) == -1) {
            numeroS.push(e);
        }
    }
    return numeroS;
}

const pesquisa = async() => {
    console.log("entrou aqui!!");
    var url = `https://rickandmortyapi.com/api/character/${sorteado(826, 6)}`;
    var dados = await fetch(url);
    var personagem = await dados.json();
    addOsDadosNoArry(personagem);
};

const reiniciando = () => {
    console.log("entrou aqui");
    pesquisa();
};

const addOsDadosNoArry = async(personagem) => {
    let i = 0;
    let x = 0;
    while (x < 2) {
        personagem.map(function(personagem) {
            i * arryCards.length;
            arryCards[i] = personagem;
            i++;
        });
        x++;
    }

    embaralhar(arryCards);
    criandoCards();
};

const criandoCards = () => {
    let i = 0;
    arryCards.map(function() {
        container.innerHTML += `
       
            <div class="memory-card" data-name="${arryCards[i].name}">
                 <img class="front-face" src="${arryCards[i].image}" alt="Face da Carta">
                 <img class="back-face" src="./Accent/images/card.jpg" alt="Verso da Carta">
             </div>
    
        `;
        i++;
    });
};

memory_game.addEventListener("click", (event) => {
    let quemClickou = event.target;
    let primeiroPai = quemClickou.parentNode;
    flipCard(primeiroPai, quemClickou);
});

const janelaModal = () => {
    modal.innerHTML += ` 
   
   <main class="container">
   <h1 class="title">Olá jogador</h1>

   <div class="row">
       <div class="inputbox">
           <input type="text" id="nome" required>
           <label for="Nome">Coloque seu Nick Name</label>
       </div>
   </div>
   <div class="row">
       <button id="btn">Buscar
       </button>
   </div>

</main>


   `;
};
janelaModal();
const pegandoONome = () => {
    var fnome = document.querySelector("#nome").value;
    nomePLayer = fnome;
    if (fnome == "") {
        alert("Coloque o nome do personagem por favor!");
    } else {
        modal.parentNode.removeChild(modal);
        pesquisa();
    }
};
const btn = document.querySelector("#btn");
btn.addEventListener("click", pegandoONome);