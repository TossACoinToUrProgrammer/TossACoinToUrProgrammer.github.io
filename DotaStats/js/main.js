import { redirectPageWithParams } from "./workWithUrl.js";
import { getHeroesStatsFromApi, getHeroes, getHeroIconUrl } from "./queriesToApi/heroesApi.js";
import { getItems } from "./queriesToApi/itemsApi.js";

window.onload=()=>{
    getHeroesStatsFromApi();
    getHeroes();
    getItems();
}

document.querySelector('.search__btn').onclick=()=>{
    let id = document.querySelector('.playerSearchInput');
    
    redirectPageWithParams('players.html', 'player', id.value)
}