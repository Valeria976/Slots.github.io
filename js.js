
const images = [
  "images/one.jpg",  
  "images/two.jpg",   
  "images/three.jpg",  
  "images/four.jpg", 
  "images/five.jpg",   
  "images/six.jpg"
];


let balance = 150;
let attempts = 0;
const maxAttempts = 3;

const username = prompt("Введіть своє ім’я:");
document.getElementById("username").textContent = ` ${username || "User"}`;

const slots = document.querySelectorAll(".slot");
const balanceDisplay = document.getElementById("balance");
const attemptsDisplay = document.getElementById("attempts");
const message = document.getElementById("message");
const generateButton = document.getElementById("generate");
const resetButton = document.getElementById("reset");

function generateSlots() {
  let columns = [[], [], []];

  for (let col = 0; col < 3; col++) {
      let used = new Set();
      for (let row = 0; row < 3; row++) {
          let randomIndex;
          do {
              randomIndex = Math.floor(Math.random() * images.length);
          } while (used.has(randomIndex));
          used.add(randomIndex);
          columns[col].push(images[randomIndex]);
      }
  }

  slots.forEach((slot, index) => {
      const row = index % 3;
      const col = Math.floor(index / 3);

      const img = document.createElement("img");
      img.src = columns[col][row];
      img.alt = "Fruit";  
      slot.innerHTML = ''; 
      slot.appendChild(img); 
  });

  return columns;
}

function checkWin(columns) {
  for (let row = 0; row < 3; row++) {
      if (
          columns[0][row] === columns[1][row] &&
          columns[1][row] === columns[2][row]
      ) {
          return true;
      }
  }
  return false;
}

function updateBalance(amount) {
  balance += amount;
  balanceDisplay.textContent = balance;
}

generateButton.addEventListener("click", () => {
  if (attempts >= maxAttempts || balance < 50) {
      message.textContent = "Гра завершена, можете спробувати ще раз";
      generateButton.disabled = true;
      resetButton.style.display = "inline-block";
      return;
  }

  updateBalance(-50);
  attempts++;
  attemptsDisplay.textContent = attempts;

  const columns = generateSlots();
  if (checkWin(columns)) {
      updateBalance(1000000);
      message.textContent = `Вітаємо, Ви виграли 1 000 000 грн!`;
      generateButton.disabled = true;
      resetButton.style.display = "inline-block";
  } else if (attempts === maxAttempts) {
      message.textContent = "Ви програли";
  } else {
      message.textContent = "Не вийшло. Спробуйте ще.";
  }
});

resetButton.addEventListener("click", () => {
  balance = 150;
  attempts = 0;
  updateBalance(0);
  attemptsDisplay.textContent = 1;
  message.textContent = "";
  generateButton.disabled = false;
  resetButton.style.display = "none";
  slots.forEach(slot => (slot.innerHTML = ""));
});
