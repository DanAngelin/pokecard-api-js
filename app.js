let pokemonName = document.querySelector('.pokemon_name h2');
let pokemonTitle = document.querySelector('.pokemon_title h1');
let pokemonIcon = document.querySelector('.pokemon_icon');
let pokemonDisplay = document.querySelector('#pokemon-display');
let hp = document.querySelector('.hp h2');
let weightPokemon = document.querySelector('.details_small #weight');
let heightPokemon = document.querySelector('.details_small #height');
let power1 = document.querySelector('.power_1 h3');
let power2 = document.querySelector('.power_2 h3');
let typePokemon = document.querySelector('.icon-type');
let effectPower1 = document.querySelector('.description_power .effectpower1');
let effectPower2 = document.querySelector('.description_power .effectpower2');
let card = document.querySelector('.card');
let pokeCard = document.querySelector('.pokemon_card p');

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

const getPokemon = async querry => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${querry}`);
    if (response.status === 404) {
        return alert('asdew');
    }
    const pokemon = await response.json();
    let {name, id, sprites: {other: {home: {front_default}}}, stats:[{base_stat}], weight, height, 
        abilities: [{ability: {name: first, url: detailFirstAbility}}, {ability: {name: second, url: detailSecondAbility}}], 
        types: [{type: {name: typesPokemon}}],
        } = pokemon;
    try {
        pokemonName.innerText = `${name[0].toUpperCase() + name.slice(1)}`;
        pokemonTitle.innerText = `${name[0].toUpperCase() + name.slice(1)}`;
        pokeCard.innerText = `Pokemon Card #${id}`;
        pokemonDisplay.innerHTML = `<img src="${front_default}" >`;
        pokemonIcon.innerHTML = `<img src="${front_default}" >`;
        typePokemon.innerHTML = `<img src="img/${typesPokemon}.png" >`;
        hp.innerText = ` ${base_stat}`;
        weightPokemon.innerText = `${weight / 10} kg`;  // weight default is in hectograms
        heightPokemon.innerText = `${height * 10} cm`; // height default is in decimetre
        power1.innerText = `${first.toUpperCase()}`;
        power2.innerText = `${second.toUpperCase()}`;
        const fetchDetailFirstAbility = await fetch(detailFirstAbility);
        const firstAbility = await fetchDetailFirstAbility.json();
        let {effect_entries: [{language: {name: nameLang}, short_effect: short_effectDe}, {language: {name: nameLang2},short_effect: short_effectEn}]} = firstAbility;
        effectPower1.innerText = `${(short_effectEn && nameLang2 === "en") ? short_effectEn : short_effectDe}`;
        const fetchDetailSecondAbility = await fetch(detailSecondAbility);
        const secondAbility = await fetchDetailSecondAbility.json();
        let {effect_entries: [{short_effect: short_effectDe1}, {short_effect: short_effectEn2}]} = secondAbility;
        effectPower2.innerText = `${short_effectEn2 ? short_effectEn2 : short_effectDe1}`;
        card.style.backgroundColor = cardColors[typesPokemon];
    } catch (error) {
        console.log('error');
    }

}


const btnSearch = document.querySelector('.btnSearch');
const idPokeApi = () => {
let pokemonById = document.querySelector('.pokemonById');
let idPoke = pokemonById.value.toLowerCase();
return idPoke;
}


btnSearch.addEventListener('click', () => getPokemon(idPokeApi()));