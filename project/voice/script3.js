
    let recognition = null;
    let isListening = false;
    let finalTranscript = '';

    const click_to_convert = document.getElementById("click_to_convert");
    const languageSelect = document.getElementById("languageSelect");
    const convert_text = document.getElementById("convert_text");
    const clear = document.getElementById("clear");
    const wordCountDiv = document.getElementById("word_count");

    click_to_convert.addEventListener('click', function () {
        // Feature detection
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        // Create recognition object if not already created
        if (!recognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.addEventListener('result', function (event) {
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    const transcript = result[0].transcript;

                    if (result.isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                convert_text.value = finalTranscript + interimTranscript;
                updateWordCount();
                convert_text.scrollTop = convert_text.scrollHeight;
            });

            recognition.addEventListener('end', () => {
                if (isListening) recognition.start();
            });

            recognition.addEventListener('error', function (event) {
                console.error('Speech recognition error:', event.error);
                stopListening();
            });
        }

        recognition.lang = languageSelect.value;

        if (!isListening) {
            startListening();
        } else {
            stopListening();
        }
    });

    function startListening() {
        isListening = true;
        click_to_convert.textContent = '🛑 Stop Listening';
        recognition.start();
    }

    function stopListening() {
        isListening = false;
        click_to_convert.textContent = '🎤 Start Listening';
        if (recognition) recognition.stop();
    }

    clear.addEventListener('click', () => {
        convert_text.value = '';
        finalTranscript = '';
        updateWordCount();
    });

    convert_text.addEventListener('input', updateWordCount);

    function updateWordCount() {
        const words = convert_text.value.trim().split(/\s+/).filter(Boolean);
        wordCountDiv.textContent = `${words.length} words`;
    }

    // Optional: update word count on load
    window.addEventListener('load', updateWordCount);
   
    document.getElementById("copy").addEventListener("click", function () {
  const textArea = document.getElementById("convert_text");

  // Select the text
  textArea.select();
  textArea.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text
  navigator.clipboard.writeText(textArea.value)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch(err => {
      alert("Failed to copy text: ", err);
    });
});



