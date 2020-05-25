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
let heroes = getHeroes();
heroes.forEach(item=>{
    if(item.primary_attr=='int'){
    let url=getHeroIconUrl(item.name);
    console.log(url);}
})
