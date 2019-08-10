var raceId;
var activeTeam = {};
var playerPortraitContent;

function initialiseRoster()
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
    
    if (rosterNo === allTeams.length)
    {
      raceId = localStorage.getItem("bbRaceId");
      if (raceId === null)
      {
        window.location.href = "index.html";
      }
      createNewTeam();
    }
    else
    {
      activeTeam = allTeams[rosterNo];
      raceId = activeTeam.raceId;
    }
    
    for (var player in activeTeam.players)
    {
      addPlayerToRoster(playerDefs[activeTeam.players[player].playerTypeId], activeTeam.players[player]);
    }
    
    document.getElementById("pageTitle").innerHTML = activeTeam.name + " - Blood Bowl Online Roster";
    document.getElementById("rosterTitleName").value = activeTeam.name;
    document.getElementById("rosterTitleRace").innerHTML = " - " + teamDefs[raceId].race;
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
    document.getElementById("fanFactor").innerHTML = activeTeam.fanFactor;
    
    /* Fix for timing issues regarding creating of jscolor element. */
    window.addEventListener("load", function()
    {
      var picker = document.getElementById("colourPicker").jscolor;
      picker.fromString(activeTeam.colour);
      
      playerPortraitContent = document.getElementById("playerPortrait").contentDocument;
      playerPortraitContent.getElementById("teamColourFilterValues").setAttribute("values", "0 0 0 0 " + (picker.rgb[0]/255) + " 0 0 0 0 " + (picker.rgb[1]/255) + " 0 0 0 0 " + (picker.rgb[2]/255) + " 0 0 0 1 0");
    });
    
    populateStaff();
    populateAddPlayerButtons();
    initialiseSkillSelection();
    initialiseInjurySelection();
    setTeamValue();
    displayPortrait();
  }
}

/* Calculates and displays the value of all staff and all players who aren't
 * currently out of action.*/
function setTeamValue()
{
  var teamValue = activeTeam.fanFactor * 10000;
  
  for (var i in teamDefs[activeTeam.raceId].staff)
  {
    var staffType = teamDefs[activeTeam.raceId].staff[i];
    teamValue += staffType.cost * activeTeam.staff[staffType.staffId];
  }
  
  for (var i in activeTeam.players)
  {
    if (activeTeam.players[i].isAvailable)
    {
      teamValue += getPlayerCost(playerDefs[activeTeam.players[i].playerTypeId], activeTeam.players[i]);
    }
  }
  
  activeTeam.teamValue = teamValue;
  document.getElementById("teamValue").innerHTML = teamValue;
  return teamValue;
}

function createNewTeam()
{
  activeTeam.raceId = raceId;
  activeTeam.name = teamDefs[raceId].defaultName;
  activeTeam.colour = teamDefs[raceId].defaultColour;
  activeTeam.gold = 1000000;
  activeTeam.staff = {};
  activeTeam.players = [];
  activeTeam.lastJerseyNumber = 0;
  activeTeam.fanFactor = 0;
  activeTeam.teamValue = 0;
  
  for (var staffType in teamDefs[raceId].staff)
  {
    activeTeam.staff[teamDefs[raceId].staff[staffType].staffId] = 0;
  }
  
  console.log(activeTeam);
}

