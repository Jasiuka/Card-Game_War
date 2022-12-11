//// VARIABLES /////

let player1_score = document.querySelector(".warPoints_score_player1");
let player2_score = document.querySelector(".warPoints_score_player2");

let player1_cardSlot = document.querySelector(".card_inSlot_player1");
let player2_cardSlot = document.querySelector(".card_inSlot_player2");

let namesBox = document.querySelectorAll(".playerSide");
let messageBox = document.querySelector(".gameMessBox");

let message = document.querySelector(".gameMess");

let player1_CardNumber = document.querySelector(".player1_CardNumber");
let player2_CardNumber = document.querySelector(".player2_CardNumber");

let warMessage = document.querySelector(".warMessage");

let popUpBox = document.querySelector(".popUpBox");
let popUpText = document.querySelector(".popUp_text_win");
let popUpText_winner = document.querySelector(".popUp_text_winner");

let table = document.querySelector(".table");

const button_deti = document.querySelector(".btn_deal");
const button_start = document.querySelector(".btn_start");
const button_restart = document.querySelector(".btn_restart");

let player1_CARD;
let player1_CardName;
let player1_cards;
let player2_CARD;
let player2_CardName;
let player2_cards;
let war_cards = [];

let player1_wonWars = 0;
let player2_wonWars = 0;
let cardNum_player1;
let cardNum_player2;

let warTime = 0;

let warOn = false;
let playing = true;

let cards = [
  "Bugn_2",
  "Bugn_3",
  "Bugn_4",
  "Bugn_5",
  "Bugn_6",
  "Bugn_7",
  "Bugn_8",
  "Bugn_9",
  "Bugn_10",
  "Bugn_Bart",
  "Bugn_Dam",
  "Bugn_Kar",
  "Bugn_Tuzas",
  "Kryz_2",
  "Kryz_3",
  "Kryz_4",
  "Kryz_5",
  "Kryz_6",
  "Kryz_7",
  "Kryz_8",
  "Kryz_9",
  "Kryz_10",
  "Kryz_Bart",
  "Kryz_Dam",
  "Kryz_Kar",
  "Kryz_Tuzas",
  "Sird_2",
  "Sird_3",
  "Sird_4",
  "Sird_5",
  "Sird_6",
  "Sird_7",
  "Sird_8",
  "Sird_9",
  "Sird_10",
  "Sird_Bart",
  "Sird_Dam",
  "Sird_Kar",
  "Sird_Tuzas",
  "Vyn_2",
  "Vyn_3",
  "Vyn_4",
  "Vyn_5",
  "Vyn_6",
  "Vyn_7",
  "Vyn_8",
  "Vyn_9",
  "Vyn_10",
  "Vyn_Bart",
  "Vyn_Dam",
  "Vyn_Kar",
  "Vyn_Tuzas",
];

///// KORTOS
const cardsDeck = {
  Bugn_2: 2,
  Bugn_3: 3,
  Bugn_4: 4,
  Bugn_5: 5,
  Bugn_6: 6,
  Bugn_7: 7,
  Bugn_8: 8,
  Bugn_9: 9,
  Bugn_10: 10,
  Bugn_Bart: 11,
  Bugn_Dam: 12,
  Bugn_Kar: 13,
  Bugn_Tuzas: 14,
  Kryz_2: 2,
  Kryz_3: 3,
  Kryz_4: 4,
  Kryz_5: 5,
  Kryz_6: 6,
  Kryz_7: 7,
  Kryz_8: 8,
  Kryz_9: 9,
  Kryz_10: 10,
  Kryz_Bart: 11,
  Kryz_Dam: 12,
  Kryz_Kar: 13,
  Kryz_Tuzas: 14,
  Sird_2: 2,
  Sird_3: 3,
  Sird_4: 4,
  Sird_5: 5,
  Sird_6: 6,
  Sird_7: 7,
  Sird_8: 8,
  Sird_9: 9,
  Sird_10: 10,
  Sird_Bart: 11,
  Sird_Dam: 12,
  Sird_Kar: 13,
  Sird_Tuzas: 14,
  Vyn_2: 2,
  Vyn_3: 3,
  Vyn_4: 4,
  Vyn_5: 5,
  Vyn_6: 6,
  Vyn_7: 7,
  Vyn_8: 8,
  Vyn_9: 9,
  Vyn_10: 10,
  Vyn_Bart: 11,
  Vyn_Dam: 12,
  Vyn_Kar: 13,
  Vyn_Tuzas: 14,
};

//// Main game
gameStart();
button_start.addEventListener("click", function () {
  popUpBox.classList.add("hide");
  messageBox.classList.remove("hide");
  namesBox.forEach((box) => box.classList.remove("hide"));
  table.classList.remove("hide");
  button_restart.classList.remove("hide_btn");
  button_start.classList.add("hide_btn");
  popUpText.textContent = "WINS!";

  mainApp();
});

