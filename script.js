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
            "Chocolate 🍫",
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
    
    initializeLoveFeatures();
    initializeFortuneWheel();
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

const loveLetters = [
    {
        title: "My Dearest Raouia",
        content: "Every morning when I wake up, my first thought is of you. Your smile brightens my darkest days. 💕"
    },
    {
        title: "To My Beautiful Love",
        content: "You are the melody in my heart, the sunshine in my life, and the love of my dreams. 🌟"
    },
    {
        title: "My Sweet Angel",
        content: "Your love makes everything better. You're the reason I smile every single day. 🌸"
    },
    {
        title: "To My Soulmate",
        content: "In a world full of people, my heart chose you, and it keeps choosing you every single day. ❤️"
    },
    {
        title: "My Precious Love",
        content: "You're not just my girlfriend, you're my best friend, my confidante, and my whole world. 💝"
    }
];

// Virtual Heart Pet System
let lovePoints = 0;
let loveLevel = 1;
const pointsPerLevel = 100;

function initializeLoveFeatures() {
    // Set up daily love letter
    const today = new Date();
    const letterIndex = today.getDate() % loveLetters.length;
    const todayLetter = loveLetters[letterIndex];
    
    const letterContainer = document.getElementById('dailyLetter');
    letterContainer.innerHTML = `
        <h4>${todayLetter.title}</h4>
        <p>${todayLetter.content}</p>
    `;

    // Set up virtual heart
    updateHeartStats();
    
    document.getElementById('sendLove').addEventListener('click', sendLove);
    document.getElementById('virtualHeart').addEventListener('click', createLoveParticles);
}

function sendLove() {
    lovePoints += Math.floor(Math.random() * 5) + 1;
    if (lovePoints >= pointsPerLevel) {
        loveLevel++;
        lovePoints = 0;
        showLevelUpAnimation();
    }
    updateHeartStats();
    createLoveParticles();
}

function updateHeartStats() {
    document.getElementById('loveLevel').textContent = loveLevel;
    document.getElementById('lovePoints').textContent = lovePoints;
    
    // Update heart size based on level
    const heart = document.getElementById('virtualHeart');
    heart.style.fontSize = `${4 + (loveLevel * 0.5)}em`;
}

