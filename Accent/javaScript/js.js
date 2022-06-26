const containerCARDS = document.querySelector("#containerCARDS");

containerCARDS.addEventListener("click", event => {
    let quemClickou = event.target;
    let primeiroPai = quemClickou.parentNode;
    let paiPricipal = primeiroPai.parentNode;
    if (paiPricipal.classList.contains("click") == false) {
        paiPricipal.classList.add("click");
    } else {
        paiPricipal.classList.remove("click");
        paiPricipal.classList.add("clickDeNovo");
    }
})
var numeroS = [];

function sorteado(max, quant) {
    while (numeroS.length < quant) {
        e = Math.ceil(Math.random() * max);
        if (numeroS.indexOf(e) == -1) {
            numeroS.push(e);
        }
    }
}

const pesquisa = async() => {
    var url = `https://rickandmortyapi.com/api/character/${numeroS}`;
    var dados = await fetch(url);
    var personagem = await dados.json();
    criandoCards(personagem);
};

sorteado(826, 12);
pesquisa();

const criandoCards = async(personagem) => {
    personagem.map(function(personagem) {
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
    });
};