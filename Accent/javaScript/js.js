const containerCARDS = document.querySelector("#containerCARDS");
var arryCards = [];
containerCARDS.addEventListener("click", (event) => {
    let quemClickou = event.target;
    let primeiroPai = quemClickou.parentNode;
    let paiPricipal = primeiroPai.parentNode;
    if (paiPricipal.classList.contains("click") == false) {
        paiPricipal.classList.add("click");
    } else {
        paiPricipal.classList.remove("click");
        paiPricipal.classList.add("clickDeNovo");
    }
});

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
    criandoCards();
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
}


const criandoCards = () => {
    containerCARDS.innerHTML += `

    <div class="flipper">
    <div class="front">
     <img src="./Accent/images/card.jpg" alt="">
    </div>
    <div class="back">
      <img src="${personagem.image}" />
    </div>
    </div>
    
    `;
};