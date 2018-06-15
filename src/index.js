import data from './countries.json';

const formSearch = document.getElementById("search-form"),
    resultPlace = document.getElementById("results");
    
formSearch.addEventListener("keydown", event => {
    if (event.code === "Enter") {
        event.preventDefault();
        console.log('Nie pozwalam na automatyczne działanie');
    }
});

formSearch.addEventListener("keyup", event => {
    searchData(event.target.value.trim().toLowerCase());    
});

function searchData(searchValue) {
    if (searchValue.length >= 1) {
        const result = data.filter(singleData  =>  singleData.name.toLowerCase().startsWith(searchValue));
        removeOldResults();
        showResults(result, searchValue);
    }
}
// zamiast startsWith() można wybrać includes() jeśli chcemy by substring znajdował się gdziekolwiek w stringu. Najchętniej zwiększyłbym również wymaganą długość stringa przed livesearchem do 3 min.

function removeOldResults() {
    while (resultPlace.hasChildNodes()) {
        resultPlace.removeChild(resultPlace.firstChild);
    }
}

function showResults(result) {
    if (result[0] === undefined) { 
        const showRecord = new Record;
        showRecord.getParagraph("no result");
    } 
    result.map( singleResult => {
        const singleRecord = new Record(singleResult.name, singleResult.capital, singleResult.populace, singleResult.about);
        
        singleRecord.getParagraph(singleResult.name);
        singleRecord.getParagraph(singleResult.about);
        highlight(singleResult.name);
    })
}

function highlight(name) {
    let allData = resultPlace.innerHTML;
    allData = allData.replace(new RegExp(name, 'g'), "<mark>" + name + "</mark>");
    resultPlace.innerHTML = allData;
}

class Record {
    constructor (name, capital, populace, about){
        this.name = name
        this.capital = capital
        this.populace = populace
        this.about = about
    }
    getParagraph(text) {
        const paragraphRecord = document.createElement("p"),
            paragraphName = document.createTextNode(text);
        
        paragraphRecord.appendChild(paragraphName);
        resultPlace.appendChild(paragraphRecord);
    }
}
