

const textArea = document.getElementById("convert");
const listenBtn = document.getElementById("click");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const copyBtn = document.getElementById("copy");

let speech = new SpeechSynthesisUtterance();


listenBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel(); // Stop any previous speech
  }
  speech.text = textArea.value;
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
});

pauseBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  } else if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }a
});


resetBtn.addEventListener("click", () => {
  textArea.value = "";
  speechSynthesis.cancel();
});

copyBtn.addEventListener("click", () => {
  textArea.select();
  document.execCommand("copy");
  alert("Text copied to clipboard!");
});


