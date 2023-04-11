// De Animal crossing API aanroepen dmv het samenstellen van een URL

const baseURL = "https://acnhapi.com/v1a/";
const endPoint = "villagers";
const URL = baseURL + endPoint;
let huidigeIndex = 0;
const knop = document.querySelector('button');
const ballenLijst = document.querySelector('ol');
const bingoKnop = document.querySelector('body>button:last-of-type');
const opnieuwKnop = document.querySelector('body>article button');
const popUp = document.querySelector('body>article');

// Het selecteren van het HTML element waar de Animal karakters in komen.
const bingoBord = document.querySelector('ul');

//Aanmaken van variabelen om de bingo-villagers in te stoppen
let ballenVillagers = [];
let bingokaartVillagers = [];

// Aanmaken van variabelen om de bingoballen mee te kunnen verschuiven van positie.
const li = document.querySelector('ol li');

const volgendeKnop = document.querySelector('section button:nth-of-type(1)');
const vorigeKnop = document.querySelector('section button:nth-of-type(2)');

// Een functie om de villagers mee te kunnen shuffelen binnen een array
/* bron https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};

function haalVillagers(){
  // van Sanne, tijdens de les FFD over  API's
	getData(URL).then( alleVillagers =>{
        // Het shuffelen van alle villagers en vervolgens de eerste 75 hiervan 
        // pakken en in de eerder aangemaakte variabele "ballenVillagers" stoppen
		let geschuddeVillagers = shuffle(alleVillagers);
		ballenVillagers = geschuddeVillagers.slice(0,75);
		
        console.log(ballenVillagers);
        // Hier worden de gekozen villagers nogmaals geschud, om gelijke arrays 
        // te voorkomen binnen het spel
		let nogEenKeerGeschuddeVillagers = shuffle([...ballenVillagers]);
        bingokaartVillagers = nogEenKeerGeschuddeVillagers.slice(0,25);
		
        console.log(bingokaartVillagers);
		// de funtie voor het toevoegen van HTML uitvoeren na dat deze gegevens zijn opgehaald
		opHetScherm();
	})
} 

function opHetScherm(){
	bingokaartVillagers.forEach( villager => {
		const villagerElement = 
					`
					<li>
                <input type="checkbox" name="bingo" class="checkbox" id="${villager.name["name-USen"]}">
                <label for="${villager.name["name-USen"]}">
                  <img src="${villager.icon_uri}" alt="${villager.name["name-USen"]}">
                </label>
					</li>
					`;
    bingoBord.insertAdjacentHTML('beforeend', villagerElement);
	})

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", checkCheckboxesAndListen);
  });
}

// Het trekken van een bingobal

function toonVolgendGetal() {
    let VillagerOpBal = ballenVillagers[huidigeIndex];
    
    console.log(VillagerOpBal);

    let balElement = 
					`
					<li class="${VillagerOpBal.personality}">
              <img src="${VillagerOpBal.icon_uri}" alt="${VillagerOpBal.name["name-USen"]}">
					</li>
					`;

    ballenLijst.insertAdjacentHTML('afterbegin', balElement);

    huidigeIndex++;
  
    if (huidigeIndex === ballenVillagers.length) {
      knop.removeEventListener('click', toonVolgendGetal);
      knop.disabled = true;
    }
  }
  
knop.addEventListener('click', toonVolgendGetal);

haalVillagers();


let huidigePositie = 0;

knop.addEventListener('click', () =>{
  huidigePositie = 0;
  ballenLijst.style.setProperty("--pos", huidigePositie);

  const eersteBal = document.querySelector("ol li");
  const tweedeBal = document.querySelector("ol li:nth-of-type(2)");

  eersteBal.classList.add ('rolIn');
  tweedeBal.classList.add ('rolOut');

  eersteBal.addEventListener("transitionend", () =>{
    eersteBal.classList.remove ('rolIn');
    tweedeBal.classList.remove ('rolOut');

  })

  if (document.querySelectorAll("ol li").length > 1){
    vorigeKnop.disabled = false;
  };

  volgendeKnop.disabled = true;

});

vorigeKnop.addEventListener('click', () => {
  huidigePositie -= 1;
  ballenLijst.style.setProperty("--pos", huidigePositie);
  ballenLijst.classList.add('rolLinks');
  const eersteBal = document.querySelector("ol li");

  eersteBal.addEventListener("transitionend", () => {
    ballenLijst.classList.remove('rolLinks');
  })

  if (document.querySelectorAll("ol li").length == -huidigePositie+1){
    vorigeKnop.disabled = true;
  }
  else{
    vorigeKnop.disabled = false;
    volgendeKnop.disabled = false;
  }

});


volgendeKnop.addEventListener('click', () => {

  huidigePositie += 1;
  ballenLijst.style.setProperty("--pos", huidigePositie);
  ballenLijst.classList.add('rolRechts');
  const eersteBal = document.querySelector("ol li");
  
  eersteBal.addEventListener("transitionend", () => {
    ballenLijst.classList.remove('rolRechts');
  })

  if (-huidigePositie == 0){
    volgendeKnop.disabled = true;
  }
  else{
    vorigeKnop.disabled = false;
  }

});

// van Sanne, tijdens de les FFD over  API's
async function getData(URL) {
	return (
		fetch(URL)
		.then ( response => response.json() )
		.then ( jsonData => jsonData )
	);
}

// // SPEACH
// Bron: https://codepen.io/shooft/pen/yLxzgzP

/* de commando's */
const commandos = ['bingo']; /* deze lijst kun je uitbreiden */
const grammar = '#JSGF V1.0; grammar commandos; public <commando> = ' + commandos.join(' | ') + ' ;'

