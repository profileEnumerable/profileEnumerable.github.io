window.onload = function() {
  var exploreButt = document.getElementById("explore-butt");

  exploreButt.addEventListener("click", function() {
    var newTabUrl = "../TextAnalysis/exploreTextPage.html";
    var exploreTab = window.open(newTabUrl);

    exploreTab.onload = function() {
      var searchableTxt = this.document.querySelector(".searchable-text");

      searchableTxt.innerHTML = sampleText.value;
    };
  });
};
