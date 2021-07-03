formEl = document.getElementById("form");
mainEl = document.getElementById("main");
playersEl = document.getElementById("players-name");
playerNameEl = document.getElementById("input-name");
divideButtonEl = document.getElementById("divide-btn");
resetButtonEl = document.getElementById("reset-btn");
numberTeamsEl = document.getElementById("number-teams");
resultEl = document.getElementById("result");
teamsEl = null;
var allPlayers = [];
var teamsList = {};

async function playerList(playerName) {
  allPlayers.push(playerName);
  playersEl.innerHTML += `
    <li>${playerName}</li>
    `;
  mainEl.appendChild(playersEl);
}

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

async function teamDivison(teams) {
  if (allPlayers.length >= teams) {
    if (teamsEl) {
      teamsEl.remove();
    }
    shuffle(allPlayers);
    teamsEl = document.createElement("div");
    teamsEl.id = "teams";
    teamsEl.classList.add("teams");

    for (i = 0; i < teams; i++) {
      teamsList[i] = "team" + String(i);
    }
    for (i = 0; i < teams; i++) {
      teamsList[i] = document.createElement("div");
      teamsList[i].classList.add("team");
      teamsList[i].innerHTML = `<h3>Team ${i + 1}</h3>`;
    }

    for (i = 0; i < allPlayers.length; i++) {
      teamsList[i % teams].innerHTML += `<li>${allPlayers[i]}</li>`;
    }
    for (i = 0; i < teams; i++) {
      teamsEl.appendChild(teamsList[i]);
    }
    resultEl.appendChild(teamsEl);
  } else {
    teamsEl = document.createElement("div");
    teamsEl.id = "teams";
    teamsEl.classList.add("teams");
    teamsEl.innerHTML =
      "Players should must be greater than or equal to number of teams!!";
      resultEl.appendChild(teamsEl);
  }
}

async function resetPlayers() {
  allPlayers = [];
  teamsList = {};
  teamsEl.remove();
  playersEl.innerHTML = "<h1> Players </h1>";
  numberTeamsEl.value = "";
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  playerList(playerNameEl.value);
  playerNameEl.value = "";
  teamsList = {};
  if (teamsEl) {
    teamsEl.remove();
  }
});

divideButtonEl.addEventListener("click", (e) => {
  e.preventDefault();
  teamDivison(numberTeamsEl.value);
  numberTeamsEl.value = "";
});

resetButtonEl.addEventListener("click", resetPlayers);
