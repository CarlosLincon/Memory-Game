const memory_game = document.querySelector(".memory-game");
var arryCards = [];

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(e) {
    if (lockBoard) return;
    if (e === firstCard) return;

    e.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = e;
        return;
    }

    secondCard = e;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard(card)));



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
    var url = `https://rickandmortyapi.com/api/character/${sorteado(826, 6)}`;
    var dados = await fetch(url);
    var personagem = await dados.json();
    addOsDadosNoArry(personagem);
};

pesquisa();

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
        memory_game.innerHTML += `
    
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
    flipCard(primeiroPai);
})