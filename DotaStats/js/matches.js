import { getMatchFromApi } from "./queriesToApi/matchesApi.js";
import {getHeroIconUrl, getHero, getHeroes } from "./queriesToApi/heroesApi.js";
import { getPlayerFromApi } from "./queriesToApi/playersApi.js";
import { getAllUrlParams, redirectPageWithParams } from "./workWithUrl.js";
import { getItems as getItemsFromApi, getItem, getItemModalHtml } from "./queriesToApi/itemsApi.js";


window.onload = () => {//Получаем id матча из url при прогрузке страницы
  const urlParam=getAllUrlParams().match;
  if(urlParam)getMatch(urlParam); 
};
getItemsFromApi();

const getItemsListHtml=(player)=>{
  //Возвращает список предметов в виде html
  const getItemHtml=(item)=>{
    return `<li class="item__item">${item ? `<img src="https://api.opendota.com${item.img}">${getItemModalHtml(item)}` : ''}</li>`;
  }
  let items=[getItem(player.item_0), getItem(player.item_1), getItem(player.item_2), getItem(player.item_3), getItem(player.item_4), getItem(player.item_5)];

  return `<ul class="item__items-list">
          ${items.map(item=>getItemHtml(item)).join('')/**Получаем предметы */}
          <div>
            ${getItemHtml(getItem(player.backpack_0))/**карманный предмет */}
            ${getItemHtml(getItem(player.backpack_1))/**карманный предмет */}
            ${getItemHtml(getItem(player.backpack_2))/**карманный предмет */}
          </div>
          ${getItemHtml(getItem(player.item_neutral))/**Нейтральный предмет */}
        </ul>`
};
const getPlayerListHtml=(players)=>{
  let heroes = getHeroes(); //получаем список героев из сервера
  return players.map((player, index) => {
    //получаем html список с данными каждого из 10 игроков

    getPlayerFromApi(player.account_id).then((response) => {
      //получаем по запросу игрока и вставляем его данные в html страницу
      let items = document.querySelectorAll(".item__account");
      if (response.error || response.profile.personaname==null)
        items[index+1].insertAdjacentText("afterbegin", "Anonym");
      else{
        items[index+1].insertAdjacentText(
          "afterbegin",
          response.profile.personaname
        );}
    });

    let hero = getHero(heroes, player.hero_id); //получаем нужного героя из localstorage
    let ul = document.createElement('ul');
    ul.onclick=()=>{
      redirectPageWithParams('players.html', 'player', player.account_id);
    }
    ul.innerHTML= `<ul class="list ${player.isRadiant ? 'team-radiant' : 'team-dire'}">
        <li class="item__account"></li>
        <li class="item__hero-icon"><img src=${getHeroIconUrl(hero.name)}></li>
        <li class="item__hero">${hero.localized_name}</li>
        <li class="item__lvl">${player.level}</li>
        <li class="item__kills">${player.kills}</li>
        <li class="item__deaths">${player.deaths}</li>
        <li class="item__assists">${player.assists}</li>
        <li class="item__lastHitsDen">${player.last_hits}/${player.denies}</li>
        <li class="item__dmg">${player.hero_damage}</li>
        <li class="item__heal">${player.hero_healing}</li>
        <li class="item__totalGold">${player.total_gold}</li>
        <li class="item__towerDmg">${player.tower_damage}</li>
        ${getItemsListHtml(player)}
     </ul>`;
     return ul;
  });
}
const getChatBlock=(chat)=>{
  return chat.map(item=>{
    if(item.type!=='chat')return null;
    return `<li>${item.time>0 ? Math.floor(item.time/60) +':'+('0' + (item.time%60)).slice(-2) : 'Before '+(Math.ceil(item.time/60)*(-1)) + ':'+('0' + (item.time%60)*(-1)).slice(-2) } <span class='slot${item.slot}'>${item.unit}</span>: ${item.key}</li>`
  }).join('')
}
const setDataToPage = (match, err = "") => {
  //Отрисовка контента
  let div = document.querySelector(".matches__result");
  div.innerHTML = "";
  if (err) {   //вставляем текст ошибки, если таковая имеется
    div.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="error-title"> ${err}</h1>`
    );
    return 0;
  }
  div.innerHTML = `
  <h4 class="match__id">Match id: ${match.match_id}</h4>
  <div class='match__result-header'>
    <h1 class="match__victory ${match.radiant_win ? "radiant" : "dire"}">${match.radiant_win ? "Radiant Victory" : "Dire Victory"}</h1>
    <div class='match__result-scores'>
       <h3>${match.radiant_score} </h3>
      <h2 class="match__duration"> ${( Math.floor(match.duration / 60))}:${('0' + (match.duration % 60)).slice(-2)}</h2>
       <h3>${match.dire_score}  </h3>
    </div>
  </div>
  <div class='matches__list-container'>
    <ul class="matches__list">
      <ul class="list">
          <li class="item__account">Player</li>
          <li class="item__hero">Hero</li>
          <li class="item__hero-icon"></li>
          <li class="item__lvl">lvl</li>
          <li class="item__kills">K</li>
          <li class="item__deaths">D</li>
          <li class="item__assists">A</li>
          <li class="item__lastHitsDen">LH/D</li>
          <li class="item__dmg">Dmg</li>
          <li class="item__heal">Healed</li>
          <li class="item__totalGold">total gold</li>
          <li class="item__towerDmg">TD</li>
          <ul class="item__items-list">Items</ul>
      </ul>
    </ul>
  </div>
  <div>
  <h3>Chat:</h3>
  <ul class="match__chat-block">
    ${match.chat ? getChatBlock(match.chat) : 'Chat unvailable'}
  </ul>
  </div>`;
  (()=>{ //После того как вся разметка выше была вставлена в страницу, выполниться эта функция, вставляем строки в таблицу недавних матчей
    let row=getPlayerListHtml(match.players); //Получаем все строки таблицы счета
    row.forEach(item=>document.querySelector('.matches__list').insertAdjacentElement('beforeend',item));
  })();
};

const getMatch = (matchId) => {
  let content = document.querySelector('.content');
  let contentCopy = content.innerHTML;
  content.innerHTML='<img class="preloader" src="../img/preloader.gif">';
  //Получаем матч из сервера и вставляем ее id в url, 
  //вызываем функцию setDataToPage чтобы вставить данные в страницу
  let result = getMatchFromApi(matchId);
  result.then((result) => {
    if (result.error) {
      content.innerHTML=contentCopy;
      setDataToPage(null, result.error);
      return 0;
    }
    content.innerHTML=contentCopy;
    document.querySelector(".search__btn").onclick = () => searchMatches();
    setDataToPage(result);
    history.pushState(null, null, "?match=" + matchId);
  });
};

const searchMatches = () => {
  //Берет значение input'а и вызывает getMatch()
  let text = document.querySelector(".matchSearchInput").value;
  document.querySelector(".matches__result").innerHTML = "Loading...";
  getMatch(text);
};




