const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("types");
const pokemonTable = document.getElementById("table")
const resultsContainer = document.getElementById("result-container")
const spriteContainer = document.getElementById("sprite-image")

let pokemonArr = [];
// filling empty pokemon Array with data from Pokemon API 
const pokemonDatabase = async () => {
  try{
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await response.json();
    pokemonSearchFn(data)
  } catch(err) { 
    console.log(err)
  }
} 

const pokemonSearchFn = data => {
  resetContainer();
  const {results} = data;
  let inputId = searchInput.value;
  let correctedId = (inputId.toLowerCase().replace(/\W/g, "").replace("[\s_]g", "-"));
  pokemonArr = results;
  pokemonArr.map((pkn) => {
    const {id, name, url} = pkn;
    if (id == correctedId || name === correctedId) {
      pokemonName.innerText = `${name.toUpperCase()}`
      pokemonId.innerText = `#${id}`
      return pokemonInformation(url)
    } else {
      alert ("Pokémon not found")
    }
  })
}
const pokemonInformation = async (url) => {
  try {
    const response = await fetch(`${url}`);
    const pokemonInfo = await response.json();
    const {weight, height, stats, types, sprites} = pokemonInfo
    pokemonWeight.innerText = `Weight: ${weight}`;
    pokemonHeight.innerText = `Height: ${height}`;
    types.map(({type}) => {
      const {name} = type;
      let typeDiv = document.createElement("div");
      typeDiv.id = `${name}`
      pokemonType.appendChild(typeDiv)
      typeDiv.textContent = `${name.toUpperCase()}`
    })
    const {front_default} = sprites;
    spriteContainer.innerHTML += `
    <img id="sprite" src="${front_default}">`
    let statsArr = [];
    stats.forEach((stat) => {
      const {base_stat} = stat;
      statsArr.push(base_stat);
    })
    resultsContainer.classList.remove("hidden")
    pokemonTable.innerHTML += `
      <thead>
          <td>Base</td>
          <td>Stats</td>
        </thead>
        <tr>
          <td>HP:</td>
          <td id="hp">${statsArr[0]}</td>
        </tr>
        <tr>
          <td>Attack:</td>
          <td id="attack">${statsArr[1]}</td>
        </tr>
        <tr>
          <td>Defense:</td>
          <td id="defense">${statsArr[2]}</td>
        </tr>
        <tr>
          <td>Special Attack:</td>
          <td id="special-attack">${statsArr[3]}</td>
        </tr>
        <tr>
          <td>Special Defense:</td>
          <td id="special-defense">${statsArr[4]}</td>
        </tr>
        <tr>
          <td>Speed:</td>
          <td id="speed">${statsArr[5]}</td>
        </tr>
    `
  } catch (err) {
    console.log(err)
  }
}


searchBtn.addEventListener("click", pokemonDatabase)
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    pokemonDatabase()
  }
})

const resetContainer = () => {
  pokemonName.innerText = ""
  pokemonId.innerText = ""
  spriteContainer.innerHTML = "";
  pokemonTable.innerHTML = "";
  pokemonType.innerHTML = "";
}