function updateTeamName(teamName)
{
  activeTeam.name = teamName;
  document.getElementById("pageTitle").innerHTML = activeTeam.name + " - Blood Bowl Online Roster";
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
  staffRow.appendChild(staffPosition);
  
  var staffQuantity = document.createElement("td");
  staffQuantity.innerHTML = activeTeam.staff[staffType.staffId];
  staffRow.appendChild(staffQuantity);
  
  var staffButton = document.createElement("td");
  var staffUndo = document.createElement("td");
  
  staffRow.appendChild(staffButton);
  var addStaffButton = document.createElement("button");
  addStaffButton.onclick = function() {hireStaff(staffUndo, staffQuantity, staffType);};
  addStaffButton.innerHTML = "Hire " + staffType.name;
  staffButton.appendChild(addStaffButton);
  staffRow.appendChild(staffUndo);
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
    setTeamValue();
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
    setTeamValue();
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
  addPlayerButton.id = playerType.id + "Button";
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
  var roster = document.getElementById("roster");
  var rosterRow = document.createElement("tr");
  roster.appendChild(rosterRow);
  var cells = [];
  for (var i = 0; i < 11; i++)
  {
    cells.push(document.createElement("td"));
    rosterRow.appendChild(cells[i]);
  }
  
  var thisPlayer;
  
  if (playerData === null)
  {
    activeTeam.lastJerseyNumber++;
    thisPlayer = {"jerseyNumber":activeTeam.lastJerseyNumber, "playerName":getPlayerName(playerType.race), "starPlayerPoints":0, "statIncreases":[0,0,0,0], "skills":[], "skillsDouble":[], "injuries":[], "playerTypeId":playerType.id, "isAvailable":true, "position":["reserves", "reserves"]};
    activeTeam.players.push(thisPlayer);
    setTeamValue();
    
    var playerUndoCell = document.createElement("td");
    rosterRow.appendChild(playerUndoCell);
    var playerUndoButton = document.createElement("button");
    playerUndoButton.onclick = function() {playerUndo(thisPlayer, rosterRow);};
    playerUndoButton.innerHTML = "Undo";
    playerUndoCell.appendChild(playerUndoButton);
  }
  else
  {
    thisPlayer = playerData;
  }
  cells[0].innerHTML = thisPlayer.jerseyNumber;
  
  var playerNameBox = document.createElement("input");
  playerNameBox.type = "text";
  playerNameBox.value = thisPlayer.playerName;
  playerNameBox.oninput = function() {thisPlayer.playerName = playerNameBox.value;};
  cells[1].appendChild(playerNameBox);
  
  cells[2].innerHTML = playerType.name;
  displayPlayerCost(playerType, thisPlayer, cells[3]);
  
  var skillsContainer = document.createElement("span");
  cells[8].appendChild(skillsContainer);
  var injuriesContainer = document.createElement("span");
  injuriesContainer.classList.add("injuries");
  cells[8].appendChild(injuriesContainer);
  
  displayStats(thisPlayer, rosterRow, cells, injuriesContainer);
  displaySkills(thisPlayer, skillsContainer);
  
  cells[9].innerHTML = SPPToString(thisPlayer.starPlayerPoints);
  
  var selectSPPButton = document.createElement("button");
  selectSPPButton.onclick = function() {selectSPP(thisPlayer, rosterRow, cells);};
  selectSPPButton.innerHTML = "Add SPP";
  cells[10].appendChild(selectSPPButton);
  
  var selectInjuryButton = document.createElement("button");
  selectInjuryButton.onclick = function() {selectInjury(thisPlayer, rosterRow, cells, injuriesContainer);};
  selectInjuryButton.innerHTML = "Add injury";
  cells[10].appendChild(selectInjuryButton);
  
  var removePlayerButton = document.createElement("button");
  removePlayerButton.onclick = function() {removePlayerFromRoster(thisPlayer, rosterRow);};
  removePlayerButton.innerHTML = "Fire";
  cells[10].appendChild(removePlayerButton);
  addRemoveInjuriesButton(thisPlayer, rosterRow, cells[11], injuriesContainer);
  addLevelUpButton(thisPlayer, rosterRow, cells);
}

function selectSPP(thisPlayer, rosterRow, cells)
{
  var SPPPopup = document.getElementById("SPPPopup");
  SPPPopup.classList.remove("hidden");
  
  document.getElementById("addSPPButton").onclick = function() {addSPP(thisPlayer, rosterRow, cells);};
}

