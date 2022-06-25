const containerCARDS = document.querySelector("#containerCARDS");
var numeroS = [];

function sorteado(max, quant) {
    while (numeroS.length < quant) {
        e = Math.ceil(Math.random() * max);
        if (numeroS.indexOf(e) == -1) {
            numeroS.push(e);
        }
    }
}

console.log(numeroS);
const pesquisa = async() => {
    var url = `https://rickandmortyapi.com/api/character/${numeroS}`;
    var dados = await fetch(url);
    var personagem = await dados.json();
    criandoDiv(personagem);
};

sorteado(826, 8);
pesquisa();

const criandoDiv = async(personagem) => {
    personagem.map(function(personagem) {
        console.log(personagem.image);
        containerCARDS.innerHTML += ` 
        
        <div class="cards SlideADD">
            <img src="${personagem.image}" alt="">
            <h6>Nome</h6>
            <p>${personagem.name}</p>
            <h6>Status</h6>
            <p>${personagem.status}</p>
            <h6>Species</h6>
            <p>${personagem.species}</p>
            <h6>Type</h6>
            <p>${personagem.type}</p>
            <h6>Gender</h6>
            <p>${personagem.gender}</p>
        </div>
  
    `;
    });
};