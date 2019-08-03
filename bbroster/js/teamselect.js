function populateTeamSelect()
{
  var teamSelectContainer = document.getElementById("teamSelectContainer");
  
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  if (JSONAllTeams !== null)
  {
    var allTeams = JSON.parse(JSONAllTeams);
    for (var team in allTeams)
    {
      var loadTeamLink = document.createElement("a");
      loadTeamLink.href = "roster.html";
      loadTeamLink.innerHTML = "Load " + allTeams[team].name + " roster.";
      teamSelectContainer.appendChild(loadTeamLink);
    }
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
  teamSelectContainer.appendChild(teamSelect);
  
  var teamSelectTitle = document.createElement("h1");
  teamSelectTitle.innerHTML = teamDefs[team].race;
  teamSelect.appendChild(teamSelectTitle);
  
  var teamSelectDescription = document.createElement("p");
  teamSelectDescription.innerHTML = teamDefs[team].description;
  teamSelect.appendChild(teamSelectDescription);
  
  var teamSelectButton = document.createElement("button");
  teamSelectButton.onclick = function() {setRace(team);};
  teamSelectButton.innerHTML = "Create " + teamDefs[team].race + " Team";
  teamSelect.appendChild(teamSelectButton);
}