var raceId;
var activeTeam = {};

function initialiseRoster()
{
  raceId = localStorage.getItem("bbRaceId");
  if (raceId === null)
  {
    window.location.href = "index.html";
  }
  else
  {
    if (localStorage.getItem("bbTeamRoster") == null)
    {
      createNewTeam(raceId);
    }
    else
    {
      var JSONActiveTeam = localStorage.getItem("bbTeamRoster");
      activeTeam = JSON.parse(JSONActiveTeam);
      
      for (var player in activeTeam.players)
      {
        addPlayerToRoster(playerDefs[activeTeam.players[player].playerTypeId], activeTeam.players[player]);
      }
    }
    
    document.getElementById("rosterTitleName").value = activeTeam.name;
    document.getElementById("rosterTitleRace").innerHTML = " - " + teamDefs[raceId].race;
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
    populateStaff();
    populateAddPlayerButtons();
  }
}

function createNewTeam(raceId)
{
  activeTeam.raceId = raceId;
  activeTeam.name = teamDefs[raceId].defaultName;
  activeTeam.gold = 1000000;
  activeTeam.staff = {};
  activeTeam.players = [];
  activeTeam.lastJerseyNumber = 0;
  
  for (var staffType in teamDefs[raceId].staff)
  {
    activeTeam.staff[teamDefs[raceId].staff[staffType].staffId] = 0;
  }
  
  console.log(activeTeam);
}

function updateTeamName(teamName)
{
  activeTeam.name = teamName;
}

function populateStaff()
{
  var staffContainer = document.getElementById("staffContainer");
  
  for (var staffIterator in teamDefs[raceId].staff)
  {
    addStaffDisplay(staffContainer, staffIterator);
  }
}

function addStaffDisplay(staffContainer, staffIterator)
{
  var staffType = teamDefs[raceId].staff[staffIterator];
  
  var staffRow = document.createElement("tr");
  staffContainer.appendChild(staffRow);
  var staffPosition = document.createElement("td");
  staffPosition.innerHTML = staffType.name;
  staffContainer.appendChild(staffPosition);
  
  var staffQuantity = document.createElement("td");
  staffQuantity.innerHTML = activeTeam.staff[staffType.staffId];
  staffContainer.appendChild(staffQuantity);
  
  var staffButton = document.createElement("td");
  var staffUndo = document.createElement("td");
  
  staffContainer.appendChild(staffButton);
  var addStaffButton = document.createElement("button");
  addStaffButton.onclick = function() {hireStaff(staffUndo, staffQuantity, staffType);};
  addStaffButton.innerHTML = "Hire " + staffType.name;
  staffButton.appendChild(addStaffButton);
  staffContainer.appendChild(staffUndo);
}

function hireStaff(staffUndo, staffQuantity, staffType)
{
  var addPlayerError = document.getElementById("addPlayerError");
  
  console.log(staffType);
  
  if (activeTeam.gold < staffType.cost)
  {
    addPlayerError.innerHTML = "Not enough gold to in treasury to hire a " + staffType.name + ".";
  }
  else if (staffType.max <= activeTeam.staff[staffType.staffId])
  {
    addPlayerError.innerHTML = "Cannot have " + (staffType.max+1) + " " + staffType.namePlural;
  }
  else
  {
    var staffUndoButton = document.getElementById(staffType.staffId + "UndoButton");
    if (staffUndoButton === null)
    {
      var resetQtyTo = activeTeam.staff[staffType.staffId];
      staffUndoButton = document.createElement("button");
      staffUndoButton.onclick = function()
      {
        undoHireStaff(resetQtyTo, staffType);
        staffUndo.removeChild(staffUndoButton);
        document.getElementById("rosterGold").innerHTML = activeTeam.gold;
        staffQuantity.innerHTML = activeTeam.staff[staffType.staffId];
      };
      staffUndoButton.id = staffType.staffId + "UndoButton";
      staffUndoButton.innerHTML = "Undo";
      staffUndo.appendChild(staffUndoButton);
    }
    
    activeTeam.gold -= staffType.cost;
    activeTeam.staff[staffType.staffId]++;
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
    staffQuantity.innerHTML = activeTeam.staff[staffType.staffId];
    addPlayerError.innerHTML = "";
  }
}

