function populateTeamSelect()
{
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var noOfRosters = 0;
  
  // If new user, save empty roster array.
  if (JSONAllTeams === null)
  {
    localStorage.setItem("bbTeamRosters", "[]");
  }
  else
  {
    // Loop through all existing teams, creating a button to access each roster.
    var allTeams = JSON.parse(JSONAllTeams);
    noOfRosters = allTeams.length;
    
    for (var teamNo in allTeams)
    {
      addLoadTeamButton(allTeams[teamNo].name, teamNo)
    }
  }
  
  for (var teamId in teamDefs)
  {
    addTeamSelect(teamId, noOfRosters);
  }
}

/* Workaround for JavaScript scope issues only using final value of team.*/
function addLoadTeamButton(teamName, teamNo)
{
  var loadTeamButton = document.createElement("button");
  loadTeamButton.onclick = function() {openExistingRoster(teamNo)};
  loadTeamButton.innerHTML = "Open " + teamName + " roster.";
  document.getElementById("teamSelectContainer").appendChild(loadTeamButton);
}

/* Workaround for JavaScript scope issues only using final value of team.*/
function addTeamSelect(teamId, newRosterNo)
{
  var teamSelect = document.createElement("div");
  document.getElementById("teamSelectContainer").appendChild(teamSelect);
  
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
