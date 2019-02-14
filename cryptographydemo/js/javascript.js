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
  var background = document.getElementById("background");
  background.style.setProperty("background-image", imageLocation);
  background.style.setProperty("background-size", "cover");
}

//
function setBlockchainDemo()
{
  document.getElementById("oldhash1").value = document.getElementById("newhash0").value;
  
  for (var i = 1; i < 7; i++)
  {
    updateBlock(i, false);
  }
}

// Generates a hash for the given block and inserts it into the table.
function updateBlock(generation, checkContinuity)
{
  var genString = generation.toString();
  var inputString = genString +
          document.getElementById("oldhash" + genString).value.toString() +
          document.getElementById("transactions" + genString).value;
  var outHash = hashCode(inputString);
  document.getElementById("newhash" + genString).value = outHash;
  
  var nextGenString = (generation + 1).toString();
  var nextGenBlock = document.getElementById("block" + nextGenString);
  if (checkContinuity)
  {
    console.log(outHash.toString() + ", " + document.getElementById("oldhash" + nextGenString).value.toString());
    if (outHash == document.getElementById("oldhash" + nextGenString).value)
    {
      nextGenBlock.style.setProperty("background-color", "lightgreen");
      console.log("Match!");
    }
    else
    {
      nextGenBlock.style.setProperty("background-color", "pink");
      console.log("No match!");
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