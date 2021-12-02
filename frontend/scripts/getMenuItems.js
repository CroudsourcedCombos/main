// Script for scraping/parsing menu items for salads, pizzas, and sodas from the hill menu 

// Gets the menu items
function getMenuItems() {
  // Gets each ingredient - e.g. only cheeses, breads, etc.
  const choices = document.querySelectorAll('.form-section-block')
  
  // We go through each of the ingredient choices
  const res = []
  for (const choice of choices) {
    // We get the blocks of checkboxes from each choice
    const blocks = choice.querySelectorAll('ul')

    // Go through each block, and then save the strings to an array 
    for (const block of blocks) {
      res.push(
        block.innerText
          .trim()
          .split('\n')
          .map(e => `"${e.trim()}"`)
          .toString()
      )
    }
  }

  // Print out the information we scraped 
  return res.join('\n')
}

// Log out the data we received
console.log(getMenuItems())
