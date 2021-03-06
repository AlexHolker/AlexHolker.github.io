/* SPP values necessary to level up a player. */
var SPPThresholds = [6,16,31,51,76,176];

/* Skill categories. */
var skillDefs = {
    "G":{"id":"G", "name":"General", "skills":["Block", "Dauntless", "Dirty Player", "Fend", "Frenzy", "Kick", "Kick-Off Return", "Pass Block", "Pro", "Shadowing", "Strip Ball", "Sure Hands", "Tackle", "Wrestle"]},
    "A":{"id":"A", "name":"Agility", "skills":["Catch", "Diving Catch", "Diving Tackle", "Dodge", "Jump Up", "Leap", "Side Step", "Sneaky Git", "Sprint", "Sure Feet"]},
    "S":{"id":"S", "name":"Strength", "skills":["Break Tackle", "Grab", "Guard", "Juggernaut", "Mighty Blow", "Multiple Block", "Piling On", "Stand Firm", "Strong Arm", "Thick Skull"]},
    "P":{"id":"P", "name":"Passing", "skills":["Accurate", "Dump-Off", "Hail Mary Pass", "Leader", "Nerves of Steel", "Pass", "Safe Throw"]},
    "M":{"id":"M", "name":"Mutation", "skills":["Big Hand", "Claw", "Disturbing Presence", "Extra Arms", "Foul Appearance", "Horns", "Prehensile Tail", "Tentacles", "Two Heads", "Very Long Legs"]}};

/* Injury names. */
var injuryDefs = ["Badly Hurt",
                  "Broken Ribs", "Groin Strain", "Gouged Eye", "Broken Jaw", "Fractured Arm", "Fractured Leg", "Smashed Hand", "Pinched Nerve",
                  "Damaged Back", "Smashed Knee", "Smashed Hip", "Smashed Ankle", "Serious Concussion", "Fractured Skull", "Broken Neck", "Smashed Collar Bone",
                  "Dead!"];
