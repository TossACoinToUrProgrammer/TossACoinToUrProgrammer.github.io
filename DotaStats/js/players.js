import { getAllUrlParams, redirectPageWithParams } from "./workWithUrl.js";
import { getPlayerFromApi, getPlayerWinLose, getPlayerRecentMatches as getPlayerRecentMatchesFromApi, getPlayerHeroesStats, getPlayerTotals  } from "./queriesToApi/playersApi.js";
import { getHeroIconUrl, getHero, getHeroByName, getHeroesFromApi } from "./queriesToApi/heroesApi.js";

document.querySelector(".search__btn").onclick = () => searchPlayer();

window.onload = () => {
  //Получаем id игрока из url при прогрузке страницы
  const urlParam = getAllUrlParams().player;
  if (urlParam) getPlayer(urlParam);
};
const getRecentMatchesListHtml=(matches,heroes)=>{
  //Возвращает список недавних матчей игрока в виде хтмл
    let list = matches.map(item=>{
        let team;
        let result=true;
        if(item.player_slot>=128){ //Выясняем в какой команде был игрок, и какая команда выиграла
          team='Dire';
          if(item.radiant_win)result=false;
        }
        else{
          team='Radiant';
          if(!item.radiant_win)result=false;
        }
        let hero = getHero(heroes,item.hero_id); //получаем нужного героя из localstorage
        let ul = document.createElement('ul');
        ul.onclick=()=>{
          redirectPageWithParams('matches.html', 'match', item.match_id);
        }
        ul.innerHTML=`<ul class="player__recent-match">
            <li class="item__result ${result? 'win' : 'lose'}"> ${result? 'Win' : 'Lose'}</li>        
            <li class="item__match-id"> ${item.match_id}</li>        
            <li class="item__hero-icon"><img src=${getHeroIconUrl(hero.name)}></li>
            <li class="item__hero">${hero.localized_name}</li>
            <li class="item__kills">${item.kills}</li>
            <li class="item__deaths">${item.deaths}</li>
            <li class="item__assists">${item.assists}</li>
            <li class="item__lastHitsDen">${item.last_hits}</li>
            <li class="item__dmg">${item.hero_damage}</li>
            <li class="item__gpm">${item.gold_per_min}</li>
            <li class="item__xpm">${item.xp_per_min}</li>
            <li class="item__towerDmg">${item.tower_damage}</li> 
            <li class="item__duration">${(item.duration/60).toFixed(0)+':'+item.duration%60}</li> 
        </ul>`;
        return ul;
    });
    return list;
};

const addRecentMatchesListToPage=( matches,heroes)=>{
  let recentMatchesList = getRecentMatchesListHtml(matches, heroes);//Список недавних матчей игрока, в дальнешйем вставляем в разметку
  recentMatchesList.forEach(item=>document.querySelector('.player__recent-matches').insertAdjacentElement('beforeend',item));
};

const getPlayerHeroesHtml=( heroes,heroesStats )=>{
  //Возвращает html разметку статистики героев
  let list = heroesStats.map(item=>{
    let hero = getHero(heroes,item.hero_id);
    return `<ul class='player__hero'>
      <li class='item__hero-icon'><img src=${getHeroIconUrl(hero.name)}></li>
      <li class="item__hero">${hero.localized_name}</li>
      <li class='item__hero-total'>${item.games}</li>
      <li class='item__hero-wins'>${item.games!=0 ? Math.floor(item.win/(item.games/100))+"%" : 'Unplayed'}</li>
      <li class='item__hero-total'>${item.with_games}</li>
      <li class='item__hero-wins'>${item.with_games!=0 ? Math.floor(item.with_win/(item.with_games/100))+"%" : 'Unplayed'}</li>
      <li class='item__hero-total'>${item.against_games}</li>
      <li class='item__hero-wins'>${item.against_games!=0 ? Math.floor(item.against_win/(item.against_games/100))+"%" : 'Unplayed'}</li>
    </ul>`;    
  })
  return list;
};

