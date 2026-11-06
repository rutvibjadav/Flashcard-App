"use strict";

const flashcards = [
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
  },
  {
    question: "Which HTML element creates a hyperlink?",
    answer: "The <a> element, using its href attribute for the destination.",
  },
  {
    question: "What is the purpose of CSS?",
    answer: "CSS styles web pages, controlling layout, colors, typography, and presentation.",
  },
  {
    question: "Which CSS property changes an element's text color?",
    answer: "The color property.",
  },
  {
    question: "What does the CSS Flexbox layout help you do?",
    answer: "Arrange items in a row or column and align or distribute space between them.",
  },
  {
    question: "How do you declare a JavaScript constant?",
    answer: "Use const, for example: const siteName = \"Study Space\";",
  },
  {
    question: "What does JavaScript's querySelector() return?",
    answer: "The first element that matches the given CSS selector, or null if none matches.",
  },
  {
    question: "What is the DOM?",
    answer: "The Document Object Model: a tree-like representation of a web page that scripts can read and change.",
  },
  {
    question: "What does responsive web design mean?",
    answer: "Designing pages that adapt their layout and content to different screen sizes and devices.",
  },
  {
    question: "Which HTTP status code means “Not Found”?",
    answer: "404 Not Found.",
  },
];

const flashcardButton = document.querySelector("#flashcard");
const questionElement = document.querySelector("#question");
const answerElement = document.querySelector("#answer");
const cardCount = document.querySelector("#card-count");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressPercent = document.querySelector("#progress-percent");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const shuffleButton = document.querySelector("#shuffle-button");
const restartButton = document.querySelector("#restart-button");

let deck = [...flashcards];
let currentIndex = 0;

function renderCard() {
  const card = deck[currentIndex];
  const currentCardNumber = currentIndex + 1;
  const completion = Math.round((currentCardNumber / deck.length) * 100);

  questionElement.textContent = card.question;
  answerElement.textContent = card.answer;
  cardCount.innerHTML = `${String(currentCardNumber).padStart(2, "0")} <span>/ ${deck.length}</span>`;
  progressFill.style.width = `${completion}%`;
  progressPercent.textContent = `${completion}%`;
  progressTrack.setAttribute("aria-valuenow", String(completion));
  flashcardButton.setAttribute(
    "aria-label",
    `Question: ${card.question} Click to reveal the answer.`,
  );
  flashcardButton.classList.remove("is-flipped");
  flashcardButton.setAttribute("aria-pressed", "false");
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === deck.length - 1;
}

function changeCard(nextIndex) {
  if (nextIndex < 0 || nextIndex >= deck.length || nextIndex === currentIndex) {
    return;
  }

  currentIndex = nextIndex;
  renderCard();
}

function shuffleDeck() {
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
  }

  currentIndex = 0;
  renderCard();
}

flashcardButton.addEventListener("click", () => {
  const isFlipped = flashcardButton.classList.toggle("is-flipped");
  flashcardButton.setAttribute("aria-pressed", String(isFlipped));
  flashcardButton.setAttribute(
    "aria-label",
    isFlipped
      ? `Answer: ${deck[currentIndex].answer} Click to see the question.`
      : `Question: ${deck[currentIndex].question} Click to reveal the answer.`,
  );
});

previousButton.addEventListener("click", () => changeCard(currentIndex - 1));
nextButton.addEventListener("click", () => changeCard(currentIndex + 1));
shuffleButton.addEventListener("click", shuffleDeck);
restartButton.addEventListener("click", () => {
  currentIndex = 0;
  renderCard();
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    changeCard(currentIndex - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    changeCard(currentIndex + 1);
  }
});

renderCard();
