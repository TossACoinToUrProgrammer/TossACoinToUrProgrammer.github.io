import { getItem, getItemModalHtml } from "./queriesToApi/itemsApi.js";
import { getHeroByName, getHeroesStats, getHeroMatchups, getHero as getHeroFromApi, getHeroIconUrl, getItemBuilds, getHeroPlayers } from "./queriesToApi/heroesApi.js";
import { getAllUrlParams, redirectPageWithParams } from "./workWithUrl.js";
import { getPlayersAvatar } from "./queriesToApi/playersApi.js";

window.onload = () => {
    //Получаем id игрока из url при прогрузке страницы
    const urlParam = getAllUrlParams().hero;
    if (urlParam) getHero(urlParam);
  };

const addMatchupsToPage=async(hero,heroes)=>{
    let content = document.querySelector('.hero__matchups-list');
    let contentCopy = content.innerHTML;
    content.innerHTML='<img class="preloader" src="../img/preloader.gif">';
    let matchups = await getHeroMatchups(hero.id);
    console.log('matchups');
    matchups=matchups.slice(0,20);
    content.innerHTML=contentCopy;
    document.querySelectorAll('.matchups__item-total').forEach((item, index)=>{
        item.textContent=matchups[index].games_played;
    })
    document.querySelectorAll('.matchups__item-win').forEach((item, index)=>{
        item.textContent=(matchups[index].wins/(matchups[index].games_played/100)).toFixed(2)+'%';
    })
    document.querySelectorAll('.matchups__item-name').forEach((item, index)=>{
        let hero = getHeroFromApi(heroes,matchups[index].hero_id);
        item.textContent=hero.localized_name;
    })
    document.querySelectorAll('.matchups__item-img').forEach((item,index)=>{
        let hero = getHeroFromApi(heroes,matchups[index].hero_id);
        item.src=getHeroIconUrl(hero.name);
        item.onclick=()=>redirectPageWithParams('hero.html','hero',hero.id)
    });
}
const addPlayersToPage=async(hero)=>{
    let content = document.querySelector('.hero__players-list');
    let contentCopy = content.innerHTML;
    content.innerHTML='<img class="preloader" src="/img/preloader.gif">';
    let players = await getHeroPlayers(hero.id);
    players=players.slice(0,4);
    content.innerHTML=contentCopy;
    console.log("players");
    players.forEach(async(item)=>{
        document.querySelector('.hero__players-list')
        .insertAdjacentHTML('beforeend', `<li class='hero__players-item'><img src='${await getPlayersAvatar(item.account_id)}'></li>`);
        document.querySelectorAll('.hero__players-item')[document.querySelectorAll('.hero__players-item').length-1].onclick=()=>redirectPageWithParams('players.html','player',item.account_id);
    });
}
const addItemsToPage=async(hero)=>{
    let items=await getItemBuilds(hero.id);
    console.log('items');
    let startGameItemContainer=document.querySelector('.start-game');
    startGameItemContainer.innerHTML='';
    for(let key in items['start_game_items']){
        let item= getItem(parseInt(key));   
        startGameItemContainer.insertAdjacentHTML('beforeend', `<div class='item'><img src="https://api.opendota.com${item.img}">${getItemModalHtml(item)}</div>`);
    }
    let earlyGameItemContainer=document.querySelector('.early-game');
    earlyGameItemContainer.innerHTML='';
    for(let key in items['early_game_items']){
        let item= getItem(parseInt(key));
        earlyGameItemContainer.insertAdjacentHTML('beforeend', `<div class='item'><img src="https://api.opendota.com${item.img}">${getItemModalHtml(item)}</div>`);
    }
    let midGameItemContainer=document.querySelector('.mid-game');
    midGameItemContainer.innerHTML='';
    for(let key in items['mid_game_items']){
        let item= getItem(parseInt(key));
        midGameItemContainer.insertAdjacentHTML('beforeend', `<div class='item'><img src="https://api.opendota.com${item.img}">${getItemModalHtml(item)}</div>`);
    }
    let lateGameItemContainer=document.querySelector('.late-game');
    lateGameItemContainer.innerHTML='';
    for(let key in items['late_game_items']){
        let item= getItem(parseInt(key));
        lateGameItemContainer.insertAdjacentHTML('beforeend', `<div class='item'><img src="https://api.opendota.com${item.img}">${getItemModalHtml(item)}</div>`);
    }
}
const fillHeroStatsSectionWithData=(hero, img, items)=>{
    document.querySelector('.hero__img img').src=img;
    document.querySelector('.hero__name').innerText=hero.localized_name;
    let roles = hero.roles.map(item=>`<li class='hero__role'>${item}</li>`).join('>');
    document.querySelector('.hero__roles').innerHTML=roles;
    document.querySelectorAll('.hero__popularity-total').forEach((item, index)=>{
        item.textContent=hero[index+1+'_pick'];
    });
    document.querySelectorAll('.hero__popularity-win').forEach((item, index)=>{
        item.textContent=(hero[index+1+'_win']/(hero[index+1+'_pick']/100)).toFixed(2)+'%';
    });
    
    addPlayersToPage(hero);
    addMatchupsToPage(hero,heroes);
    addItemsToPage(hero);
}

let heroes = getHeroesStats();

const getHero=async(id)=>{
  let content = document.querySelector('.content');
  let contentCopy = content.innerHTML;
  content.innerHTML='<img class="preloader" src="/img/preloader.gif">';
  let hero = getHeroFromApi(heroes, id);
  console.log('hero');
  content.innerHTML=contentCopy;
  fillHeroStatsSectionWithData(hero, getHeroIconUrl(hero.name));
}
