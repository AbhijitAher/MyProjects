
// https://libretranslate.de/
// https://vibrant-easley-bdb8f9.netlify.app/

// getting the language metadata from the api by using fetch and appending it as options for the language selector element
async function getAllLanguages(){
    let res = await fetch("https://libretranslate.com/languages");
    let langData = await res.json();
    // console.log(langData);
    appendLanguages(langData);
}
getAllLanguages();


// appending the data received in getAllLanguages function in the select element
function appendLanguages(lData){
    let toSelector = document.getElementById("toLanguages");
    lData.forEach((el)  => {
        let opt = document.createElement('option');
        opt.value = el.code;
        opt.textContent = el.name;
        toSelector.append(opt);
    })
}

function getOutputLanguage(){
    let selectedLang = document.getElementById('toLanguages').value;
    console.log(selectedLang);
    localStorage.setItem('toLang', JSON.stringify(selectedLang));
    return selectedLang;
}

function getInput(){
    let input = document.getElementById('inputTA').value;
    return input; 
}
  

async function translate() {

    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: getInput(),
        source: "en",
        target: getOutputLanguage(),
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    let data = await res.json();
    let { translatedText } = data; //imp ********************************
    console.log(translatedText);
    showOutput(translatedText);
}

function mainTranslate(){
      translate();  //imp
}
  
function showOutput(data) {
    let outputBox = document.getElementById(`outputTA`);
    outputBox.value = data;
}



