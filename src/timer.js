document.addEventListener('DOMContentLoaded', function () {
    let timerElement = document.getElementById('timer');
    let startButton = document.getElementById('startButton');
    let restartButton = document.querySelector('.imageButton img[alt="Button 1"]').parentElement;
    let settingsButton = document.getElementById('settingsButton');
    let modal = document.getElementById('settingsModal');
    let closeButton = document.querySelector('.closeButton');
    let saveButton = document.getElementById('saveButton');
    let themeDropdown = document.getElementById('themeDropdown');
    let soundDropdown = document.getElementById('soundDropdown');
    let mainTimerInput = document.getElementById('mainTimer');
    let shortBreakInput = document.getElementById('shortBreak');
    let longBreakInput = document.getElementById('longBreak');
    let alarmSlider = document.getElementById('alarmSlider');
    let buttonA = document.querySelector('.bottomButton:nth-child(1)');
    let buttonB = document.querySelector('.bottomButton:nth-child(2)');
    let buttonC = document.querySelector('.bottomButton:nth-child(3)');
    let time = 25 * 60;
    let timerInterval;
    let isRunning = false;
    let selectedSound = 'default';
    let alarmVolume = 0.5;

    function updateTimer() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (time > 0) {
            time--;
        } else {
            clearInterval(timerInterval);
            startButton.textContent = 'Start';
            isRunning = false;
            playSound();
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startButton.textContent = 'Start';
        } else {
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
            startButton.textContent = 'Pause';
        }
        isRunning = !isRunning;
    }

    function playSound() {
        let audio;
        switch (selectedSound) {
            case 'fortnite':
                audio = new Audio('assets/fortnite.wav');
                break;
            case 'purge':
                audio = new Audio('assets/purge.wav');
                break;
            default:
                audio = new Audio('assets/warning.mp3');
                break;
        }
        audio.volume = alarmVolume;
        audio.play();
    }

    startButton.addEventListener('click', startTimer);

    restartButton.addEventListener('click', function () {
        clearInterval(timerInterval);
        time = 25 * 60;
        updateTimer();
        startButton.textContent = 'Start';
        isRunning = false;
    });

    settingsButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    saveButton.addEventListener('click', function () {
        const selectedTheme = themeDropdown.value;
        let backgroundImage;
        switch (selectedTheme) {
            case 'lights':
                backgroundImage = 'url("assets/lights.jpeg")';
                break;
            case 'sky':
                backgroundImage = 'url("assets/sky.jpg")';
                break;
            case 'moon':
                backgroundImage = 'url("assets/moon.jepg)';
                break;
            default:
                backgroundImage = 'url("assets/umbrella.png")';
                break;
        }
        document.body.style.backgroundImage = backgroundImage;

        selectedSound = soundDropdown.value;
        alarmVolume = alarmSlider.value / 100;

        const mainTimerValue = parseInt(mainTimerInput.value);
        const shortBreakValue = parseInt(shortBreakInput.value);
        const longBreakValue = parseInt(longBreakInput.value);

        if (!isNaN(mainTimerValue) && mainTimerValue >= 1 && mainTimerValue <= 60) {
            time = mainTimerValue * 60;
            updateTimer();
        }

        if (!isNaN(shortBreakValue) && shortBreakValue >= 1 && shortBreakValue <= 10) {

        }

        if (!isNaN(longBreakValue) && longBreakValue >= 1 && longBreakValue <= 30) {

        }

        modal.style.display = 'none';
    });

    mainTimerInput.addEventListener('input', function () {
        if (mainTimerInput.value > 60) mainTimerInput.value = 60;
        if (mainTimerInput.value < 1) mainTimerInput.value = 1;
    });

    shortBreakInput.addEventListener('input', function () {
        if (shortBreakInput.value > 10) shortBreakInput.value = 10;
        if (shortBreakInput.value < 1) shortBreakInput.value = 1;
    });

    longBreakInput.addEventListener('input', function () {
        if (longBreakInput.value > 30) longBreakInput.value = 30;
        if (longBreakInput.value < 1) longBreakInput.value = 1;
    });

    // Event listeners for bottom buttons
    buttonA.addEventListener('click', function () {
        const mainTimerValue = parseInt(mainTimerInput.value);
        if (!isNaN(mainTimerValue) && mainTimerValue >= 1 && mainTimerValue <= 60) {
            time = mainTimerValue * 60; // Set the main timer value
            updateTimer(); // Update the timer display immediately
        }
    });

    buttonB.addEventListener('click', function () {
        const shortBreakValue = parseInt(shortBreakInput.value);
        if (!isNaN(shortBreakValue) && shortBreakValue >= 1 && shortBreakValue <= 10) {
            time = shortBreakValue * 60; // Set the short break timer value
            updateTimer(); // Update the timer display immediately
        }
    });

    buttonC.addEventListener('click', function () {
        const longBreakValue = parseInt(longBreakInput.value);
        if (!isNaN(longBreakValue) && longBreakValue >= 1 && longBreakValue <= 30) {
            time = longBreakValue * 60; // Set the long break timer value
            updateTimer(); // Update the timer display immediately
        }
    });
});