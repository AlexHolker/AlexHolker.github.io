/* Store variables specifying which roster to open, then redirect to roster
 * page. */
function openExistingRoster(rosterNo)
{
  localStorage.setItem("bbRosterNo", rosterNo);
  window.location.href = "roster.html";
}

/* Store variables specifying which roster to create, then redirect to roster
 * page. */
function createNewRoster(raceId, newRosterNo)
{
  localStorage.setItem("bbRosterNo", newRosterNo);
  localStorage.setItem("bbRaceId", raceId);
  window.location.href = "roster.html";
}

/* Load rosters from localStorage, remove current roster, save rosters to
 * localStorage, then redirect to homepage. */
function deleteRoster()
{
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams.splice(localStorage.getItem("bbRosterNo"), 1);
  JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
  localStorage.removeItem("bbRosterNo");
  window.location.href = "index.html";
}

/* Load rosters from localStorage, replace current roster with working copy,
 * save rosters back to localStorage. */
function saveTeam()
{
  var rosterNo = Number.parseInt(localStorage.getItem("bbRosterNo"));
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams[rosterNo] = activeTeam;
  JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
  changesSaved = true;
}

function importTeam()
{
  var JSONTeam = document.getElementById("importValue").value;
  /* Protection from script injection attacks. */
  JSONTeam.replace("<", "&lt;");
  JSONTeam.replace(">", "&gt;");
  var thisTeam = JSON.parse(JSONTeam);
  
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams.push(thisTeam);
  JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
  addLoadTeamButton(thisTeam, allTeams.length-1);
  document.getElementById("importValue").value = "";
}

/* Interrupts leaving roster.html or setup.html if changes to roster have not
 * been saved.*/
function closeWithoutSaving()
{
  if (changesSaved)
  {
    return null;
  }
  else
  {
    return "Leave without saving changes?";
  }
}
