/* Populates index.html with elements derived from teamDefinitions.js and localStorage.bbTeamRosters. */
function populateTeamSelect()
{
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var noOfRosters = 0;
  
  /* If new user, save new empty roster array. */
  if (JSONAllTeams === null)
  {
    localStorage.setItem("bbTeamRosters", "[]");
  }
  else
  {
    /* Loop through all existing teams, creating a button to access each roster. */
    var allTeams = JSON.parse(JSONAllTeams);
    noOfRosters = allTeams.length;
    
    for (var teamNo in allTeams)
    {
      addLoadTeamButton(allTeams[teamNo], teamNo);
    }
  }
  
  if (noOfRosters === 0)
  {
    document.getElementById("rosterOpenContainer").innerHTML = "You don't have any saved rosters.";
  }
  
  /* Loop through all supported teams, creating HTML elements for each. */
  for (var teamId in teamDefs)
  {
    addTeamSelect(teamId, noOfRosters);
  }
}

/* Add HTML to allow opening an existing roster. */
function addLoadTeamButton(thisTeam, teamNo)
{
  var rosterOpen = document.createElement("div");
  rosterOpen.className = "teamBox clearfix";
  rosterOpen.style.background = thisTeam.colour + "80";
  
  rosterOpen.onmouseenter = function() {teamMouseEnter(thisTeam.raceId, thisTeam.colour);};
  rosterOpen.onmouseout = function() {teamMouseOut(thisTeam.raceId);};
  document.getElementById("rosterOpenContainer").appendChild(rosterOpen);
  
  var loadTeamButton = document.createElement("button");
  loadTeamButton.onclick = function() {openExistingRoster(teamNo);};
  loadTeamButton.innerHTML = "Open " + thisTeam.name + " roster";
  rosterOpen.appendChild(loadTeamButton);
  
  var loadTeamDescription = document.createElement("p");
  loadTeamDescription.innerHTML = thisTeam.teamValue.toLocaleString() + " TV " + teamDefs[thisTeam.raceId].race + " team";
  rosterOpen.appendChild(loadTeamDescription);
  
  var teamDisplayContainer = document.createElement("div");
  teamDisplayContainer.classList.add("floatRight");
  rosterOpen.appendChild(teamDisplayContainer);
  for (var playerNo in thisTeam.players)
  {
    var playerDisplay = document.createElement("img");
    playerDisplay.src = "img/setup/" + thisTeam.players[playerNo].playerTypeId + ".gif";
    teamDisplayContainer.appendChild(playerDisplay);
  }
}

/* Add HTML to allow creation of a new roster. */
function addTeamSelect(teamId, newRosterNo)
{
  var teamSelect = document.createElement("div");
  teamSelect.className = "raceBox clearfix";
  teamSelect.onmouseenter = function() {teamMouseEnter(teamId, teamDefs[teamId].defaultColour);};
  teamSelect.onmouseout = function() {teamMouseOut(teamId);};
  document.getElementById("rosterCreateContainer").appendChild(teamSelect);
  
  var teamSelectCrest = document.createElement("img");
  teamSelectCrest.classList.add("floatLeft");
  teamSelectCrest.src = "img/" + teamDefs[teamId].crest;
  teamSelect.appendChild(teamSelectCrest);
  
  var teamSelectTitle = document.createElement("h1");
  teamSelectTitle.innerHTML = teamDefs[teamId].race;
  teamSelect.appendChild(teamSelectTitle);
  
  var teamSelectDescription = document.createElement("p");
  teamSelectDescription.innerHTML = teamDefs[teamId].description;
  teamSelect.appendChild(teamSelectDescription);
  
  var teamSelectButton = document.createElement("button");
  teamSelectButton.onclick = function() {createNewRoster(teamId, newRosterNo);};
  teamSelectButton.innerHTML = "Create " + teamDefs[teamId].race + " Team";
  teamSelect.appendChild(teamSelectButton);
}

/* Called when cursor enters team container, modifies hero image to emphasise that team. */
function teamMouseEnter(teamId, teamColour)
{
  document.getElementById("heroImage").style.backgroundColor = teamColour;
  
  var portrait = document.getElementById(teamId + "Portrait");
  if (portrait !== null)
  {
    portrait.contentDocument.rootElement.unpauseAnimations();
  }
}

/* Called when cursor leaves team container, removes team emphasis from hero image. */
function teamMouseOut(teamId)
{
  document.getElementById("heroImage").style.backgroundColor = "white";
  
  var portrait = document.getElementById(teamId + "Portrait");
  if (portrait !== null)
  {
    portrait.contentDocument.rootElement.pauseAnimations();
  }
}
