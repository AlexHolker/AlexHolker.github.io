/* Template for new player definitions:
    "":{"id":"", "race":"", "name":"", "max":16, "cost":0000,
        "MA":, "ST":, "AG":, "AV":, "skills":[""], "Normal":["G","A","S","P"], "Double":["G","A","S","P"], "Unavailable": ["M"]},
*/
var playerDefs = {
    "bretonnianLineman":{"id":"bretonnianLineman", "race":"bretonnian", "name":"Lineman", "max":16, "cost":40000,
        "MA":6, "ST":3, "AG":2, "AV":7, "skills":["Fend"], "Normal":["G"], "Double":["A","S","P"], "Unavailable": ["M"]},
    "bretonnianYeoman":{"id":"bretonnianYeoman", "race":"bretonnian", "name":"Yeoman", "max":4, "cost":70000,
        "MA":6, "ST":3, "AG":3, "AV":8, "skills":["Wrestle"], "Normal":["G","S"], "Double":["A","P"], "Unavailable": ["M"]},
    "bretonnianBlitzer":{"id":"bretonnianBlitzer", "race":"bretonnianKnight", "name":"Blitzer", "max":4, "cost":110000,
        "MA":7, "ST":3, "AG":3, "AV":8, "skills":["Block", "Catch", "Dauntless"], "Normal":["G","A","P"], "Double":["S"], "Unavailable": ["M"]},
    
    "dwarfBlocker":{"id":"dwarfBlocker", "race":"dwarf", "name":"Blocker", "max":16, "cost":70000,
        "MA":4, "ST":3, "AG":2, "AV":9, "skills":["Block", "Thick Skull", "Tackle"], "Normal":["G", "S"], "Double":["A","P"], "Unavailable": ["M"]},
    "dwarfRunner":{"id":"dwarfRunner", "race":"dwarf", "name":"Runner", "max":2, "cost":80000,
        "MA":6, "ST":3, "AG":3, "AV":8, "skills":["Sure Hands", "Thick Skull"], "Normal":["G", "P"], "Double":["A","S"], "Unavailable": ["M"]},
    "dwarfBlitzer":{"id":"dwarfBlitzer", "race":"dwarf", "name":"Blitzer", "max":2, "cost":80000,
        "MA":5, "ST":3, "AG":3, "AV":9, "skills":["Block", "Thick Skull"], "Normal":["G", "S"], "Double":["A","P"], "Unavailable": ["M"]},
    "dwarfTrollSlayer":{"id":"dwarfTrollSlayer", "race":"dwarf", "name":"Troll Slayer", "max":2, "cost":90000,
        "MA":5, "ST":3, "AG":2, "AV":8, "skills":["Block", "Dauntless", "Frenzy", "Thick Skull"], "Normal":["G", "S"], "Double":["A","P"], "Unavailable": ["M"]},
    "dwarfDeathroller":{"id":"dwarfDeathroller", "race":"dwarf", "name":"Deathroller", "max":1, "cost":160000,
        "MA":4, "ST":7, "AG":1, "AV":10, "skills":["Loner", "Break Tackle", "Dirty Player", "Juggernaut", "Mighty Blow", "No Hands", "Secret Weapon", "Stand Firm"], "Normal":["S"], "Double":["G", "A","P"], "Unavailable": ["M"]},
    
    "gnoblar":{"id":"gnoblar", "race":"orc", "name":"Gnoblar", "max":16, "cost":20000,
        "MA":5, "ST":1, "AG":3, "AV":5, "skills":["Dodge", "Right Stuff", "Side Step", "Stunty", "Titchy"], "Normal":["A"], "Double":["G","S","P"], "Unavailable": ["M"]},
    
    "goblin":{"id":"goblin", "race":"orc", "name":"Goblin", "max":4, "cost":40000,
        "MA":6, "ST":2, "AG":3, "AV":7, "skills":["Right Stuff", "Dodge", "Stunty"], "Normal":["A"], "Double":["G","S","P"], "Unavailable": ["M"]},
    
    "humanLineman":{"id":"humanLineman", "race":"empire", "name":"Lineman", "max":16, "cost":50000,
        "MA":6, "ST":3, "AG":3, "AV":8, "skills":[], "Normal":["G"], "Double":["A","S","P"], "Unavailable": ["M"]},
    "humanCatcher":{"id":"humanCatcher", "race":"empire", "name":"Catcher", "max":4, "cost":70000,
        "MA":8, "ST":2, "AG":3, "AV":7, "skills":["Catch", "Dodge"], "Normal":["G","A"], "Double":["S","P"], "Unavailable": ["M"]},
    "humanThrower":{"id":"humanThrower", "race":"empire", "name":"Thrower", "max":2, "cost":70000,
        "MA":6, "ST":3, "AG":3, "AV":8, "skills":["Sure Hands", "Pass"], "Normal":["G","P"], "Double":["A","S"], "Unavailable": ["M"]},
    "humanBlitzer":{"id":"humanBlitzer", "race":"empire", "name":"Blitzer", "max":4, "cost":90000,
        "MA":7, "ST":3, "AG":3, "AV":8, "skills":["Block"], "Normal":["G","S"], "Double":["A","P"], "Unavailable": ["M"]},
    
    "lizardmanSkink":{"id":"lizardmanSkink", "race":"lizardman", "name":"Skink", "max":16, "cost":60000,
        "MA":8, "ST":2, "AG":3, "AV":7, "skills":["Dodge", "Stunty"], "Normal":["A"], "Double":["G","S","P"], "Unavailable": ["M"]},
    "lizardmanSaurus":{"id":"lizardmanSaurus", "race":"lizardman", "name":"Saurus", "max":6, "cost":80000,
        "MA":6, "ST":4, "AG":1, "AV":9, "skills":[], "Normal":["G","S"], "Double":["A","P"], "Unavailable": ["M"]},
    "lizardmanKroxigor":{"id":"lizardmanKroxigor", "race":"lizardman", "name":"Kroxigor", "max":1, "cost":140000,
        "MA":6, "ST":5, "AG":1, "AV":9, "skills":["Loner", "Bone-head", "Mighty Blow", "Prehensile Tail", "Thick Skull"], "Normal":["S"], "Double":["G","A","P"], "Unavailable": ["M"]},
    
    "ogreLineman":{"id":"ogreLineman", "race":"ogre", "name":"Ogre", "max":6, "cost":140000,
        "MA":5, "ST":5, "AG":2, "AV":9, "skills":["Bone-head", "Mighty Blow", "Thick Skull", "Throw Team-Mate"], "Normal":["S"], "Double":["G","A","P"], "Unavailable": ["M"]},
    "ogreLoner":{"id":"ogreLoner", "race":"ogre", "name":"Ogre", "max":1, "cost":140000,
        "MA":5, "ST":5, "AG":2, "AV":9, "skills":["Loner", "Bone-head", "Mighty Blow", "Thick Skull", "Throw Team-Mate"], "Normal":["S"], "Double":["G","A","P"], "Unavailable": ["M"]},
    
    "orcLineman":{"id":"orcLineman", "race":"orc", "name":"Lineman", "max":16, "cost":50000,
        "MA":5, "ST":3, "AG":3, "AV":9, "skills":[], "Normal":["G"], "Double":["A","S","P"], "Unavailable": ["M"]},
    "orcThrower":{"id":"orcThrower", "race":"orc", "name":"Thrower", "max":2, "cost":70000,
        "MA":5, "ST":3, "AG":3, "AV":8, "skills":["Sure Hands", "Pass"], "Normal":["G","P"], "Double":["A","S"], "Unavailable": ["M"]},
    "orcBlocker":{"id":"orcBlocker", "race":"orc", "name":"Black Orc Blocker", "max":4, "cost":80000,
        "MA":4, "ST":4, "AG":2, "AV":9, "skills":[], "Normal":["G","S"], "Double":["A","P"], "Unavailable": ["M"]},
    "orcBlitzer":{"id":"orcBlitzer", "race":"orc", "name":"Blitzer", "max":4, "cost":80000,
        "MA":6, "ST":3, "AG":3, "AV":9, "skills":["Block"], "Normal":["G","S"], "Double":["A","P"], "Unavailable": ["M"]},
    
    "skavenLineman":{"id":"skavenLineman", "race":"skaven", "name":"Lineman", "max":16, "cost":50000,
        "MA":7, "ST":3, "AG":3, "AV":7, "skills":[], "Normal":["G"], "Double":["A","S","P","M"], "Unavailable": []},
    "skavenThrower":{"id":"skavenThrower", "race":"skaven", "name":"Thrower", "max":2, "cost":70000,
        "MA":7, "ST":3, "AG":3, "AV":7, "skills":["Pass", "Sure Hands"], "Normal":["G","P"], "Double":["A","S","M"], "Unavailable": []},
    "skavenGutterRunner":{"id":"skavenGutterRunner", "race":"skaven", "name":"Gutter Runner", "max":4, "cost":80000,
        "MA":9, "ST":2, "AG":4, "AV":7, "skills":["Dodge"], "Normal":["G","A"], "Double":["S","P","M"], "Unavailable": []},
    "skavenBlitzer":{"id":"skavenBlitzer", "race":"skaven", "name":"Blitzer", "max":2, "cost":90000,
        "MA":7, "ST":3, "AG":3, "AV":8, "skills":["Block"], "Normal":["G","S"], "Double":["A","P","M"], "Unavailable": []},
    "skavenRatOgre":{"id":"skavenRatOgre", "race":"skaven", "name":"Rat Ogre", "max":1, "cost":150000,
        "MA":6, "ST":5, "AG":2, "AV":8, "skills":["Loner", "Frenzy", "Mighty Blow", "Prehensile Tail", "Wild Animal"], "Normal":["S"], "Double":["G","A","P","M"], "Unavailable": []},
    
    "treemanLoner":{"id":"treemanLoner", "race":"elf", "name":"Treeman", "max":1, "cost":120000,
        "MA":2, "ST":6, "AG":1, "AV":10, "skills":["Loner", "Mighty Blow", "Stand Firm", "Strong Arm", "Take Root", "Thick Skull", "Throw Team-Mate"], "Normal":["S"], "Double":["G","A","P"], "Unavailable": ["M"]},
    
    "trollLoner":{"id":"trollLoner", "race":"orc", "name":"Troll", "max":1, "cost":110000,
        "MA":4, "ST":5, "AG":1, "AV":9, "skills":["Loner", "Always Hungry", "Mighty Blow", "Really Stupid", "Regeneration", "Throw Team-Mate"], "Normal":["S"], "Double":["A","S"], "Unavailable": ["M"]},
    
    "vampire":{"id":"vampire", "race":"vampire", "name":"Vampire", "max":6, "cost":110000,
        "MA":6, "ST":4, "AG":4, "AV":8, "skills":["Blood Lust", "Hypnotic Gaze", "Regeneration"], "Normal":["G","A","S"], "Double":["P"], "Unavailable": ["M"]},
    "vampireThrall":{"id":"vampireThrall", "race":"empire", "name":"Thrall", "max":16, "cost":40000,
        "MA":6, "ST":3, "AG":3, "AV":7, "skills":[], "Normal":["G"], "Double":["A","S","P"], "Unavailable": ["M"]},
    
    "woodElfLineman":{"id":"woodElfLineman", "race":"elf", "name":"Lineman", "max":16, "cost":70000,
        "MA":7, "ST":3, "AG":4, "AV":7, "skills":[], "Normal":["G","A"], "Double":["S","P"], "Unavailable": ["M"]},
    "woodElfCatcher":{"id":"woodElfCatcher", "race":"elf", "name":"Catcher", "max":4, "cost":90000,
        "MA":8, "ST":2, "AG":4, "AV":7, "skills":["Catch", "Dodge", "Sprint"], "Normal":["G","A"], "Double":["S","P"], "Unavailable": ["M"]},
    "woodElfThrower":{"id":"woodElfThrower", "race":"elf", "name":"Thrower", "max":2, "cost":90000,
        "MA":7, "ST":3, "AG":4, "AV":7, "skills":["Pass"], "Normal":["G","A","P"], "Double":["S"], "Unavailable": ["M"]},
    "woodElfWardancer":{"id":"woodElfWardancer", "race":"elf", "name":"Wardancer", "max":2, "cost":120000,
        "MA":8, "ST":3, "AG":4, "AV":7, "skills":["Block", "Dodge", "Leap"], "Normal":["G","A"], "Double":["S","P"], "Unavailable": ["M"]}};

