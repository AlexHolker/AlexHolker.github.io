// Called to show/hide pop-up windows for navigation or further explanation.
function toggleVisibility(elementId)
{
  var hiddenElement = document.getElementById(elementId);
  hiddenElement.classList.toggle("hidden");
}

// Called on Home page to set background to specified image.
function setBackground(imageName)
{
  var imageLocation = "url('img/" + imageName + ".jpg')";
  var background = document.getElementById("indexbackground");
  background.style.setProperty("background-image", imageLocation);
  background.style.setProperty("background-size", "cover");
}

// Initialises hashes in blockchain demo.
function setBlockchainDemo()
{
  document.getElementById("oldhash1").value = document.getElementById("newhash0").value;
  
  for (var i = 1; i < 7; i++)
  {
    updateBlock(i, false);
  }
}

// Generates a hash for the given block and inserts it into the table.
// If checkContinuity is true, hashes will be compared between blocks.
// If checkContinuity is false, hashes will be copied between blocks.
function updateBlock(generation, checkContinuity)
{
  var prevGenString = (generation - 1).toString();
  var genString = generation.toString();
  var nextGenString = (generation + 1).toString();
  
  var inputString = genString +
          document.getElementById("oldhash" + genString).value.toString() +
          document.getElementById("transactions" + genString).value;
  var outHash = hashCode(inputString);
  document.getElementById("newhash" + genString).value = outHash;
  
  var genBlock = document.getElementById("block" + genString);
  var nextGenBlock = document.getElementById("block" + nextGenString);
  
  if (checkContinuity)
  {
    var prevHash = document.getElementById("newhash" + prevGenString).value;
    
    if (prevHash == document.getElementById("oldhash" + genString).value)
    {
      genBlock.style.setProperty("background-color", "lightgreen");
    }
    else
    {
      genBlock.style.setProperty("background-color", "pink");
    }
    
    if (outHash == document.getElementById("oldhash" + nextGenString).value)
    {
      nextGenBlock.style.setProperty("background-color", "lightgreen");
    }
    else
    {
      nextGenBlock.style.setProperty("background-color", "pink");
    }
  }
  else
  {
    document.getElementById("oldhash" + nextGenString).value = outHash;
    nextGenBlock.style.setProperty("background-color", "lightgreen");
  }
}

// Converts a string to a unique integer. Represents a more complex hashing function for demo.
// Function taken from https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript
function hashCode(inputString)
{
  var hash = 0;
  for (var i = 0; i < inputString.length; i++)
  {
    var character = inputString.charCodeAt(i);
    hash = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Allows direct link to finite fields section
function openSubWindow()
{
  if(window.location.hash)
  {
    toggleVisibility("whyItWorks");
  }
}

// Handler for first round of exponentiation.
function calculateDH1(actor)
{
  var publicNum = diffieHellman("publicG", actor+"Exponent");
  document.getElementById(actor+"Public").value = publicNum;
  document.getElementById(actor+"TriggeredButton").classList.remove("hidden");
}

// Handler for second round of exponentiation.
function calculateDH2(actor, otherActor)
{
  var sharedSecretNum = diffieHellman(otherActor+"Public", actor+"Exponent");
  document.getElementById(actor+"SharedSecret").value = sharedSecretNum;
}

// Takes input ids, performs exponentiation, returns result.
function diffieHellman(baseSource, exponentSource)
{
  var base = document.getElementById(baseSource).value;
  var exponent = document.getElementById(exponentSource).value;
  var modulus = document.getElementById("publicP").value;
  
  return modularExponentiate(base, exponent, modulus);
}

// Modular exponentiation function for Diffie-Hellman key exchange
function modularExponentiate(base, exponent, modulus)
{
  return Math.pow(base, exponent) % modulus;
}

// Uses input to control clocks for finite field demo.
function finiteFieldDemo()
{
  var rawInput = document.getElementById("finiteFieldInput").value;
  var rotation1 = ((rawInput%12)*5);
  var rotation2 = (rawInput*5);
  
  var clockHand1 = document.getElementById("clockHand1");
  var clockHand2 = document.getElementById("clockHand2");
  
  clockHand1.style.setProperty("transform", "rotate("+(rotation1*30)+"deg)");
  clockHand2.style.setProperty("transform", "rotate("+(rotation2*30)+"deg)");
}