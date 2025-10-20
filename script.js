const quizData = [
    {
        question: "What is the primary function of Momentum Vaults?",
        options: [
            "To provide liquidity for decentralized exchanges",
            "To offer automated, high-performance yield strategies",
            "To facilitate peer-to-peer lending",
            "To mint new tokens"
        ],
        answer: "To offer automated, high-performance yield strategies"
    },
    {
        question: "Which of the following is a key feature of Momentum's CLMM?",
        options: [
            "Uniform liquidity distribution across all price ranges",
            "Concentrated liquidity within custom price ranges",
            "Fixed interest rates for liquidity providers",
            "Automatic token staking"
        ],
        answer: "Concentrated liquidity within custom price ranges"
    },
    {
        question: "What does bonding MMT into veMMT grant users?",
        options: [
            "Access to exclusive token sales and airdrops",
            "Increased transaction fees",
            "Voting power and emissions influence",
            "Ownership of the platform's governance tokens"
        ],
        answer: "Voting power and emissions influence"
    },
    {
        question: "Which platform does Momentum's Token Generation Lab (TGL) primarily support?",
        options: ["Ethereum","Binance Smart Chain","Sui","Solana"],
        answer: "Sui"
    },
    {
        question: "What is the primary purpose of MSafe?",
        options: [
            "To provide a decentralized exchange platform",
            "To offer secure treasury infrastructure and token vesting",
            "To facilitate cross-chain transactions",
            "To mint new tokens"
        ],
        answer: "To offer secure treasury infrastructure and token vesting"
    },
    {
        question: "Which of the following is NOT a core product of Momentum Finance?",
        options: ["MSafe","Momentum DEX","xSUI","Ethereum Bridge"],
        answer: "Ethereum Bridge"
    },
    {
        question: "What is the role of Wormhole in Momentum's ecosystem?",
        options: [
            "To provide liquidity for token swaps",
            "To serve as the interoperability layer connecting different blockchains",
            "To mint new tokens",
            "To stake assets on behalf of users"
        ],
        answer: "To serve as the interoperability layer connecting different blockchains"
    },
    {
        question: "Which of the following is a benefit of using Momentum Vaults?",
        options: [
            "Manual trade execution",
            "Automated strategy execution with phased launches",
            "Fixed interest rates",
            "Centralized asset management"
        ],
        answer: "Automated strategy execution with phased launches"
    },
    {
        question: "What type of assets does Momentum aim to integrate in its final phase?",
        options: [
            "Only cryptocurrencies",
            "Only real-world assets (RWAs)",
            "Both cryptocurrencies and real-world assets",
            "Only NFTs"
        ],
        answer: "Both cryptocurrencies and real-world assets"
    },
    {
        question: "What is the main advantage of using Momentum's CLMM over traditional AMMs?",
        options: [
            "Fixed liquidity across all price ranges",
            "Higher capital efficiency and reduced slippage",
            "Centralized control of liquidity",
            "Automatic token staking"
        ],
        answer: "Higher capital efficiency and reduced slippage"
    }
];

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");
const shareBtn = document.getElementById("share-btn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });

    nextBtn.classList.add("hidden");
    updateProgress();
}

function selectOption(button, selected) {
    if (answered) return;
    answered = true;

    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.innerText === correct) btn.classList.add("correct");
        });
    }
    nextBtn.classList.remove("hidden");
}

function updateProgress() {
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreEl.innerText = `${score} / ${quizData.length}`;
    progressEl.style.width = `100%`;

    if (score === quizData.length) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }

    shareBtn.classList.remove("hidden");
    const text = encodeURIComponent(`I scored ${score}/${quizData.length} on the Momentum Finance Quiz! Can you beat me? 🚀`);
    const url = encodeURIComponent(window.location.href);
    shareBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
});

loadQuestion();
