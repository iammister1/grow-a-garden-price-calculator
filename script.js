let fruitData = {};
let mutationData = {};

const fruitSelect = document.getElementById("fruit");
const mutationsContainer = document.getElementById("mutations-container");
const addMutationBtn = document.getElementById("add-mutation-btn");
const result = document.getElementById("result");

// Load data.json and populate selects
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    fruitData = data.fruits;
    mutationData = data.mutations;

    populateFruitSelect();
    populateMutationSelects();

    updatePrice();
  });

function populateFruitSelect() {
  fruitSelect.innerHTML = '<option disabled selected>Choose a fruit</option>';
  for (const fruit in fruitData) {
    const option = document.createElement("option");
    option.value = fruit;
    option.textContent = fruit;
    fruitSelect.appendChild(option);
  }
}

function populateMutationSelects() {
  const selects = document.querySelectorAll(".mutation-select");
  selects.forEach(select => {
    select.innerHTML = '<option disabled selected>Choose a mutation</option>';
    for (const mutation in mutationData) {
      const option = document.createElement("option");
      option.value = mutation;
      option.textContent = mutation;
      select.appendChild(option);
    }
  });
}

// Add event listener for "Add another mutation" button
addMutationBtn.addEventListener("click", () => {
  const newSelect = document.createElement("select");
  newSelect.classList.add("mutation-select");
  mutationsContainer.appendChild(newSelect);
  populateMutationSelects();
  newSelect.addEventListener("change", updatePrice);
});

// Calculate and display the total price
function updatePrice() {
  const fruit = fruitSelect.value;
  if (!fruit || !fruitData[fruit]) {
    result.textContent = "💰 Select a fruit.";
    return;
  }

  const basePrice = fruitData[fruit].Price;
  const mutationSelects = document.querySelectorAll(".mutation-select");

  let totalMultiplier = 1;
  mutationSelects.forEach(select => {
    const mutation = select.value;
    if (mutation && mutationData[mutation] !== undefined) {
      totalMultiplier += mutationData[mutation];
    }
  });

  const totalPrice = basePrice * totalMultiplier;

  result.textContent = `💰 Estimated Value: $${totalPrice.toLocaleString()}`;
}

// Event listeners to update price on change
fruitSelect.addEventListener("change", updatePrice);
mutationsContainer.addEventListener("change", e => {
  if (e.target.classList.contains("mutation-select")) {
    updatePrice();
  }
});
