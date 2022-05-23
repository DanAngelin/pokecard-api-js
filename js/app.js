import { API_URL } from './config.js';

// Selecting Elements
const pokemonName = document.querySelector('.pokemon_name h2');
const pokemonTitle = document.querySelector('.pokemon_title h1');
const pokemonIcon = document.querySelector('.pokemon_icon img');
const hp = document.querySelector('.hp h2');
const weightPokemon = document.querySelector('.details_small #weight');
const heightPokemon = document.querySelector('.details_small #height');
const power1 = document.querySelector('.power_1 h3');
const power2 = document.querySelector('.power_2 h3');
const typePokemon = document.querySelector('.icon-type img');
const effectPower1 = document.querySelector('.description_power .effectpower1');
const effectPower2 = document.querySelector('.description_power .effectpower2');
const card = document.querySelector('.card');
const pokeCard = document.querySelector(".idPokemon");
const attackStats = document.querySelector('.attack p');
const defenseStats = document.querySelector('.defense p');
const inputSearch = document.querySelector('.search-pokemon input');
let pokemonRender = document.querySelector('#pokemon-display');

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


// Render Spinner until the fetch API is loaded or pokemon not found
const renderSpinner = function(parentEl) {
    const pokemonRender = `
        <div class="spinner">
            <img src="img/spinner.svg">
        <div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', pokemonRender);
};


const getPokemon = async querry => {
    try {
        renderSpinner(pokemonRender)
    const response = await fetch(`${API_URL}${querry}`);

    // Status api not found
    response.status == 404 ?
        document.querySelector('.error-found span').textContent = `Sorry, we don't found this Pokemon 😞 !`
        :
        document.querySelector('.error-found span').textContent = '';


    const pokemon = await response.json();

        const {name, id, sprites: {other: {home: {front_default}}}, stats:[{base_stat}, {base_stat: attack}, {base_stat: defense}], weight, height, 
        abilities: [{ability: {name: first, url: detailFirstAbility}}], 
        types: [{type: {name: typesPokemon}}],
        } = pokemon;
        pokemonName.textContent  = `${name[0].toUpperCase() + name.slice(1)}`;
        pokemonTitle.textContent  = `${name[0].toUpperCase() + name.slice(1)}`;
        pokeCard.textContent  = `${id}`;
        pokemonRender.innerHTML = `<img src="${front_default}" >`;
        pokemonIcon.src = `${front_default}`;
        typePokemon.src = `img/${typesPokemon}.png`;
        attackStats.textContent  = `${attack}`;
        defenseStats.textContent  = `${defense}`
        hp.textContent  = ` ${base_stat}`;
        weightPokemon.textContent  = `${weight / 10} kg`;  // weight default is in hectograms
        heightPokemon.textContent  = `${height * 10} cm`; // height default is in decimetre

        // First Ability + Short Description

        power1.textContent  = `${first.toUpperCase()}`;
        const fetchDetailFirstAbility = await fetch(detailFirstAbility);
        const firstAbility = await fetchDetailFirstAbility.json();
        const {effect_entries: [{short_effect: short_effectDe}, {language: {name: nameLang2},short_effect: short_effectEn}]} = firstAbility;
        effectPower1.textContent  = `${(short_effectEn && nameLang2 === "en") ? short_effectEn : short_effectDe}`;

        // Second Ability + Short Description

        if (pokemon.abilities[1]) {
            const {ability: {name: second, url: detailSecondAbility}} = pokemon.abilities[1];
            const fetchDetailSecondAbility = await fetch(detailSecondAbility);
            const secondAbility = await fetchDetailSecondAbility.json();
            const {effect_entries: [{short_effect: short_effectDe1}, {short_effect: short_effectEn2}]} = secondAbility;
            effectPower2.textContent  = `${short_effectEn2 ? short_effectEn2 : short_effectDe1}`;
            power2.textContent  = `${second.toUpperCase()}`;
            document.querySelector('.power_2').style.visibility = "visible";
        } else {
            effectPower2.textContent  = ``;
            document.querySelector('.power_2').style.visibility = "hidden";
            power2.textContent  = ``;
        }

        // Card Color depending types pokemon

        card.style.backgroundColor = cardColors[typesPokemon];
    } catch (error) {
        console.log(error);
    }

}

        // Input Btn Search Pokemon

const btnSearch = document.querySelector('.btnSearch');
const idPokeApi = () => {
const pokemonById = document.querySelector('.pokemonById');
const idPoke = pokemonById.value.toLowerCase();
return idPoke;
}

btnSearch.addEventListener('click', () => getPokemon(idPokeApi()));

inputSearch.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        btnSearch.click();
    }
})


// FOOTER YEAR

const getDate = new Date();
document.querySelector('.year').textContent  = `${getDate.getFullYear()}`;

// BACKGROUND VIDEO 
document.querySelector('.background-video').volume=0.2;

const btn = document.querySelector('.btn-mute');
const btnUnmute = document.querySelector('.btn-unmute');
const videoBackground = document.querySelector('.background-video');
videoBackground.muted = true;


// BUTTON MUTE UNMUTE AUDIO BACKGROUND
btn.addEventListener('click', (e) => {
    videoBackground.muted = false;
    btnUnmute.style.display = 'block'
    btn.style.display = 'none'
    btnUnmute.removeEventListener('click', e);
});

btnUnmute.addEventListener('click', (e) => {
    videoBackground.muted = true;
    btnUnmute.style.display = 'none'
    btn.style.display = 'block';
    btn.removeEventListener('click', e);
});