function createLoveParticles() {
    const heart = document.getElementById('virtualHeart');
    const container = heart.parentElement;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'love-particles';
        particle.innerHTML = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.fontSize = `${Math.random() * 1 + 0.5}em`;
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function showLevelUpAnimation() {
    const heart = document.getElementById('virtualHeart');
    heart.classList.add('animate__animated', 'animate__bounce');
    
    setTimeout(() => {
        heart.classList.remove('animate__animated', 'animate__bounce');
    }, 1000);
    
    // Show celebration message
    const message = document.createElement('div');
    message.className = 'level-up-message animate__animated animate__fadeInUp';
    message.textContent = `Level Up! Your love has grown to level ${loveLevel}! 🎉`;
    document.querySelector('.virtual-heart-container').appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

const fortunes = [
    { text: "A romantic surprise is coming your way! 🎁", color: "#FFB6C1" },
    { text: "Your smile makes my heart skip a beat 💓", color: "#FFC0CB" },
    { text: "You'll have an extra special day today! ✨", color: "#FFD1DC" },
    { text: "Our love grows stronger each day 🌱", color: "#FF69B4" },
    { text: "You're my favorite person in the world 💝", color: "#FF1493" },
    { text: "Time for cuddles and kisses! 🤗", color: "#DB7093" },
    { text: "You deserve all the happiness! 🌈", color: "#FF82AB" },
    { text: "I'm thinking about you right now 💭", color: "#FF34B3" }
];

let isSpinning = false;

function initializeFortuneWheel() {
    const canvas = document.getElementById('fortuneWheel');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    canvas.width = 300;
    canvas.height = 300;

    function drawWheel() {
        const sliceAngle = (2 * Math.PI) / fortunes.length;

        for (let i = 0; i < fortunes.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = fortunes[i].color;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, i * sliceAngle, (i + 1) * sliceAngle);
            ctx.closePath();
            ctx.fill();

            // Add text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(i * sliceAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = '14px Quicksand';
            ctx.fillText('❤️', radius - 20, 5);
            ctx.restore();
        }
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

        const spinButton = document.getElementById('spinButton');
        spinButton.disabled = true;

        const resultDiv = document.getElementById('fortuneResult');
        resultDiv.classList.remove('show');

        const spins = 5; // Number of full rotations
        const randomDegrees = Math.random() * 360; // Random final position
        const totalDegrees = spins * 360 + randomDegrees;
        
        canvas.style.transform = `rotate(${totalDegrees}deg)`;

        setTimeout(() => {
            const selectedIndex = Math.floor(randomDegrees / (360 / fortunes.length));
            showFortune(fortunes[selectedIndex].text);
            isSpinning = false;
            spinButton.disabled = false;
        }, 3000);
    }

    function showFortune(fortune) {
        const resultDiv = document.getElementById('fortuneResult');
        resultDiv.textContent = fortune;
        resultDiv.classList.add('show');

        // Add floating hearts animation
        createFortuneParticles();
    }

    function createFortuneParticles() {
        const container = document.querySelector('.fortune-wheel-container');
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'love-particles';
            particle.innerHTML = ['❤️', '💖', '✨', '💕'][Math.floor(Math.random() * 4)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.fontSize = `${Math.random() * 1 + 0.5}em`;
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    }

    // Initial wheel draw
    drawWheel();

    // Add spin button event listener
    document.getElementById('spinButton').addEventListener('click', spinWheel);
}

const rewards = [
    {
        level: 2,
        reward: "🎁 Virtual Love Coupon: One Free Hug",
        description: "Redeemable anytime for a warm, loving hug!"
    },
    {
        level: 3,
        reward: "🌹 Digital Rose Garden",
        description: "A beautiful collection of virtual roses just for you!"
    },
    {
        level: 5,
        reward: "👑 Queen of My Heart Crown",
        description: "You're officially crowned as the queen of my heart!"
    },
    {
        level: 7,
        reward: "💝 Love Poem Collection",
        description: "Special poems written just for you!"
    },
    {
        level: 10,
        reward: "🌟 Eternal Love Star",
        description: "A star named after our love!"
    }
];

const achievements = {
    dailyStreak: {
        name: "Daily Love Sender",
        levels: [3, 7, 14, 30],
        rewards: ["💌", "💝", "👑", "🌟"]
    },
    totalClicks: {
        name: "Love Clicker",
        levels: [50, 100, 500, 1000],
        rewards: ["💕", "💖", "💘", "💫"]
    }
};

// Add these variables to track progress
let dailyStreak = 0;
let totalClicks = 0;
let lastClickDate = null;
let unclaimedRewards = [];

// Modify the existing sendLove function
function sendLove() {
    totalClicks++;
    updateDailyStreak();
    
    lovePoints += Math.floor(Math.random() * 5) + 1;
    if (lovePoints >= pointsPerLevel) {
        loveLevel++;
        lovePoints = 0;
        checkForRewards();
        showLevelUpAnimation();
    }
    
    checkAchievements();
    updateHeartStats();
    createLoveParticles();
    saveProgress();
}

// Add these new functions
function updateDailyStreak() {
    const today = new Date().toDateString();
    
    if (lastClickDate !== today) {
        if (lastClickDate === new Date(Date.now() - 86400000).toDateString()) {
            dailyStreak++;
            showStreakAnimation();
        } else if (lastClickDate !== null) {
            dailyStreak = 1;
        }
        lastClickDate = today;
    }
}

function checkForRewards() {
    const levelReward = rewards.find(r => r.level === loveLevel);
    if (levelReward) {
        unclaimedRewards.push(levelReward);
        showRewardNotification(levelReward);
    }
}

function showRewardNotification(reward) {
    const notification = document.createElement('div');
    notification.className = 'reward-notification animate__animated animate__bounceIn';
    notification.innerHTML = `
        <h4>New Reward Unlocked! 🎉</h4>
        <div class="reward-content">
            <div class="reward-icon">${reward.reward.split(' ')[0]}</div>
            <div class="reward-info">
                <p>${reward.reward}</p>
                <p class="reward-description">${reward.description}</p>
            </div>
        </div>
        <button onclick="claimReward(this)" class="cute-button">Claim Reward 🎁</button>
    `;
    
    document.querySelector('.virtual-heart-container').appendChild(notification);
    
    // Add confetti effect
    createConfetti();
}

function claimReward(button) {
    const notification = button.parentElement;
    notification.classList.remove('animate__bounceIn');
    notification.classList.add('animate__bounceOut');
    
    setTimeout(() => {
        notification.remove();
    }, 1000);
    
    // Remove from unclaimed rewards
    unclaimedRewards.shift();
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

function showStreakAnimation() {
    const streak = document.createElement('div');
    streak.className = 'streak-notification animate__animated animate__slideInUp';
    streak.innerHTML = `
        <p>Daily Streak: ${dailyStreak} days! 🔥</p>
    `;
    
    document.querySelector('.virtual-heart-container').appendChild(streak);
    
    setTimeout(() => {
        streak.classList.remove('animate__slideInUp');
        streak.classList.add('animate__slideOutDown');
        setTimeout(() => streak.remove(), 1000);
    }, 2000);
}

function saveProgress() {
    const progress = {
        loveLevel,
        lovePoints,
        dailyStreak,
        totalClicks,
        lastClickDate,
        unclaimedRewards
    };
    localStorage.setItem('loveProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('loveProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        loveLevel = progress.loveLevel;
        lovePoints = progress.lovePoints;
        dailyStreak = progress.dailyStreak;
        totalClicks = progress.totalClicks;
        lastClickDate = progress.lastClickDate;
        unclaimedRewards = progress.unclaimedRewards;
        updateHeartStats();
    }
}