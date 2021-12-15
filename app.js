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
let effectPower1 = document.querySelector('.description_power .effectpower1');
let card = document.querySelector('.card');

const cardColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

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
        const shortDescriptionPower1 = await fetch(pokemon.abilities[0].ability.url);
        const firstAbility = await shortDescriptionPower1.json();
        console.log(firstAbility.effect_entries[1].short_effect)
        effectPower1.innerText = `${firstAbility.effect_entries[1].short_effect}`;
        card.style.backgroundColor = cardColors[typesPokemon];
    } catch (error) {
        console.log(error);
    }

}
getPokemon();
