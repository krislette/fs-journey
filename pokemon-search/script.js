const pokemonApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("search-button");
const pokemonNameSpan = document.getElementById("pokemon-name");
const pokemonIdSpan = document.getElementById("pokemon-id");
const pokemonWeightSpan = document.getElementById("weight");
const pokemonHeightSpan = document.getElementById("height");
const pokemonImageDiv = document.getElementById("pokemon-image");
const pokemonTypesDiv = document.getElementById("types");
const statElements = document.querySelectorAll(".stats");

// Made a helper function to capitalize pokemon types
const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

async function fetchAllPokemons() {
    try {
        const res = await fetch(pokemonApi);
        const data = await res.json();
        return data.results; // Fetch results excluding count
    } catch (err) {
        console.log(err);
    }
}

async function fetchPokemonData(pokemonUrl) {
    try {
        const res = await fetch(pokemonUrl);
        const data = await res.json();
        return data; // Return an object with all info abt a pokemon
    } catch (err) {
        console.log(err);
    }
}

function searchPokemon(input, pokemons) {
    // Searches for a pokemon by ID/Name and returns undef if not found
    return isNaN(input) 
        ? pokemons.find((pokemon) => pokemon.name === input.toLowerCase()) 
        : pokemons.find((pokemon) => pokemon.id === parseInt(input));
}

function displayPokemon(pokemon) {
    // Set all info for the pokemon's profile
    pokemonNameSpan.innerHTML = `<strong>${pokemon.name.toUpperCase()}</strong>`;
    pokemonIdSpan.innerHTML = `<strong>#${pokemon.id}</strong>`;
    pokemonWeightSpan.textContent = `Weight: ${pokemon.weight}`;
    pokemonHeightSpan.textContent = `Height: ${pokemon.height}`;
    pokemonImageDiv.innerHTML = `<img id="sprite" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;

    // Clear previous types
    pokemonTypesDiv.innerHTML = "";
    // Create buttons for each type a pokemon has
    pokemon.types.forEach(({ slot, type }) => {
        pokemonTypesDiv.innerHTML += `
            <button id="${pokemon.name}-${slot}" class="poke-type ${type.name}" disabled>${capitalize(type.name)}</button>
        `;
    });

    // Update stats
    statElements.forEach(span => {
        const statName = span.id;
        const stat = pokemon.stats.find((stat) => stat.stat.name === statName);
        if (stat) span.textContent = stat.base_stat;
    });
}

async function main() {
    // Fetch the array of pokemons excluding count from API
    const allPokemons = await fetchAllPokemons();
    const pokemon = searchPokemon(searchInput.value.trim(), allPokemons);
    searchInput.focus();

    if (!pokemon) {
        alert("Pokémon not found");
        return;
    }

    // Display the pokemon if found on the array
    displayPokemon(await fetchPokemonData(pokemon.url));
}

// Sets a listener for when the button is clicked
btnSearch.addEventListener("click", main);

// Sets a listener for diff keydowns
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        main();
    }

    if (event.key === "Escape") {
        searchInput.blur();
    }
});