function addSPP(thisPlayer, rosterRow, cells)
{
  document.getElementById("SPPPopup").classList.add("hidden");
  var addSPPValue = parseInt(document.getElementById("addSPPValue").value);
  if ((!isNaN(addSPPValue)) && (0 < addSPPValue))
  {
    thisPlayer.starPlayerPoints += addSPPValue;
    cells[9].innerHTML = SPPToString(thisPlayer.starPlayerPoints);
    
    addLevelUpButton(thisPlayer, rosterRow, cells);
  }
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

function getPlayerCost(playerType, thisPlayer)
{
  var salary = playerType.cost
          + 20000 * thisPlayer.skills.length
          + 30000 * thisPlayer.skillsDouble.length
          + 30000 * thisPlayer.statIncreases[0]
          + 50000 * thisPlayer.statIncreases[1]
          + 40000 * thisPlayer.statIncreases[2]
          + 30000 * thisPlayer.statIncreases[3];
  return salary;
}

function displayPlayerCost(playerType, thisPlayer, output)
{
  var salary = getPlayerCost(playerType, thisPlayer);
  output.innerHTML = salary;
}

function displayStats(thisPlayer, rosterRow, cells, injuriesContainer)
{
  var injuryPenalties = displayInjuries(thisPlayer, rosterRow, injuriesContainer);
  var playerType = playerDefs[thisPlayer.playerTypeId];
  cells[4].innerHTML = getStat(playerType.MA, thisPlayer.statIncreases[0], injuryPenalties[0]);
  cells[5].innerHTML = getStat(playerType.ST, thisPlayer.statIncreases[1], injuryPenalties[1]);
  cells[6].innerHTML = getStat(playerType.AG, thisPlayer.statIncreases[2], injuryPenalties[2]);
  cells[7].innerHTML = getStat(playerType.AV, thisPlayer.statIncreases[3], injuryPenalties[3]);
}

function getStat(baseStat, statIncrease, injuryPenalty)
{
  if (injuryPenalty < -2)
  {
    injuryPenalty = -2;
  }
  
  var modifiedStat = baseStat + statIncrease + injuryPenalty;
  
  if(modifiedStat < 1)
  {
    return 1;
  }
  else
  {
    return modifiedStat;
  }
}

function displaySkills(thisPlayer, output)
{
  var baseSkills = playerDefs[thisPlayer.playerTypeId].skills;
  var skillsString = "";
  
  var firstSkill = true;
  
  for (var i = 0; i < baseSkills.length; i++)
  {
    if (firstSkill)
    {
      firstSkill = false;
    }
    else
    {
      skillsString += ", ";
    }
    skillsString += baseSkills[i];
  }
  
  for (var i = 0; i < thisPlayer.skills.length; i++)
  {
    if (firstSkill)
    {
      firstSkill = false;
    }
    else
    {
      skillsString += ", ";
    }
    skillsString += thisPlayer.skills[i];
  }
  
  for (var i = 0; i < thisPlayer.skillsDouble.length; i++)
  {
    if (firstSkill)
    {
      firstSkill = false;
    }
    else
    {
      skillsString += ", ";
    }
    skillsString += thisPlayer.skillsDouble[i];
  }
  
  if (!firstSkill && 0 < thisPlayer.injuries.length)
  {
    skillsString += ", ";
  }
  
  output.innerHTML = skillsString;
}

function displayInjuries(thisPlayer, rosterRow, injuriesContainer)
{
  var playerAvailable = true;
  var injuriesString = "";
  var injuryPenalties = [0,0,0,0];
  for (var i = 0; i < thisPlayer.injuries.length; i++)
  {
    switch (thisPlayer.injuries[i])
    {
      case "Broken Ribs":
      case "Groin Strain":
      case "Gouged Eye":
      case "Broken Jaw":
      case "Fractured Arm":
      case "Fractured Leg":
      case "Smashed Hand":
      case "Pinched Nerve":
        playerAvailable = false;
        break;
      case "Damaged Back":
      case "Smashed Knee":
        break;
      case "Smashed Hip":
      case "Smashed Ankle":
        injuryPenalties[0] -= 1;
        break;
      case "SeriousConcussion":
      case "Fractured Skull":
        injuryPenalties[3] -= 1;
      case "Broken Neck":
        injuryPenalties[2] -= 1;
        break;
      case "Smashed Collar Bone":
        injuryPenalties[1] -= 1;
        break;
      case "Dead!":
        playerAvailable = false;
    }
    
    thisPlayer.isAvailable = playerAvailable;
    if (playerAvailable)
    {
      rosterRow.classList.remove("missNextGame");
    }
    else
    {
      rosterRow.classList.add("missNextGame");
    }
    
    if (i !== 0)
    {
      injuriesString += ", ";
    }
    injuriesString += thisPlayer.injuries[i];
  }
  injuriesContainer.innerHTML = injuriesString;
  
  return injuryPenalties;
}

function SPPToString(points)
{
  SPPString = points.toString();
  
  var level = getLevel(points);
  
  SPPString += "/" + SPPThresholds[level].toString();
  
  return SPPString;
}

function getLevel(points)
{
  var i = 0;
  while ((i < SPPThresholds.length) && (SPPThresholds[i] <= points))
  {
    i++;
  }
  
  return i;
}

function getAssignedLevels(thisPlayer)
{
  var count = thisPlayer.statIncreases[0] + thisPlayer.statIncreases[1]
      + thisPlayer.statIncreases[2] + thisPlayer.statIncreases[3]
      + thisPlayer.skills.length + thisPlayer.skillsDouble.length;
  
  return count;
}

function initialiseSkillSelection()
{
  var skillsUnavailableContainer = document.getElementById("skillsUnavailableContainer");
  
  for (var category in skillDefs)
  {
    var categoryContainer = document.createElement("div");
    categoryContainer.id = skillDefs[category].id+"skills";
    skillsUnavailableContainer.appendChild(categoryContainer);
    
    var categoryTitle = document.createElement("h4");
    categoryTitle.innerHTML = skillDefs[category].name;
    categoryContainer.appendChild(categoryTitle);
    
    for (var skill in skillDefs[category].skills)
    {
      var skillName = skillDefs[category].skills[skill];
      var radioButton = document.createElement("input");
      radioButton.id = "skillsForm" + skillName.replace(/\s+/g, '');
      radioButton.type = "radio";
      radioButton.name = "skillRadio";
      radioButton.value = skillName;
      categoryContainer.appendChild(radioButton);
      
      var radioLabel = document.createElement("label");
      radioLabel.setAttribute("for", "skillsForm" + skillName.replace(/\s+/g, ''));
      radioLabel.innerHTML = skillName;
      categoryContainer.appendChild(radioLabel);
    }
  }
}

function initialiseInjurySelection()
{
  var injuriesContainer = document.getElementById("injuriesContainer");
  
  for (var injuryNo in injuryDefs)
  {
    var injuryName = injuryDefs[injuryNo];
    var radioButton = document.createElement("input");
    radioButton.id = "injuriesForm" + injuryName.replace(/\s+/g, '');
    radioButton.type = "radio";
    radioButton.name = "injuryRadio";
    radioButton.value = injuryName;
    injuriesContainer.appendChild(radioButton);
    
    var radioLabel = document.createElement("label");
    radioLabel.setAttribute("for", "injuriesForm" + injuryName.replace(/\s+/g, ''));
    radioLabel.innerHTML = injuryName;
    injuriesContainer.appendChild(radioLabel);
  }
}

function playerUndo(thisPlayer, rosterRow)
{
  activeTeam.gold += playerDefs[thisPlayer.playerTypeId].cost;
  if (thisPlayer.jerseyNumber === activeTeam.lastJerseyNumber)
  {
    activeTeam.lastJerseyNumber--;
  }
  document.getElementById("rosterGold").innerHTML = activeTeam.gold;
  removePlayerFromRoster(thisPlayer, rosterRow);
}

function removePlayerFromRoster(thisPlayer, rosterRow)
{
  /* Removes player without leaving a gap in the array.*/
  activeTeam.players.splice(activeTeam.players.indexOf(thisPlayer), 1);
  setTeamValue();
  document.getElementById("roster").removeChild(rosterRow);
}

function addLevelUpButton(playerData, rosterRow, cells)
{
  if (getAssignedLevels(playerData) < getLevel(playerData.starPlayerPoints))
  {
    var levelUpButton = document.createElement("button");
    levelUpButton.onclick = function() {selectSkill(playerData, rosterRow, cells, levelUpButton);};
    levelUpButton.innerHTML = "Level Up!";
    cells[10].appendChild(levelUpButton);
  }
}

function addRemoveInjuriesButton(playerData, rosterRow, outputCell, injuriesContainer)
{
  if (!playerData.isAvailable && !playerData.injuries.includes("Dead!"))
  {
    var removeInjuriesButton = document.createElement("button");
    removeInjuriesButton.onclick = function() {removeInjuries(playerData, rosterRow, injuriesContainer, outputCell, removeInjuriesButton)};
    removeInjuriesButton.innerHTML = "Miss game";
    outputCell.appendChild(removeInjuriesButton);
  }
}

function selectSkill(playerData, rosterRow, cells, levelUpButton)
{
  var playerType = playerDefs[playerData.playerTypeId];
  
  document.getElementById("improvementRollDisplay").innerHTML = improvementRollToString();
  
  var skillsPopup = document.getElementById("skillsPopup");
  skillsPopup.classList.remove("hidden");
  var skillsContainer = document.getElementById("skillsContainer");
  var skillsDoublesContainer = document.getElementById("skillsDoublesContainer");
  var skillsUnavailableContainer = document.getElementById("skillsUnavailableContainer");
  
  for (var category in playerType.Normal)
  {
    var skillsNode = document.getElementById(playerType.Normal[category]+"skills");
    skillsContainer.appendChild(skillsNode);
  }
  for (var category in playerType.Double)
  {
    var skillsNode = document.getElementById(playerType.Double[category]+"skills");
    skillsDoublesContainer.appendChild(skillsNode);
  }
  for (var category in playerType.Unavailable)
  {
    var skillsNode = document.getElementById(playerType.Unavailable[category]+"skills");
    skillsUnavailableContainer.appendChild(skillsNode);
  }
  
  var skillSelectButton = document.getElementById("skillSelect");
  skillSelectButton.onclick = function() {addSkill(playerData, rosterRow, cells, levelUpButton, skillsPopup);};
}

function improvementRollToString()
{
  var rollOne = Math.floor(Math.random() * 6) + 1;
  var rollTwo = Math.floor(Math.random() * 6) + 1;
  var improvementRoll = "(" + rollOne + "," + rollTwo + "): Select ";
  
  var skillsMAContainer = document.getElementById("skillsMAContainer");
  var skillsSTContainer = document.getElementById("skillsSTContainer");
  var skillsAGContainer = document.getElementById("skillsAGContainer");
  var skillsAVContainer = document.getElementById("skillsAVContainer");
  var skillsDoublesContainer = document.getElementById("skillsDoublesContainer");
  
  switch (rollOne + rollTwo)
  {
    case 10:
      improvementRoll += "+1 Move OR +1 Armour OR a new skill";
      skillsMAContainer.classList.remove("invalidImprovement");
      skillsSTContainer.classList.add("invalidImprovement");
      skillsAGContainer.classList.add("invalidImprovement");
      skillsAVContainer.classList.remove("invalidImprovement");
      break;
    case 11:
      improvementRoll += "+1 Agility OR a new skill";
      skillsMAContainer.classList.add("invalidImprovement");
      skillsSTContainer.classList.add("invalidImprovement");
      skillsAGContainer.classList.remove("invalidImprovement");
      skillsAVContainer.classList.add("invalidImprovement");
      break;
    case 12:
      improvementRoll += "+1 Strength OR a new skill";
      skillsMAContainer.classList.add("invalidImprovement");
      skillsSTContainer.classList.remove("invalidImprovement");
      skillsAGContainer.classList.add("invalidImprovement");
      skillsAVContainer.classList.add("invalidImprovement");
      break;
    default:
      improvementRoll += "a new skill";
      skillsMAContainer.classList.add("invalidImprovement");
      skillsSTContainer.classList.add("invalidImprovement");
      skillsAGContainer.classList.add("invalidImprovement");
      skillsAVContainer.classList.add("invalidImprovement");
  }
  if (rollOne === rollTwo)
  {
    improvementRoll += " OR a new Doubles skill";
    skillsDoublesContainer.classList.remove("invalidImprovement");
  }
  else
  {
    skillsDoublesContainer.classList.add("invalidImprovement");
  }
  
  return improvementRoll;
}

function addSkill(playerData, rosterRow, cells, levelUpButton, skillsPopup)
{
  var skillName = document.querySelector('input[name="skillRadio"]:checked').value;
  var skillSelectError = document.getElementById("skillSelectError");
  var playerType = playerDefs[playerData.playerTypeId];
  
  if (playerType.skills.includes(skillName) || playerData.skills.includes(skillName) || playerData.skillsDouble.includes(skillName))
  {
    // Skill has already been chosen, must choose a new skill.
    skillSelectError.innerHTML = "Player already has that skill, please choose another.";
  }
  else
  {
    cells[10].removeChild(levelUpButton);
    skillsPopup.classList.add("hidden");
    skillSelectError.innerHTML = "";
    var skillNumber = parseInt(skillName);
    if (!isNaN(skillNumber))
    {
      playerData.statIncreases[skillNumber]++;
      displayStats(playerData, rosterRow, cells);
    }
    else 
    {
      var isNormalSkill = false;
    
      for (var category in playerType.Normal)
      {
        if (skillDefs[playerType.Normal[category]].skills.includes(skillName))
        {
          isNormalSkill = true;
        }
      }
      
      if (isNormalSkill)
      {
        playerData.skills.push(skillName);
        playerData.skills.sort();
      }
      else
      {
        playerData.skillsDouble.push(skillName);
        playerData.skillsDouble.sort();
      }
      
      displaySkills(playerData, cells[8]);
    }
    
    displayPlayerCost(playerType, playerData, cells[3]);
    setTeamValue();
  }
}

function selectInjury(playerData, rosterRow, cells, injuriesContainer)
{
  console.log(injuriesContainer);
  document.getElementById("injuryRollDisplay").innerHTML = injuryRollToString();
  
  var injuriesPopup = document.getElementById("injuriesPopup");
  injuriesPopup.classList.remove("hidden");
  
  var injurySelectButton = document.getElementById("injurySelect");
  injurySelectButton.onclick = function() {addInjury(playerData, rosterRow, cells, injuriesContainer);};
}

function injuryRollToString()
{
  var rollOne = Math.floor(Math.random() * 6) + 1;
  var rollTwo = Math.floor(Math.random() * 8) + 1;
  var injuryRoll = "(" + rollOne + rollTwo + "): ";
  
  switch (rollOne)
  {
    case 1:
    case 2:
    case 3:
      injuryRoll += "Badly Hurt";
      break;
    case 4:
      injuryRoll += injuryDefs[rollTwo];
      break;
    case 5:
      injuryRoll += injuryDefs[rollTwo + 8];
      break;
    case 6:
      injuryRoll += "Dead!";
      break;
  }
  
  return injuryRoll;
}

function addInjury(playerData, rosterRow, cells, injuriesContainer)
{
  var injuryName = document.querySelector('input[name="injuryRadio"]:checked').value;
  
  if (injuryName !== injuryDefs[0])
  {
    playerData.injuries.push(injuryName);
    playerData.injuries.sort();
  }
  
  document.getElementById("injuriesPopup").classList.add("hidden");
  
  displayStats(playerData, rosterRow, cells, injuriesContainer);
}

function removeInjuries(playerData, rosterRow, injuriesContainer, outputCell, removeInjuriesButton)
{
  for (var injuryNo in playerData.injuries)
  {
    switch (playerData.injuries[injuryNo])
    {
      case (injuryDefs[1]):
      case (injuryDefs[2]):
      case (injuryDefs[3]):
      case (injuryDefs[4]):
      case (injuryDefs[5]):
      case (injuryDefs[6]):
      case (injuryDefs[7]):
      case (injuryDefs[8]):
        playerData.injuries.splice(injuryNo, 1);
    }
  }
  outputCell.removeChild(removeInjuriesButton);
  displayInjuries(playerData, rosterRow, injuriesContainer);
  setTeamValue();
}

function storeColour(picker)
{
  activeTeam.colour = picker.toHEXString();
  playerPortraitContent.getElementById("teamColourFilterValues").setAttribute("values", "0 0 0 0 " + (picker.rgb[0]/255) + " 0 0 0 0 " + (picker.rgb[1]/255) + " 0 0 0 0 " + (picker.rgb[2]/255) + " 0 0 0 1 0");
}

/* Saves the current roster then sends browser to formation popup page. */
function goToSetup()
{
  saveTeam();
  window.location.href = "setup.html";
}

/* Display popup for treasury updates. */
function selectUpdateTreasury()
{
  var treasuryPopup = document.getElementById("treasuryPopup");
  treasuryPopup.classList.remove("hidden");
}

/* Called when updateTreasury button pressed. Performs input validation then
 *  updates treasury if valid. */
function updateTreasury()
{
  var updateTreasuryValue = parseInt(document.getElementById("updateTreasuryValue").value);
  var updateTreasuryError = document.getElementById("updateTreasuryError");
  
  if (activeTeam.gold + updateTreasuryValue < 0)
  {
    updateTreasuryError.innerHTML = "Treasury cannot go into debt.";
  }
  else
  {
    activeTeam.gold += updateTreasuryValue;
    document.getElementById("treasuryPopup").classList.add("hidden");
    updateTreasuryError.innerHTML = "";
    
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
  }
}

/* Display popup for Fan Factor updates. */
function selectUpdateFanFactor()
{
  var fanFactorPopup = document.getElementById("fanFactorPopup");
  fanFactorPopup.classList.remove("hidden");
  
}

/* Called when buyFanFactor button pressed. Performs input validation and
 *  updates treasury, Fan Factor and Team Value if valid. */
function buyFanFactor()
{
  var updateFanFactorValue = parseInt(document.getElementById("updateFanFactorValue").value);
  var updateFanFactorError = document.getElementById("updateFanFactorError");
  
  if (updateFanFactorValue < 0)
  {
    updateFanFactorError.innerHTML = "Cannot sell Fan Factor.";
  }
  else if (activeTeam.gold < updateFanFactorValue * 10000)
  {
    updateFanFactorError.innerHTML = "Cannot afford to purchase Fan Factor.";
  }
  else
  {
    activeTeam.fanFactor += updateFanFactorValue;
    activeTeam.gold -= updateFanFactorValue * 10000;
    
    document.getElementById("fanFactorPopup").classList.add("hidden");
    updateFanFactorError.innerHTML = "";
    
    document.getElementById("fanFactor").innerHTML = activeTeam.fanFactor;
    document.getElementById("rosterGold").innerHTML = activeTeam.gold;
    setTeamValue();
  }
}

/* Called when updateFanFactor button pressed. Performs input validation and
 *  updates Fan Factor and Team Value if valid. */
function updateFanFactor()
{
  var updateFanFactorValue = parseInt(document.getElementById("updateFanFactorValue").value);
  var updateFanFactorError = document.getElementById("updateFanFactorError");
  
  if (updateFanFactorValue + activeTeam.fanFactor < 0)
  {
    updateFanFactorError.innerHTML = "Fan Factor cannot be less than 0";
  }
  else
  {
    activeTeam.fanFactor += updateFanFactorValue;
    
    document.getElementById("fanFactorPopup").classList.add("hidden");
    updateFanFactorError.innerHTML = "";
    
    document.getElementById("fanFactor").innerHTML = activeTeam.fanFactor;
    setTeamValue();
  }
}

/* Create HTML for SVG object with backup for nonsupported browsers. */
function displayPortrait()
{
  var playerPortraitContainer = document.getElementById("playerPortraitContainer");
  var playerPortrait = document.createElement("object");
  playerPortrait.id = "playerPortrait";
  playerPortrait.type = "image/svg+xml";
  playerPortrait.data = "img/portraits/" + teamDefs[raceId].players[0].portrait;
  playerPortrait.height = "240";
  playerPortraitContainer.appendChild(playerPortrait);
  
  var playerPortraitWorkaround = document.createElement("param");
  playerPortraitWorkaround.id = "playerPortraitWorkaround";
  playerPortraitWorkaround.name = "src";
  playerPortraitWorkaround.value = "img/portraits/" + teamDefs[raceId].players[0].portrait;
  playerPortrait.appendChild(playerPortraitWorkaround);
}

function exportRoster()
{
  var exportText = JSON.stringify(activeTeam);
  document.getElementById("exportValue").innerHTML = exportText;
  document.getElementById("exportPopup").classList.remove("hidden");
}

function exportToClipboard()
{
  var exportValue = document.getElementById("exportValue");
  exportValue.select();
  document.execCommand("copy");
  document.getElementById("exportPopup").classList.add("hidden");
}

function closeExport()
{
  document.getElementById("exportPopup").classList.add("hidden");
}