let pokemonName = document.querySelector('.pokemon_name h2');
let pokemonTitle = document.querySelector('.pokemon_title h1');
let pokemonIcon = document.querySelector('.pokemon_icon');
let pokemonDisplay = document.querySelector('#pokemon-display');
let hp = document.querySelector('.hp h2');
let weight = document.querySelector('.details_small #weight');
let height = document.querySelector('.details_small #height');
let power1 = document.querySelector('.power_1 h3');
let power2 = document.querySelector('.power_2 h3');
let typePokemon = document.querySelector('.hp');

async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 898));
    const pokemon = await response.json();
    try {
        pokemonName.innerText += `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`
        pokemonTitle.innerText += `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`
        pokemonDisplay.innerHTML += `<img src="${pokemon.sprites.other.home.front_default}" >`;
        pokemonIcon.innerHTML += `<img src="${pokemon.sprites.other.home.front_default}" >`;
        hp.innerText += ` ${pokemon.stats[0].base_stat}`;
        weight.innerText = `${pokemon.weight / 10} kg`;  // weight default is in hectograms
        height.innerText = `${pokemon.height * 10} cm`; // height default is in decimetre
        power1.innerText = `${pokemon.abilities[0].ability.name.toUpperCase()}`;
        power2.innerText = `${pokemon.abilities[1].ability.name.toUpperCase()}`;
        let typesPokemon = `${pokemon.types[0].type.name}`;
        typePokemon.innerHTML += `<img src="img/${typesPokemon}.png" >`;
    } catch (error) {
        console.log(error);
    }

}
getPokemon();