function undoHireStaff(resetQtyTo, staffType)
{
  var staffToRemove = activeTeam.staff[staffType.staffId] - resetQtyTo;
  if (0 < staffToRemove)
  {
    activeTeam.gold += staffType.cost * staffToRemove;
    activeTeam.staff[staffType.staffId] = resetQtyTo;
  }
}

function populateAddPlayerButtons()
{
  var addPlayerContainer = document.getElementById("addPlayerContainer");
  
  for (var playerType in teamDefs[raceId].players)
  {
    addPlayerButton(addPlayerContainer, playerType);
  }
}

function addPlayerButton(addPlayerContainer, playerType)
{
  var addPlayerButton = document.createElement("button");
  addPlayerButton.onclick = function() {addIfNotFull(teamDefs[raceId].players[playerType]);};
  addPlayerButton.innerHTML = "Recruit " + teamDefs[raceId].players[playerType].name;
  
  addPlayerContainer.appendChild(addPlayerButton);
}

function addIfNotFull(playerType)
{
  var positionTally = 0;
  for (var player in activeTeam.players)
  {
    if (activeTeam.players[player].playerTypeId == playerType.id)
    {
      positionTally++;
    }
  }
  
  var addPlayerError = document.getElementById("addPlayerError");
  
  if (activeTeam.gold < playerType.cost)
  {
    addPlayerError.innerHTML = "Not enough gold in treasury to hire that player.";
  }
  else if (16 <= activeTeam.players.length)
  {
    addPlayerError.innerHTML = "Cannot have 17 players on the team roster.";
  }
  else if (playerType.max <= positionTally)
  {
    addPlayerError.innerHTML = "Cannot have " + (playerType.max + 1) + " players in the " + playerType.name + " position.";
  }
  else
  {
    addPlayerToRoster(playerType, null);
    activeTeam.gold -= playerType.cost;
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
    addPlayerError.innerHTML = "";
  }
}

function addPlayerToRoster(playerType, playerData)
{
  var thisPlayer;
  
  if (playerData == null)
  {
    activeTeam.lastJerseyNumber++;
    thisPlayer = {"jerseyNumber":activeTeam.lastJerseyNumber, "playerName":getPlayerName(playerType.race), "playerTypeId":playerType.id};
    activeTeam.players.push(thisPlayer);
  }
  else
  {
    thisPlayer = playerData;
  }
  
  var roster = document.getElementById("roster");
  var rosterRow = document.createElement("tr");
  roster.appendChild(rosterRow);
  var cells = [];
  for (var i = 0; i < 10; i++)
  {
    cells.push(document.createElement("td"));
    rosterRow.appendChild(cells[i]);
  }
  
  cells[0].innerHTML = thisPlayer.jerseyNumber;
  
  var playerNameBox = document.createElement("input");
  playerNameBox.type = "text";
  playerNameBox.value = thisPlayer.playerName;
  playerNameBox.oninput = function() {thisPlayer.playerName = playerNameBox.value;};
  cells[1].appendChild(playerNameBox);
  
  cells[2].innerHTML = playerType.name;
  cells[3].innerHTML = playerType.cost;
  cells[4].innerHTML = playerType.MA;
  cells[5].innerHTML = playerType.ST;
  cells[6].innerHTML = playerType.AG;
  cells[7].innerHTML = playerType.AV;
  cells[8].innerHTML = skillsToString(thisPlayer);
  
  var removePlayerButton = document.createElement("button");
  removePlayerButton.onclick = function() {removePlayerFromRoster(thisPlayer, rosterRow);};
  removePlayerButton.innerHTML = "Fire";
  cells[9].appendChild(removePlayerButton);
}

function getPlayerName(race)
{
  var name = "";
  var names = nameDefs[race];
  for (var i = 0; i < names.length; i++)
  {
    var randIndex = Math.floor(Math.random() * names[i].length);
    name += names[i][randIndex];
  }
  return name;
}

function skillsToString(playerData)
{
  var baseSkills = playerDefs[playerData.playerTypeId].skills;
  var skillsString = "";
  
  if (0 < baseSkills.length)
  {
    skillsString = baseSkills[0];
    
    for (var i = 1; i < baseSkills.length; i++)
    {
      skillsString += ", " + baseSkills[i];
    }
  }
  
  return skillsString;
}

function removePlayerFromRoster(player, rosterRow)
{
  activeTeam.players.splice(activeTeam.players.indexOf(player), 1);
  document.getElementById("roster").removeChild(rosterRow);
}