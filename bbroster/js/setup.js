var activeTeam;
var selectedPlayer = null;
var selectedPlayerDisplay = null;
var isOffense = true;
var changesSaved = true;

/* Perform initial setup for setup.html. */
function initialiseSetup()
{
  var rosterNo = Number.parseInt(localStorage.getItem("bbRosterNo"));
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  if (rosterNo === null || JSONAllTeams === null)
  {
    window.location.href = "index.html";
  }
  else
  {
    var allTeams = JSON.parse(JSONAllTeams);
    activeTeam = allTeams[rosterNo];
    
    createPitch();
    
    for (var playerNum in activeTeam.players)
    {
      createPlayer(playerNum);
    }
  }
}

/* Populate pitch containers with the appropiate number of squares. */
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
  
  /* Add onclick eventListener that does not call function if child element is clicked. */
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

/* Create HTML elements to display player on pitch. */
function createPlayer(playerNum)
{
  var thisPlayer = activeTeam.players[playerNum];
  if (thisPlayer.isAvailable)
  {
    var playerDisplay = document.createElement("div");
    playerDisplay.id = "player" + playerNum;
    playerDisplay.className = "jerseyNumber tooltipParent";
    playerDisplay.style.background = "url('img/setup/" + thisPlayer.playerTypeId + ".gif') no-repeat center";
    playerDisplay.innerHTML = ("0" + thisPlayer.jerseyNumber).slice(-2);
    playerDisplay.onclick = function() {clickPlayer(thisPlayer, playerDisplay);};
    placePlayer(thisPlayer, playerDisplay);
    
    var playerTooltip = document.createElement("div");
    playerTooltip.innerHTML = thisPlayer.playerName + " - " + playerDefs[thisPlayer.playerTypeId].name;
    playerTooltip.className = "tooltip";
    playerDisplay.appendChild(playerTooltip);
  }
  else
  {
    thisPlayer.position = ["reserves", "reserves"];
  }
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

/* Called when user clicks on any player. Stores currently selected player for
 * future use. */
function clickPlayer(thisPlayer, playerDisplay)
{
  selectedPlayer = thisPlayer;
  selectedPlayerDisplay = playerDisplay;
}

/* Called when user clicks on any cell. If there is a selected player and the
 *  cell can hold a player, move the player to that cell. */
function clickSquare(cell)
{
  console.log("Clicked Square: " + cell.id);
  if (selectedPlayer !== null && (!cell.hasChildNodes() || cell.id === "reserves"))
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
    
    changesSaved = false;
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

/* Saves the current roster then sends browser to main roster page. */
function goToRoster()
{
  saveTeam();
  window.location.href = "roster.html";
}