button_restart.addEventListener("click", function () {
  player1_wonWars = 0;
  player2_wonWars = 0;
  player1_score.textContent = player2_score.textContent = 0;
  player1_cardSlot.src = player2_cardSlot.src = "AllS.png";

  shuffledCards = shuffleCards(cards);
  player1_cards = splitCards(shuffledCards, 0, 26);
  player2_cards = splitCards(shuffledCards, 26, shuffledCards.length);

  // shuffle player cards one more time
  player1_cards = shuffleCards(player1_cards);
  player2_cards = shuffleCards(player2_cards);

  updateCardNumber();
  hidePopUp();
});
// Card deck shuffle

function mainApp() {
  button_deti.addEventListener("click", function () {
    showCards();
  });

  let shuffledCards = shuffleCards(cards);

  // split card deck to players
  player1_cards = splitCards(shuffledCards, 0, 26);
  player2_cards = splitCards(shuffledCards, 26, shuffledCards.length);

  // shuffle player cards one more time
  player1_cards = shuffleCards(player1_cards);
  player2_cards = shuffleCards(player2_cards);

  updateCardNumber();
}

function showCards() {
  player1_CardName = player1_cards[0];
  player1_CARD = cardsDeck[player1_CardName];
  player1_cards.splice(0, 1);
  player1_cardSlot.src = `kortos/${player1_CardName}.png`;

  player2_CardName = player2_cards[0];
  player2_CARD = cardsDeck[player2_CardName];
  player2_cards.splice(0, 1);
  player2_cardSlot.src = `kortos/${player2_CardName}.png`;

  checkForWin();
}

function checkForWin() {
  if (player1_CARD > player2_CARD) {
    player1_cards.push(player1_CardName);
    player1_cards.push(player2_CardName);
    message.textContent = !warOn ? "Player wins!" : "Player wins war!";
    message.classList.toggle("effect");
    setTimeout(function () {
      message.classList.toggle("effect");
    }, 1500);

    if (warOn) {
      player1_cards = pushCards(player1_cards);
      player1_wonWars++;
      player1_score.textContent = player1_wonWars.toString();
      warMessage.classList.add("hide");
      warOn = false;
    }
  }
  if (player2_CARD > player1_CARD) {
    player2_cards.push(player2_CardName);
    player2_cards.push(player1_CardName);
    message.textContent = !warOn ? "Computer wins!" : "Computer wins war!";
    message.classList.toggle("effect");
    setTimeout(function () {
      message.classList.toggle("effect");
    }, 1500);

    if (warOn) {
      player2_cards = pushCards(player2_cards);
      player2_wonWars++;
      player2_score.textContent = player2_wonWars.toString();
      warMessage.classList.add("hide");
      warOn = false;
    }
  }
  if (player1_CARD === player2_CARD) {
    war();
  }
  updateCardNumber();
  checkForZero();
}

function checkForZero() {
  if (player1_cards.length === 0) {
    popUpBox.classList.remove("hide");
    messageBox.classList.add("hide");
    namesBox.forEach((box) => box.classList.add("hide"));
    table.classList.add("hide");
    popUpText_winner.textContent = "COMPUTER";
  }
  if (player2_cards.length === 0) {
    popUpBox.classList.remove("hide");
    messageBox.classList.add("hide");
    namesBox.forEach((box) => box.classList.add("hide"));
    table.classList.add("hide");
    popUpText_winner.textContent = "PLAYER";
  }
}

function war() {
  warOn = true;
  warTime++;
  console.log("War time: " + warTime);
  warMessage.classList.remove("hide");

  war_cards.push(
    player1_cards[0],
    player2_cards[0],
    player1_CardName,
    player2_CardName
  );
  player1_cards.splice(0, 1);
  player2_cards.splice(0, 1);
}

function updateCardNumber() {
  player1_CardNumber.textContent = player1_cards.length.toString();

  player2_CardNumber.textContent = player2_cards.length.toString();
}

function pushCards(winnerDeck) {
  for (let i = 0; i < war_cards.length; i++) {
    winnerDeck.push(war_cards[i]);
  }
  war_cards.splice(0, war_cards.length);

  return winnerDeck;
}

function shuffleCards(cards) {
  let temp;
  for (let i = 0; i < cards.length - 1; i++) {
    let rnd = Math.floor(Math.random() * cards.length);
    temp = cards[i];
    cards[i] = cards[rnd];
    cards[rnd] = temp;
  }
  return cards;
}

function splitCards(cards, start, end) {
  return cards.slice(start, end);
}

function gameStart() {
  popUpBox.classList.remove("hide");
  button_restart.classList.add("hide_btn");
  button_start.classList.remove("hide_btn");
  // popUpText.style.fontSize = "8rem";
  popUpText.textContent = "Welcome to WAR!";
  popUpText_winner.textContent = "";
}

function hidePopUp() {
  popUpBox.classList.add("hide");
  messageBox.classList.remove("hide");
  namesBox.forEach((box) => box.classList.remove("hide"));
  table.classList.remove("hide");
}
