// De Animal crossing API aanroepen dmv het samenstellen van een URL

const baseURL = "https://acnhapi.com/v1a/";
const endPoint = "villagers";
const URL = baseURL + endPoint;
let huidigeIndex = 0;
const knop = document.querySelector('button');
const ballenLijst = document.querySelector('ol');

// Het selecteren van het HTML element waar de Animal karakters in komen.
const bingoBord = document.querySelector('ul');

//Aanmaken van variabelen om de bingo-villagers in te stoppen
let ballenVillagers = [];
let bingokaartVillagers = [];

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
                        <input type="checkbox" name="bingo" id="${villager.name["name-USen"]}">
                        <label for="${villager.name["name-USen"]}">
                    <img src="${villager.icon_uri}" alt="${villager.name["name-USen"]}">
                </label>
					</li>
					`;
    bingoBord.insertAdjacentHTML('beforeend', villagerElement);
	})
}

haalVillagers()

// Het trekken van een bingobal

function toonVolgendGetal() {
    const volgendGetal = ballenVillagers[huidigeIndex];
    
    console.log(volgendGetal);

    let balElement = 
					`
					<li class="${volgendGetal.personality}">
              <img src="${volgendGetal.icon_uri}" alt="${volgendGetal.name["name-USen"]}">
					</li>
					`;

    ballenLijst.insertAdjacentHTML('afterbegin', balElement);


    huidigeIndex++;              
  
    if (huidigeIndex === ballenVillagers.length) {
      knop.removeEventListener('click', toonVolgendGetal);
    }
  }
  
knop.addEventListener('click', toonVolgendGetal);



async function getData(URL) {
	return (
		fetch(URL)
		.then ( response => response.json() )
		.then ( jsonData => jsonData )
	);
}

