const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main() {
    fetchTrainers()
    listenForAddPokemon()
}

// fetch json data & itterate over data to get each trainer
// call createTrainerCard function
function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    // .then(trainers => trainers.forEach(trainer => console.log(trainer)))
    .then(trainers => trainers.forEach(trainer => createTrainerCards(trainer)))
}

// create a new div card for each trainer
    // creating new elements
    // button Add Pokemon
    // list for each Pokemon & release button
    // append div, list, buttons

function createTrainerCards(trainer) {
    
    const main = document.querySelector('main')

    let div = document.createElement('div')
    div.className = "card"
    div.id = trainer.id 

    let p = document.createElement('p')
    p.innerText = trainer.name 

    let addButton = document.createElement('button')
    addButton.id = trainer.id
    addButton.innerText = 'Add Pokemon'

    let ul = document.createElement('ul')

    trainer.pokemons.forEach(pokemon =>{
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        let releaseButton = document.createElement('button')
        releaseButton.className = 'release'
        releaseButton.id = pokemon.id 
        releaseButton.innerText = 'Release'
        ul.append(li)
        li.append(releaseButton)
    })
    
    main.append(div)
    div.append(p, addButton, ul)

}



// "Add Pokemon" if they have space on their team
    // create function & add listener - X
    // add a method post - X
    // fetch the add pokemon - X
    // display - X
    // if event.target.nextSibling.length >= 6 do nothing
        // if false do this below
function listenForAddPokemon(){
    let main = document.querySelector('main')

    main.addEventListener('click', function(event) {

        if (event.target.id ===  event.target.parentNode.id) {
            // console.log(event.target)
            if (event.target.nextElementSibling.children.length < 6){
                renderNewPokemon(event)
            }
        } else if (event.target.id === event.target.id) {
            deletePokemon(event)
       }
 
    }) // closes eventListner
} // closes function


function renderNewPokemon(event){
        
        let newObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(event.target.id)
        } // closes newObj

        fetch(POKEMONS_URL, newObj)
        .then(resp => resp.json())
        .then(pokemon => {
            let li = document.createElement('li')
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
    
            let releaseButton = document.createElement('button')
            releaseButton.className = 'release'
            releaseButton.id = pokemon.id 
            releaseButton.innerText = 'Release'

            let ul = event.target.nextElementSibling
            ul.append(li)
            li.append(releaseButton)
        }) // closes display pokemon

}
    

//listen the event button release
//find the pokemon id
// remove the node (this updates FE)
// tell BE to destroy it

function deletePokemon(event){

  const pokemonId = event.target.id
    
    fetch(`${POKEMONS_URL}/${pokemonId}`, {method: 'DELETE'})
    .then(event.target.parentNode.remove()) 
    
}
    

main()
