// networth.js
import { saveData, getData } from './storage.js';

const section = document.getElementById('networth');

export function initNetWorthSection() {
  renderNetWorthUI();
  loadNetWorthData();
}

function renderNetWorthUI() {
  const addBtn = document.createElement('button');
  addBtn.classList.add("btn");
  addBtn.textContent = 'Add Net Worth Card';
  addBtn.onclick = addNetWorthCard;
  section.appendChild(addBtn);

  const cardList = document.createElement('div');
  cardList.id = 'networth-cards';
  section.appendChild(cardList);

  const totalDisplay = document.createElement('div');
  totalDisplay.id = 'networth-total';
  totalDisplay.className = 'total';
  section.appendChild(totalDisplay);
}

function addNetWorthCard(data = {}) {
  const card = document.createElement('div');
  card.className = 'card';

  const row = document.createElement('div');
  row.className = 'card-row';

  const inst = createInput('Institution', data.institution);
  const type = createSelect([
    'Current Account', 'Savings', 'Pension', 'Investment', 'Cash', 'Property',
    'Vehicle', 'Large Assets', 'Mortgage', 'Loan', 'Credit Card', 'Other'
  ], data.type);
  const value = createInput('Value', data.value, 'number');
  const notes = createInput('Notes', data.notes);

  [inst, type, value, notes].forEach(el => row.appendChild(el));
  card.appendChild(row);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add("btn");
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => {
    card.remove();
    saveNetWorthData();
  };
  card.appendChild(removeBtn);

  const cardsContainer = document.getElementById('networth-cards');
  cardsContainer.appendChild(card);

  [inst, type, value, notes].forEach(input => input.addEventListener('input', saveNetWorthData));

  saveNetWorthData();
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

function saveNetWorthData() {
  const cards = document.querySelectorAll('#networth-cards .card');
  const data = Array.from(cards).map(card => {
    const inputs = card.querySelectorAll('input, select');
    return {
      institution: inputs[0].value,
      type: inputs[1].value,
      value: parseFloat(inputs[2].value) || 0,
      notes: inputs[3].value
    };
  });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  document.getElementById('networth-total').textContent = `Net Worth: £${total.toFixed(2)}`;

  saveData('networth', data);
}

function loadNetWorthData() {
  const data = getData('networth') || [];
  data.forEach(addNetWorthCard);
}
