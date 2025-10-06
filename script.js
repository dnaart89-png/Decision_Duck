const pros = [];
const cons = [];

function addItem(type) {
  const text = document.getElementById(`${type}Text`).value.trim();
  const score = parseInt(document.getElementById(`${type}Score`).value);
  if (!text || isNaN(score) || score < 1 || score > 10) {
    alert("Please enter a reason and a score between 1 and 10.");
    return;
  }

  const list = type === 'pro' ? pros : cons;
  list.push({ text, score });

  const ul = document.getElementById(`${type}List`);
  const li = document.createElement('li');
  li.textContent = `${text} (+${score})`;
  ul.appendChild(li);

  // Save to localStorage
  localStorage.setItem('decisionDuck_pros', JSON.stringify(pros));
  localStorage.setItem('decisionDuck_cons', JSON.stringify(cons));

  document.getElementById(`${type}Text`).value = '';
  document.getElementById(`${type}Score`).value = '';
}

function getDecision() {
  const topic = document.getElementById('decisionTopic').value.trim();
  if (!topic) {
    alert("Please enter the decision topic.");
    return;
  }

  const totalPros = pros.reduce((sum, item) => sum + item.score, 0);
  const totalCons = cons.reduce((sum, item) => sum + item.score, 0);

  let message = '';
  if (totalPros > totalCons) {
    message = `🎉 Go for it! The duck approves your plan to "${topic}".`;
  } else if (totalCons > totalPros) {
    message = `🛑 Maybe not this time. The duck thinks you should hold off on "${topic}".`;
  } else {
    message = `🤔 It's a tie! The duck can't decide either. Maybe flip a coin?`;
  }

  document.getElementById('resultMessage').textContent = message;
}

// Load saved decisions
window.onload = function() {
  const savedPros = JSON.parse(localStorage.getItem('decisionDuck_pros')) || [];
  const savedCons = JSON.parse(localStorage.getItem('decisionDuck_cons')) || [];

  savedPros.forEach(item => {
    pros.push(item);
    const li = document.createElement('li');
    li.textContent = `${item.text} (+${item.score})`;
    document.getElementById('proList').appendChild(li);
  });

  savedCons.forEach(item => {
    cons.push(item);
    const li = document.createElement('li');
    li.textContent = `${item.text} (+${item.score})`;
    document.getElementById('conList').appendChild(li);
  });
};
