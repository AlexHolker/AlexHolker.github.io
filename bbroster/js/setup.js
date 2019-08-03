var allTeams;
var activeTeam;
var selectedPlayer = null;
var selectedPlayerDisplay = null;
var isOffense = true;

function initialiseSetup()
{
  if (localStorage.getItem("bbTeamRosters") === null)
  {
    window.location.href = "index.html";
  }
  else
  {
    var JSONAllTeams = localStorage.getItem("bbTeamRosters");
    allTeams = JSON.parse(JSONAllTeams);
    activeTeam = allTeams[0];
    
    createPitch();
    
    for (var playerNum in activeTeam.players)
    {
      createPlayer(playerNum);
    }
  }
}

function createPitch()
{
  var pitchLeft = document.getElementById("pitchLeft");
  for (var i = 0; i < 12; i++)
  {
    for (var j = 0 ; j < 4; j++)
    {
      createCell(i + "x" + j, pitchLeft);
    }
  }
  
  var pitchCentre = document.getElementById("pitchCentre");
  for (var i = 0; i < 12; i++)
  {
    for (var j = 4 ; j < 11; j++)
    {
      createCell(i + "x" + j, pitchCentre);
    }
  }
  
  var pitchRight = document.getElementById("pitchRight");
  for (var i = 0; i < 12; i++)
  {
    for (var j = 11 ; j < 15; j++)
    {
      createCell(i + "x" + j, pitchRight);
    }
  }
  
  document.getElementById("reserves").addEventListener("click", function(e) {e = window.event || e; 
    if(this === e.target) {
        clickSquare(this);
    }});
}

function createCell(id, parent)
{
  var cell = document.createElement("div");
  cell.id = id;
  cell.className = "pitchSquare";
  cell.onclick = function() {clickSquare(cell);};
  parent.appendChild(cell);
}

function createPlayer(playerNum)
{
  var thisPlayer = activeTeam.players[playerNum];
  var playerDisplay = document.createElement("div");
  playerDisplay.id = "player" + playerNum;
  playerDisplay.className = "jerseyNumber tooltipParent";
  playerDisplay.style.background = "url('img/" + thisPlayer.playerTypeId + ".gif') no-repeat center";
  playerDisplay.innerHTML = ("0" + thisPlayer.jerseyNumber).slice(-2);
  playerDisplay.onclick = function() {clickPlayer(thisPlayer, playerDisplay);};
  placePlayer(thisPlayer, playerDisplay);
  
  var playerTooltip = document.createElement("div");
  playerTooltip.innerHTML = thisPlayer.playerName + " - " + playerDefs[thisPlayer.playerTypeId].name;
  playerTooltip.className = "tooltip";
  playerDisplay.appendChild(playerTooltip);
}

function placePlayer(thisPlayer, playerDisplay)
{
  if (isOffense)
  {
    document.getElementById(thisPlayer.position[0]).appendChild(playerDisplay);
  }
  else
  {
    document.getElementById(thisPlayer.position[1]).appendChild(playerDisplay);
  }
}

function clickPlayer(thisPlayer, playerDisplay)
{
  selectedPlayer = thisPlayer;
  selectedPlayerDisplay = playerDisplay;
}

function clickSquare(cell)
{
  console.log("Clicked Square: " + cell.id);
  if (selectedPlayer !== null && (!cell.hasChildNodes() || cell.id == "reserves"))
  {
    cell.appendChild(selectedPlayerDisplay);
    if (isOffense)
    {
      selectedPlayer.position[0] = cell.id;
    }
    else
    {
      selectedPlayer.position[1] = cell.id;
    }
  }
}

function switchSetup()
{
  var setupTitle = document.getElementById("setupTitle");
  var switchSetupButton = document.getElementById("switchSetupButton");
  
  if (isOffense)
  {
    isOffense = false;
    setupTitle.innerHTML = "Kicking Formation";
    switchSetupButton.innerHTML = "Receiving Formation";
  }
  else
  {
    isOffense = true;
    setupTitle.innerHTML = "Receiving Formation";
    switchSetupButton.innerHTML = "Kicking Formation";
  }
  
  for (var playerNum in activeTeam.players)
  {
    var playerDisplay = document.getElementById("player" + playerNum);
    placePlayer(activeTeam.players[playerNum], playerDisplay);
  }
}

function goToRoster()
{
  saveTeam();
  window.location.href = "roster.html";
}