function populateTeamSelect()
{
  var teamSelectContainer = document.getElementById("teamSelectContainer");
  
  var JSONActiveTeam = localStorage.getItem("bbTeamRoster");
  if (JSONActiveTeam !== null)
  {
    var loadTeam = document.createElement("a");
    loadTeam.href = "roster.html";
    loadTeam.innerHTML = "Load existing team.";
    teamSelectContainer.appendChild(loadTeam);
  }
  
  for (var team in teamDefs)
  {
    addTeamSelect(teamSelectContainer, team);
  }
}

/* Workaround for JavaScript scope issues only using final value of team.*/
function addTeamSelect(teamSelectContainer, team)
{
  var teamSelect = document.createElement("div");
  var teamSelectTitle = document.createElement("h1");
  var teamSelectButton = document.createElement("button");
  teamSelectButton.onclick = function() {setTeam(team);};
  teamSelectButton.innerHTML = "Create " + teamDefs[team].race + " Team";
  teamSelectTitle.innerHTML = teamDefs[team].race;
  teamSelectContainer.appendChild(teamSelect);
  teamSelect.appendChild(teamSelectTitle);
  teamSelect.appendChild(teamSelectButton);
}