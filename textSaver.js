window.onload = function() {
  const analysisButt = document.querySelector(".analysis-button");

  analysisButt.addEventListener("click", function() {
    var userText = document.querySelector("#typing-area").value;

    sessionStorage.setItem("userText", userText);
  });
};
