
let timer;
let timeLeft = 60;
let running = false;

const textToType = document.getElementById('text-to-type').innerText;
const textInput = document.getElementById('text-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startTest);

function startTest() {
    if (running) return;
    running = true;
    textInput.disabled = false;
    textInput.focus();
    textInput.value = '';
    timeLeft = 60;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    wpmDisplay.textContent = 'WPM: 0';
    accuracyDisplay.textContent = 'Accuracy: 0%';
    timer = setInterval(updateTimer, 1000);
}

textInput.addEventListener('input', calculateWPMAndAccuracy);

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        textInput.disabled = true;
        running = false;
    }
}

function calculateWPMAndAccuracy() {
    const textEntered = textInput.value;
    const wordsTyped = textEntered.split(' ').filter(word => word !== '').length;
    const timeElapsed = 60 - timeLeft;
    const wpm = timeElapsed > 0 ? (wordsTyped / timeElapsed) * 60 : 0;
    wpmDisplay.textContent = `WPM: ${Math.round(wpm)}`;
    
    const correctChars = getCorrectCharacters(textToType, textEntered);
    const totalChars = textEntered.length;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    accuracyDisplay.textContent = `Accuracy: ${Math.round(accuracy)}%`;
}

function getCorrectCharacters(expectedText, actualText) {
    let correctCount = 0;
    for (let i = 0; i < actualText.length; i++) {
        if (actualText[i] === expectedText[i]) {
            correctCount++;
        }
    }
    return correctCount;
}