var staffDefs = {
    "coach":{"staffId":"coach", "name":"Assistant Coach", "namePlural":"Assistant Coaches", "cost":10000, "max":99},
    "cheerleader":{"staffId":"cheerleader", "name":"Cheerleader", "namePlural":"Cheerleaders", "cost":10000, "max":99},
    "apothecary":{"staffId":"apothecary", "name":"Apothecary", "namePlural":"Apothecaries", "cost":50000, "max":1},
    "necromancer":{"staffId":"necromancer", "name":"Necromancer", "namePlural":"Necromancers", "cost":0, "max":1},
    "reroll50k":{"staffId":"reroll50k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":50000, "max":8},
    "reroll60k":{"staffId":"reroll60k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":60000, "max":8},
    "reroll70k":{"staffId":"reroll70k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":70000, "max":8}};

/* Template for new team definitions:
    "":{"id":"", "race":"", "defaultName":"", "defaultColour":"", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll50k],
        "players":[playerDefs.],
        "description":""},
 */
var teamDefs = {
    "empire":{"id":"empire", "race":"Empire", "defaultName":"Reikland Reavers", "defaultColour":"0000FF", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll50k],
        "players":[playerDefs.humanLineman, playerDefs.humanCatcher, playerDefs.humanThrower, playerDefs.humanBlitzer, playerDefs.ogreLoner],
        "description":"A Jack-of-all-Trades team capable of passing, running or bashing but excelling in none of these."},
    "orcs":{"id":"orcs", "race":"Orcs", "defaultName":"Orcland Raiders", "defaultColour":"FFFF00", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll60k],
        "players":[playerDefs.orcLineman, playerDefs.orcThrower, playerDefs.orcBlocker, playerDefs.orcBlitzer, playerDefs.goblin, playerDefs.trollLoner],
        "description":"A bash-heavy team that relies on running the ball up the pitch to score."},
    /*"woodElves":{"id":"woodElves", "race":"Wood Elves", "defaultName":"Athelorn Avengers", "defaultColour":"9ACD32", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll50k],
        "players":[playerDefs.woodElfLineman, playerDefs.woodElfCatcher, playerDefs.woodElfThrower, playerDefs.woodElfWardancer, playerDefs.treemanLoner],
        "description":"A squishy team that specialises in running and passing plays."}*/};
