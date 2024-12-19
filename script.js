const questions = [
    {
        question: "How are you feeling right now, beautiful? 🌸",
        options: [
            "Could use some extra love 💝",
            "A bit tired but okay 😊",
            "Need some cuddles 🤗",
            "Ready to conquer the day! 💪"
        ]
    },
    {
        question: "What would make you smile right now? 🌟",
        options: [
            "A warm hug",
            "Your favorite snack",
            "A funny joke",
            "All of the above!"
        ]
    },
    {
        question: "Pick your comfort movie genre:",
        options: [
            "Rom-Com 💑",
            "Disney/Pixar 🎭",
            "Feel-good drama ✨",
            "Adventure 🌈"
        ]
    },
    {
        question: "Choose your perfect relaxation activity:",
        options: [
            "Cozy blanket + Netflix",
            "Hot bath with bubbles",
            "Gentle massage",
            "Reading a good book"
        ]
    },
    {
        question: "What's your comfort food craving?",
        options: [
            "Chocolate ���",
            "Ice cream 🍦",
            "Pizza 🍕",
            "Warm soup 🥣"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

// Memory Game Logic
const gameEmojis = ['❤️', '💖', '💝', '💕', '💗', '💓', '💘', '💞'];
let cards = [...gameEmojis, ...gameEmojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function initializeGame() {
    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = '';
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    
    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);
    
    // Update stats
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    document.getElementById('pairs').textContent = `Pairs Found: ${matchedPairs}`;
    
    // Create cards
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = `
            <div class="front">${emoji}</div>
            <div class="back">💌</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = `Moves: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;
    
    if (match) {
        matchedPairs++;
        document.getElementById('pairs').textContent = `Pairs Found: ${matchedPairs}`;
        flippedCards = [];
        
        if (matchedPairs === gameEmojis.length) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves! 🎉`);
                initializeGame();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the start button
    document.getElementById('startButton').addEventListener('click', startQuiz);
    
    const playGameButton = document.getElementById('playGameButton');
    const backToQuizButton = document.getElementById('backToQuiz');
    
    playGameButton.addEventListener('click', function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        initializeGame();
    });
    
    backToQuizButton.addEventListener('click', function() {
        document.getElementById('game').style.display = 'none';
        document.getElementById('welcome').style.display = 'block';
    });
});

function startQuiz() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    
    questionContainer.innerHTML = `<h2>${questions[currentQuestion].question}</h2>`;
    optionsContainer.innerHTML = '';
    
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.innerHTML = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    answers.push(index);
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    
    const messages = [
        "You're the strongest, most amazing person I know! 💪💕",
        "Remember that you're loved beyond measure! 🌟",
        "You make the world a better place just by being you! 🌸",
        "You deserve all the happiness in the world! 🎉"
    ];
    
    // Personal message from Yassine
    const personalMessage = `
        <div class="personal-message animate__animated animate__fadeIn animate__delay-1s">
            <h3>A Message From Yassine 💝</h3>
            <p class="love-letter">
                My dearest Raouia,<br><br>
                Every moment with you is a gift that I cherish deeply. 
                You're not just my girlfriend, you're my everything - my love, my strength, and my happiness. 
                I want you to know that I'm always here for you, in good times and challenging times.<br><br>
                Your smile brightens my world, and your happiness means everything to me. 
                I hope this little gift brings a smile to your face and reminds you of how special you are to me.<br><br>
                I love you more than words can express! ❤️<br><br>
                Forever yours,<br>
                Yassine 💑
            </p>
        </div>
    `;
    
    document.getElementById('special-message').innerHTML = `
        <p class="love-message">${messages[Math.floor(Math.random() * messages.length)]}</p>
        ${personalMessage}
    `;
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate hearts periodically
setInterval(createFloatingHearts, 300);

// Update progress bar
function updateProgress() {
    const progress = document.querySelector('.progress');
    const percentage = (currentQuestion / questions.length) * 100;
    progress.style.width = `${percentage}%`;
}

// Modify your existing showQuestion function to include progress update
const originalShowQuestion = showQuestion;
showQuestion = function() {
    originalShowQuestion();
    updateProgress();
}

// Add restart functionality
document.addEventListener('DOMContentLoaded', function() {
    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            currentQuestion = 0;
            answers = [];
            document.getElementById('result').style.display = 'none';
            document.getElementById('welcome').style.display = 'block';
            updateProgress();
        });
    }
});