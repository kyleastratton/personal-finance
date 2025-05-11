// app.js
import { initBudgetSection } from './budget.js';
import { initNetWorthSection } from './networth.js';
import { exportData, importData } from './storage.js';

// Tab switching
const tabs = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;
    sections.forEach(section => {
      section.classList.toggle('hidden', section.id !== targetId);
    });
  });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Load theme on init
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Init sections
initBudgetSection();
initNetWorthSection();

// Export/Import
const exportBtn = document.getElementById('export-data');
const importInput = document.getElementById('import-data');

exportBtn.addEventListener('click', exportData);
importInput.addEventListener('change', importData);