/* de browser de benodigde dingen leren */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

/* een lijstje maken van de grammer/commando's */
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

/* het luisterobject aanmaken en de commando's en de taal leren */
const recognition = new SpeechRecognition();
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'nl';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

 /* als er tekst verstaan is */
function spraakAfhandelen(event) {

// de laatste tekst uit de results peuteren
const lijstMetAlleResultaten = event.results;
const indexVanHetLaatsteResultaat = lijstMetAlleResultaten.length - 1;
const hetLaatsteResultaat = lijstMetAlleResultaten[indexVanHetLaatsteResultaat];

let deTekstDieVerstaanIs = hetLaatsteResultaat[0].transcript;

deTekstDieVerstaanIs = deTekstDieVerstaanIs.trim();
deTekstDieVerstaanIs = deTekstDieVerstaanIs.toLowerCase();

    if (deTekstDieVerstaanIs == "bingo") {
      feestje();
      popUp.classList.add('popped');

      setTimeout( () => {
           ocation.reload();
      }, 10000);
    }

    console.log(deTekstDieVerstaanIs);
}

  /* het luisterobject laten luisteren */
function luisteren() {
    recognition.start();
    console.log('Ready to receive a command.');
 }

 /* als er een woord herkent is - de functie starten */
 recognition.onresult = event => {
    spraakAfhandelen(event);
 }

 /* als het luisterobject er onverhoopt mee ophoudt - opnieuw starten met luisteren */
 recognition.onend = () => {
    luisteren();
 }

 /* na het laden van de pagina starten met luisteren */
//  luisteren()

function checkCheckboxesAndListen() {
  const ungecheckteCheckboxes = document.querySelectorAll("li input[type='checkbox']:not(:checked)");

  if (ungecheckteCheckboxes.length == 0){
    bingoKnop.disabled = false;
    luisteren();
  }
}

// een reset pagina knop om het spel opnieuw te starten na bingo
opnieuwKnop.addEventListener('click', () =>{
  location.reload();
})

// https://www.npmjs.com/package/js-confetti

bingoKnop.addEventListener('click',feestje);

function feestje() {
  
  popUp.classList.add('popped');

  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    confettiRadius: 5,
    confettiNumber: 1000,
  })

};
