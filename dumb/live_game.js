const noPositionPlayers = [];

function loadData() {
  fetch('http://localhost:3000/liveclientdata/allgamedata')
    .then(res => res.json())
    .then(data => {
      noPositionPlayers.length = 0;  // clear from previous runs
      
      const players = data.allPlayers;

      players.forEach((player, index) => {
        const champName = player.championName.replace(/[ '.&]/g, "");
        const score = player.scores.kills + "/" + player.scores.deaths + "/" + player.scores.assists;
        const team = index < 5 ? 1 : 2;
        const role = player.position;
        const containerId = role + team;
        const container = document.getElementById(containerId);
        const playerId = champName + team;

        if (!container) {
          console.log("didn't find position container for", champName);
          noPositionPlayers.push({ player, team });
          return;
        }

        let playerDiv = document.getElementById(playerId);
        if (playerDiv) {
          const textDiv = playerDiv.querySelector('.player-score');
          if (textDiv) {
            textDiv.textContent = champName + " " + score;
          }
        } else {
          playerDiv = document.createElement('div');
          playerDiv.id = playerId;
          playerDiv.className = 'player-card';

          const img = document.createElement('img');
          img.width = 64;
          img.height = 64;
          img.src = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champName}.png`;
          playerDiv.appendChild(img);

          const text = document.createElement('div');
          text.className = 'player-score';
          text.textContent = champName + " " + score;
          playerDiv.appendChild(text);

          container.appendChild(playerDiv);
        }
      });

 // if cant find a position
  noPositionPlayers.forEach(({ player, team }) => {
        const champName = player.championName.replace(/[ '.&]/g, "");
        const score = player.scores.kills + "/" + player.scores.deaths + "/" + player.scores.assists;
        const role = player.position;
        const containerId = role + team;
        const container = document.getElementById(containerId);
        const playerId = champName + team;

  let playerDiv = document.getElementById(playerId);
        if (playerDiv) {
          const textDiv = playerDiv.querySelector('.player-score');
          if (textDiv) {
            textDiv.textContent = champName + " " + score;
          }
        } else {
          playerDiv = document.createElement('div');
          playerDiv.id = playerId;
          playerDiv.className = 'player-card';

          const img = document.createElement('img');
          img.width = 64;
          img.height = 64;
          img.src = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champName}.png`;
          playerDiv.appendChild(img);

          const text = document.createElement('div');
          text.className = 'player-score';
          text.textContent = champName + " " + score;
          playerDiv.appendChild(text);

        }
  // just puts the player into the first availible role
  const topSlot = document.getElementById("TOP" + team);
  const jungleSlot = document.getElementById("JUNGLE" + team);
  const middleSlot = document.getElementById("MIDDLE" + team);
  const bottomSlot = document.getElementById("BOTTOM" + team);
  const utilitySlot = document.getElementById("UTILITY" + team);

  if (topSlot && topSlot.children.length === 0) {
    topSlot.appendChild(playerDiv);
  } else if (jungleSlot && jungleSlot.children.length === 0) {
    jungleSlot.appendChild(playerDiv);
  } else if (middleSlot && middleSlot.children.length === 0) {
    middleSlot.appendChild(playerDiv);
  } else if (bottomSlot && bottomSlot.children.length === 0) {
    bottomSlot.appendChild(playerDiv);
  } else if (utilitySlot && utilitySlot.children.length === 0) {
    utilitySlot.appendChild(playerDiv);
  }
});
})
.catch(error => {
  console.log(error)
  document.getElementById("errorMessage").style.display = "block"
})}
loadData()

setInterval(loadData, 10000);
