let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

startPauseBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
    startPauseBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startPauseBtn.textContent = 'Start';
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    lapCounter = 0;
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    timeDisplay.textContent = '00:00:00.00';
    lapsList.innerHTML = '';
}

function recordLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
    lapsList.appendChild(lapTime);
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    timeDisplay.textContent = 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + ':' + 
        (milliseconds < 10 ? '0' : '') + milliseconds;
}
