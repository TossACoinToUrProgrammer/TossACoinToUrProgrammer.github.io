import { getHeroByName, getHeroesStats, getHeroesStatsFromApi } from "./queriesToApi/heroesApi.js";
import { redirectPageWithParams } from "./workWithUrl.js";

let heroes = getHeroesStats();

  let heroesIcons = document.querySelectorAll('.heroes__hero-icon');
  heroesIcons.forEach(item=>{
      item.onclick=async()=>{
      let heroName = item.childNodes[3].lastElementChild.textContent; //Получаем textContent блока div с классом .modal__text
      if(!heroes) {
        heroes = await getHeroesStats();
      }
      let hero = getHeroByName(heroes,heroName);
      redirectPageWithParams('hero.html','hero',hero.id);
    }
  })