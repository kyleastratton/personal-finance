// budget.js
import { saveData, getData } from './storage.js';

const section = document.getElementById('budget');

export function initBudgetSection() {
  renderBudgetUI();
  loadBudgetData();
}

function renderBudgetUI() {
  const addBtn = document.createElement('button');
  addBtn.classList.add("btn");
  addBtn.textContent = 'Add Budget Card';
  addBtn.onclick = addBudgetCard;
  section.appendChild(addBtn);

  const cardList = document.createElement('div');
  cardList.id = 'budget-cards';
  section.appendChild(cardList);

  const totalDisplay = document.createElement('div');
  totalDisplay.id = 'budget-total';
  totalDisplay.className = 'total';
  section.appendChild(totalDisplay);
}

function addBudgetCard(data = {}) {
  const card = document.createElement('div');
  card.className = 'card';

  const row = document.createElement('div');
  row.className = 'card-row';

  const desc = createInput('Description', data.description);
  const type = createSelect(['Income', 'Expense'], data.type);
  const amount = createInput('Amount', data.amount, 'number');
  const notes = createInput('Notes', data.notes);

  [desc, type, amount, notes].forEach(el => row.appendChild(el));
  card.appendChild(row);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add("btn");
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => {
    card.remove();
    saveBudgetData();
  };
  card.appendChild(removeBtn);

  const cardsContainer = document.getElementById('budget-cards');
  cardsContainer.appendChild(card);

  [desc, type, amount, notes].forEach(input => input.addEventListener('input', saveBudgetData));

  saveBudgetData();
}

function createInput(placeholder, value = '', type = 'text') {
  const input = document.createElement('input');
  input.classList.add("inpt");
  input.placeholder = placeholder;
  input.value = value;
  input.type = type;
  return input;
}

function createSelect(options, selected = '') {
  const select = document.createElement('select');
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === selected) option.selected = true;
    select.appendChild(option);
  });
  return select;
}

function saveBudgetData() {
  const cards = document.querySelectorAll('#budget-cards .card');
  const data = Array.from(cards).map(card => {
    const inputs = card.querySelectorAll('input, select');
    return {
      description: inputs[0].value,
      type: inputs[1].value,
      amount: parseFloat(inputs[2].value) || 0,
      notes: inputs[3].value
    };
  });

  const total = data.reduce((sum, item) => {
    return sum + (item.type === 'Income' ? item.amount : -item.amount);
  }, 0);

  document.getElementById('budget-total').textContent = `Net Budget: £${total.toFixed(2)}`;
  saveData('budget', data);
}

function loadBudgetData() {
  const data = getData('budget') || [];
  data.forEach(addBudgetCard);
}