const changeTabContent=(e)=>{
  //Функция меняет контент по нажатию на ссылку
  let tabs=document.querySelectorAll('ul.tab-content');
  tabs.forEach(item=>item.style.display='none'); //скрываем все блоки

  let id = e.currentTarget.id;//получаем айди элемента на который кликнули
  
  let tab = Array.from(tabs).filter(tab=>Array.from(tab.classList).includes(id))[0];
  tab.style.display='block'; //если айди кликнутого элемента схож с классом блока, то задаем ему display block


  //Делаем все ссылки неактвными, кроме ссылки по которой кликнули
  let links = document.querySelectorAll('.tab-link');
  for(let i=0;i<links.length;i++){
    links[i].classList.remove('active-link');
  } 
  e.currentTarget.classList.add('active-link');
  
};
const setDataToPage=(player,matches, heroesStats,wl, heroes,err='')=>{
  //Функция реализует Отрисовкy контента
  let div = document.querySelector(".player__result");
  div.innerHTML = "";
  if (err) {   //вставляем текст ошибки, если таковая имеется
    div.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="error-title"> ${err}, may be blocked account</h1>`
    );
    return 0;
  }
  if(!player.profile){
    div.insertAdjacentHTML(
        "afterbegin",
        `<h1 class="error-title"> Blocked Account</h1>`
      );
      return 0;
  }

  div.innerHTML = `
  <h3>Account id: ${player.profile.account_id}</h3>
  <div class='player__info'>
  <img src="${player.profile.avatarfull}" alt="">
    <ul>
      <h1>${player.profile.personaname!=null ? player.profile.personaname : 'Anonym'}</h1>
      <a href='${player.profile.profileurl}'>Steam Profile</a>
      <div class="player__wl">
    MMR estiamte:<h3> ${player.mmr_estimate.estimate}</h3>
      Wins: <h4 class="win">${wl.win}</h4>
      Loses:<h4 class="lose">${wl.lose}</h4>
    </div>
    </ul>
  </div>
  <ul class='tab-links'>
    <li id='player__recent-matches' class='tab-link active-link'> <h3>Recent Matches</h3> </li>
    <li id='player__heroes' class='tab-link'> <h3>Heroes</h3> </li>
    <li id='player__totals' class='tab-link'> <h3>Totals</h3> </li>
    </ul>
    <div class='scroll-container'>
      
    <ul class='player__recent-matches tab-content'>
    <h3>Recent Matches: </h3>
      <ul class="player__recent-match">
          <li class="item__result">Result</li>        
          <li class="item__match-id">Match id</li>        
          <li class="item__hero-icon">Hero</li>
          <li class="item__hero"></li>
          <li class="item__kills">K</li>
          <li class="item__deaths">D</li>
          <li class="item__assists">A</li>
          <li class="item__lastHitsDen">LH</li>
          <li class="item__dmg">Dmg</li>
          <li class="item__gpm">GPM</li>
          <li class="item__xpm">XPM</li>
          <li class="item__towerDmg">TD</li> 
          <li class="item__duration">Duration</li>
      </ul>
    </ul>
    <ul class='player__heroes tab-content'>
      <h3>Heroes: </h3>
      <ul class='player__hero'>
        <li class='item__hero'>Hero</li>
        <li class='item__hero-icon'></li>
        <li class='item__hero-total'>Games</li>
        <li class='item__hero-wins'>Win</li>
        <li class='item__hero-total'>With games</li>
        <li class='item__hero-wins'>Win with</li>
        <li class='item__hero-total'>Against games</li>
        <li class='item__hero-wins'>Win against</li>
      </ul>  
      ${getPlayerHeroesHtml(heroes, heroesStats).join('')}
    </ul>
    <ul class='player__totals tab-content'>
    </ul>
    </div>
  `;
  
  addRecentMatchesListToPage(matches,heroes);

  (async()=>{//функция вызывается после того как разметка выше отрисована, так что можно обращаться к ее элементам

    let tabLinks=document.querySelectorAll('.tab-link');
    tabLinks.forEach(item=>item.onclick=(e)=>changeTabContent(e));  //Устанавливаем обработчик событй на нажатие вкладки

    document.querySelectorAll('.player__hero').forEach(item=>item.onclick=()=>{ //По килку на список персонажа переходим на страницу персонажа
      let hero =getHeroByName(heroes,item.childNodes[3].textContent);
      redirectPageWithParams('hero.html','hero',hero.id)
    })

    if(player){
      let totals = await getPlayerTotals(player.profile.account_id);
      let ul=document.querySelector('.player__totals');
      totals.forEach(item=>ul.insertAdjacentHTML('beforeend',`<li class='player__total'><p>${item.field.split('_').join(' ')}:</p> ${item.sum}</li>`));
    }
  })();
};


const getPlayer = async(id) => {
  //Функция собирает из запросов все нужные данные, а потом передает их в качестве аргумента setDataToPage
  let content = document.querySelector('.content');
  let contentCopy = content.innerHTML;
  content.innerHTML='<img class="preloader" src="../img/preloader.gif">';
  let result = await getPlayerFromApi(id); //получаем данные игрока
  if (result.error) {
    content.innerHTML=contentCopy;
    setDataToPage(null,null, null,null, null, result.error);
    history.pushState(null, null, '?');
    return 0;
  }
  if (!result) {
    content.innerHTML=contentCopy;
    setDataToPage(null,null, null,null, null, 'Player not found');
    history.pushState(null, null, '?');
    return 0;
  }
  let matches = await getPlayerRecentMatchesFromApi(id);  //вызываем функцию чтобы получить недавние матчи игрока
  let heroesStats=await getPlayerHeroesStats(id);
  let wl = await getPlayerWinLose(id); //Получаем из сервера винрейт игрока
  let heroes = await getHeroesFromApi();
  content.innerHTML=contentCopy;
  setDataToPage(result,matches, heroesStats, wl, heroes);
};

const searchPlayer = () => {
  //Берет значение input'а и вызывает getMatch()
  let text = document.querySelector(".playerSearchInput").value;
  document.querySelector(".player__result").innerHTML = "Loading...";
  getPlayer(text);
};
