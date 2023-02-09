/* eslint-disable no-alert */
/* eslint-disable no-console */

import './style.css';

let data = {};
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/p362tpK6VbN7j0QY3qSH/scores/';
const scoresList = document.querySelector('#score__table');
const refresh = document.querySelector('.refreshBtn');
const submit = document.querySelector('.addBtn');
const user = document.querySelector('#name');
const score = document.querySelector('#score');

const fetchData = async () => {
  try {
    const gamescore = await fetch(url);
    if (!gamescore.ok) {
      throw new Error(`Failed to fetch data, status code: ${gamescore.status}`);
    }

    const gamedata = await gamescore.json();
    scoresList.innerHTML = gamedata.result
      .map(({ user, score }) => `<li>${user}: ${score}</li>`)
      .join('');
  } catch (error) {
    console.error(error);
    scoresList.innerHTML = '<li>Failed to fetch data</li>';
  }
};

const sendData = async () => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to send data, status code: ${response.status}`);
    }

    fetchData();
  } catch (error) {
    console.error(error);
  }
};

refresh.addEventListener('click', (e) => {
  e.preventDefault();
  fetchData();
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const data1 = {
    user: user.value,
    score: score.value,
  };

  if (!data1.user || !data1.score) {
    alert('Required fields!');
    return;
  }

  data = data1;
  sendData();
  user.value = '';
  score.value = '';
});

window.onload = () => {
  fetchData();
};
