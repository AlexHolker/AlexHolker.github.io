var playerDefs = {
    "gnoblar":{"id":"gnoblar", "race":"orc", "name":"Gnoblar", "max":16, "cost":20000, "MA":5, "ST":1, "AG":3, "AV":5, "skills":["Dodge", "Right Stuff", "Side Step", "Stunty", "Titchy"], "Normal":["A"], "Double":["G","S","P"]},

    "goblin":{"id":"goblin", "race":"orc", "name":"Goblin", "max":4, "cost":40000, "MA":6, "ST":2, "AG":3, "AV":7, "skills":["Right Stuff", "Dodge", "Stunty"], "Normal":["A"], "Double":["G","S","P"]},

    "humanLineman":{"id":"humanLineman", "race":"empire", "name":"Lineman", "max":16, "cost":50000, "MA":6, "ST":3, "AG":3, "AV":8, "skills":[], "Normal":["G"], "Double":["A","S","P"]},
    "humanCatcher":{"id":"humanCatcher", "race":"empire", "name":"Catcher", "max":4, "cost":70000, "MA":8, "ST":2, "AG":3, "AV":7, "skills":["Catch", "Dodge"], "Normal":["G","A"], "Double":["S","P"]},
    "humanThrower":{"id":"humanThrower", "race":"empire", "name":"Thrower", "max":2, "cost":70000, "MA":6, "ST":3, "AG":3, "AV":8, "skills":["Sure Hands", "Pass"], "Normal":["G","P"], "Double":["A","S"]},
    "humanBlitzer":{"id":"humanBlitzer", "race":"empire", "name":"Blitzer", "max":4, "cost":90000, "MA":7, "ST":3, "AG":3, "AV":8, "skills":["Block"], "Normal":["G","S"], "Double":["A","P"]},

    "ogreLineman":{"id":"ogreLineman", "race":"ogre", "name":"Ogre", "max":6, "cost":140000, "MA":5, "ST":5, "AG":2, "AV":9, "skills":["Bone-head", "Mighty Blow", "Thick Skull", "Throw Team-Mate"], "Normal":["S"], "Double":["G","A","P"]},
    "ogreLoner":{"id":"ogreLoner", "race":"ogre", "name":"Ogre", "max":1, "cost":140000, "MA":5, "ST":5, "AG":2, "AV":9, "skills":["Loner", "Bone-head", "Mighty Blow", "Thick Skull", "Throw Team-Mate"], "Normal":["S"], "Double":["G","A","P"]},

    "orcLineman":{"id":"orcLineman", "race":"orc", "name":"Lineman", "max":16, "cost":50000, "MA":5, "ST":3, "AG":3, "AV":9, "skills":[], "Normal":["G"], "Double":["A","S","P"]},
    "orcThrower":{"id":"orcThrower", "race":"orc", "name":"Thrower", "max":2, "cost":70000, "MA":5, "ST":3, "AG":3, "AV":8, "skills":["Sure Hands", "Pass"], "Normal":["G","P"], "Double":["A","S"]},
    "orcBlocker":{"id":"orcBlocker", "race":"orc", "name":"Black Orc Blocker", "max":4, "cost":80000, "MA":4, "ST":4, "AG":2, "AV":9, "skills":[], "Normal":["G","S"], "Double":["A","P"]},
    "orcBlitzer":{"id":"orcBlitzer", "race":"orc", "name":"Blitzer", "max":4, "cost":80000, "MA":6, "ST":3, "AG":3, "AV":9, "skills":["Block"], "Normal":["G","S"], "Double":["A","P"]},

    "trollLoner":{"id":"trollLoner", "race":"orc", "name":"Troll", "max":1, "cost":110000, "MA":4, "ST":5, "AG":1, "AV":9, "skills":["Loner", "Always Hungry", "Mighty Blow", "Really Stupid", "Regeneration", "Throw Team-Mate"], "Normal":["S"], "Double":["A","S"]}};

var staffDefs = {
    "coach":{"staffId":"coach", "name":"Assistant Coach", "namePlural":"Assistant Coaches", "cost":10000, "max":99},
    "cheerleader":{"staffId":"cheerleader", "name":"Cheerleader", "namePlural":"Cheerleaders", "cost":10000, "max":99},
    "apothecary":{"staffId":"apothecary", "name":"Apothecary", "namePlural":"Apothecaries", "cost":50000, "max":1},
    "necromancer":{"staffId":"necromancer", "name":"Necromancer", "namePlural":"Necromancers", "cost":0, "max":1},
    "reroll50k":{"staffId":"reroll50k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":50000, "max":8},
    "reroll60k":{"staffId":"reroll60k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":60000, "max":8},
    "reroll70k":{"staffId":"reroll70k", "name":"Team Re-roll", "namePlural":"Team Re-rolls", "cost":70000, "max":8}};

var teamDefs = {
    "empire":{"id":"empire", "race":"Empire", "defaultName":"Reikland Reavers", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll50k],
        "players":[playerDefs.humanLineman, playerDefs.humanCatcher, playerDefs.humanThrower, playerDefs.humanBlitzer, playerDefs.ogreLoner],
        "description":"A Jack-of-all-Trades team capable of passing, running or bashing but excelling in none of these."},
    "orcs":{"id":"orcs", "race":"Orcs", "defaultName":"Orcland Raiders", "staff":[staffDefs.coach, staffDefs.cheerleader, staffDefs.apothecary, staffDefs.reroll60k],
        "players":[playerDefs.orcLineman, playerDefs.orcThrower, playerDefs.orcBlocker, playerDefs.orcBlitzer, playerDefs.goblin, playerDefs.trollLoner],
        "description":"A bash-heavy team that relies on running the ball up the pitch to score."}};