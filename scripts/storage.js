// storage.js

export function saveData(key, data) {
    const fullData = getAllData();
    fullData[key] = data;
    localStorage.setItem('finance-app-data', JSON.stringify(fullData));
  }
  
  export function getData(key) {
    const fullData = getAllData();
    return fullData[key];
  }
  
  export function getAllData() {
    return JSON.parse(localStorage.getItem('finance-app-data')) || {};
  }
  
  export function exportData() {
    const data = localStorage.getItem('finance-app-data');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-finance-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  export function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const json = JSON.parse(e.target.result);
        localStorage.setItem('finance-app-data', JSON.stringify(json));
        location.reload();
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }
  