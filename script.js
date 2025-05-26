let fruitData = {};
let mutationData = {};

const fruitSelect = document.getElementById("fruit");
const mutationSelect = document.getElementById("mutation");
const result = document.getElementById("result");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    fruitData = data.fruits;
    mutationData = data.mutations;

    // Populate fruit dropdown
    for (const fruit in fruitData) {
      const option = document.createElement("option");
      option.value = fruit;
      option.textContent = fruit;
      fruitSelect.appendChild(option);
    }

    // Populate mutation dropdown
    for (const mutation in mutationData) {
      const option = document.createElement("option");
      option.value = mutation;
      option.textContent = mutation;
      mutationSelect.appendChild(option);
    }
  });

function updatePrice() {
  const fruit = fruitSelect.value;
  const mutation = mutationSelect.value;

  if (fruitData[fruit] && mutationData[mutation] !== undefined) {
    const basePrice = fruitData[fruit].Price;
    const multiplier = mutationData[mutation];
    const total = basePrice * multiplier;
    result.textContent = `💰 Estimated Value: $${total.toLocaleString()}`;
  } else {
    result.textContent = "💰 Select options to see price.";
  }
}

fruitSelect.addEventListener("change", updatePrice);
mutationSelect.addEventListener("change", updatePrice);
