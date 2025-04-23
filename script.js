const clickArea = document.getElementById('clickArea');
const cpsDisplay = document.getElementById('cps');
const totalClicksDisplay = document.getElementById('totalClicks');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');

let clicks = 0;
let startTime = 0;
let testDuration = 10000; // 10 seconds
let timerInterval;
let isTestRunning = false;

clickArea.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetTest);

function handleClick() {
    if (!isTestRunning) {
        startTest();
        return;
    }
    
    clicks++;
    totalClicksDisplay.textContent = clicks;
    
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;
    const currentCPS = clicks / elapsedTime;
    
    cpsDisplay.textContent = currentCPS.toFixed(2);
}

function startTest() {
    clicks = 0;
    startTime = Date.now();
    isTestRunning = true;
    
    clickArea.innerHTML = '<h2></h2>';
    cpsDisplay.textContent = '0.00';
    totalClicksDisplay.textContent = '0';
    
    // Update timer
    timerInterval = setInterval(updateTimer, 10);
    
    // End test after duration
    setTimeout(endTest, testDuration);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;
    timerDisplay.textContent = `Time: ${elapsedTime.toFixed(2)}s`;
}

function endTest() {
    isTestRunning = false;
    clearInterval(timerInterval);
    clickArea.innerHTML = '<h2>Тест завершен</h2>';
    clickArea.style.cursor = 'default';
}

function resetTest() {
    clearInterval(timerInterval);
    isTestRunning = false;
    clicks = 0;
    
    cpsDisplay.textContent = '0.00';
    totalClicksDisplay.textContent = '0';
    timerDisplay.textContent = 'Time: 0.00s';
    
    clickArea.innerHTML = '<h2>Кликни для старта</h2>';
    clickArea.style.cursor = 'pointer';
}