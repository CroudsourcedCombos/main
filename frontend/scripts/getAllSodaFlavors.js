// Script parses all of the soda names from the Coca Cola freestyle website

function getAllSodaFlavors() {
  // Each of the flavors are represented as a div inside of the choice
  // container class. We convert this to an array to use .map()
  const choices = Array.from(
    document.querySelector('.choice-container').querySelectorAll('div')
  )
    // We only get the value under data-title for each div, which is the sodaname
    .map(node => node.attributes['data-title'].nodeValue)
    // We then create an object with an id and hasTried field from this
    .map((choice, idx) => ({ id: idx, drink: choice, hasTried: false }))
  
    // Return this as an array
    return choices
}

// Log this to console, JSON stringify for easy copy pasting
console.log(JSON.stringify(getAllSodaFlavors(), null, 2))