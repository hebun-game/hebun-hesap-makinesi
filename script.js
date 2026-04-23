// Hesap Makinesi Mantığı
let currentInput = '0';
let previousInput = '';
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput === '0' ? number : currentInput + number;
    updateDisplay();
    moveCatToButtons(); // Sayıya basınca kedi hareket eder
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr === 0 ? "Hata" : prev / curr; break;
        default: return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('current-operand').innerText = currentInput;
    document.getElementById('previous-operand').innerText = previousInput + (operation || '');
}

function clearDisplay() { currentInput = '0'; previousInput = ''; operation = null; updateDisplay(); }
function deleteNumber() { currentInput = currentInput.slice(0, -1) || '0'; updateDisplay(); }

// --- KEDİ HAREKETLERİ ---
const cat = document.getElementById('cat-container');

function moveCatRandomly() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    cat.style.left = x + 'px';
    cat.style.top = y + 'px';
}

function moveCatToButtons() {
    // Kedi hesap makinesinin etrafında zıplar
    const calc = document.querySelector('.calculator').getBoundingClientRect();
    const x = calc.left + Math.random() * calc.width;
    const y = calc.top + Math.random() * calc.height;
    cat.style.left = x + 'px';
    cat.style.top = y + 'px';
}

// Tıklayınca miyavlama (Sistem sesi simülasyonu)
function meow() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.stop(audioCtx.currentTime + 0.3);
    console.log("Meow!");
}

// Kediyi her 3 saniyede bir hareket ettir
setInterval(moveCatRandomly, 3000);
