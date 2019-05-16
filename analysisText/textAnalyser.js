const analyzedText = document.querySelector(".analyzed-text");
var notRepeatedWords = "";
var foundWords = null;

window.onload = function(params) {
  var userText = sessionStorage.getItem("userText");

  analyzedText.innerHTML = userText;

  var dataObj = parseToFreqObj(userText);
  buildFreqTable(dataObj);

  notRepeatedWords = Object.keys(dataObj).join(" ");
};

const listOfWords = document.querySelector(".list-found-words");

$(".search-pattern").on("input", function() {
  //show found words in the list
  clearWordSelection();
  listOfWords.innerHTML = null;

  var regex = new RegExp(
    `([^а-яa-z]|^)${this.value}[a-zа-я]*([^а-яa-z]|^)`,
    "gi"
  );

  foundWords = notRepeatedWords.match(regex);

  if (foundWords != null && this.value != "") {
    for (let i = 0; i < foundWords.length; i++) {
      var li = document.createElement("li");
      li.textContent = foundWords[i];

      listOfWords.appendChild(li);
    }
  }
});

$(".search-pattern").on("blur", function() {
  if (listOfWords.innerHTML != null) {
    listOfWords.innerHTML = null;
  }
});

const searchPattern = document.querySelector(".search-pattern");

$(".search-butt").on("click", function() {
  //highlight of the found words

  var userPatternText = searchPattern.value;

  if (foundWords != null && userPatternText.trim().length != 0) {
    for (let i = 0; i < foundWords.length; i++) {
      var wordWithTag = `<span class="found-word">${foundWords[i]}</span>`;
      var findWordsExp = new RegExp(
        `([^а-яa-z]|^)${foundWords[i].trim()}([^а-яa-z]|$)`,
        "g"
      );

      analyzedText.innerHTML = analyzedText.innerHTML.replace(
        findWordsExp,
        wordWithTag
      );
    }
  }
  foundWords = null; //for avoid re-highlighting of already found elements
});

function parseToFreqObj(userText = "") {
  var wordsArr = userText.match(/[a-zа-я]+/gi);

  var freqObj = {};

  for (let i = 0; i < wordsArr.length; i++) {
    var word = wordsArr[i];
    var frequency = freqObj[word];

    freqObj[word] = frequency === undefined ? 1 : frequency + 1;
  }

  return freqObj;
}

function buildFreqTable(dataObj = {}) {
  const freqTable = document.querySelector(".frequency-table");

  var template = document.querySelector(".wordFreq");

  for (const key in dataObj) {
    var cloneTemp = template.cloneNode(true);

    cloneTemp.firstElementChild.innerHTML = key;
    cloneTemp.lastElementChild.innerHTML = dataObj[key];

    freqTable.appendChild(cloneTemp);
  }
}

function clearWordSelection() {
  var clearSelecExp = new RegExp('<span class="found-word">|</span>', "g");
  var text = analyzedText.innerHTML;

  analyzedText.innerHTML = text.replace(clearSelecExp, "");
}
