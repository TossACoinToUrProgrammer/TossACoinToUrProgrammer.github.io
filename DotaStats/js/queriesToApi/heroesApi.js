const baseUrl = "https://api.opendota.com/api/heroes";
const heroesStats='https://api.opendota.com/api/heroStats';

const getHeroesFromApi = async () => {
  if (!localStorage.getItem("heroes")) {
    let heroes = await fetch(baseUrl);
    heroes = await heroes.json();
    localStorage.setItem("heroes", JSON.stringify(heroes));
  }
};
export const getHeroesStatsFromApi=async()=>{
  if (!localStorage.getItem("heroesStats")) {
    let heroes = await fetch(heroesStats);
    heroes = await heroes.json();
    localStorage.setItem("heroesStats", JSON.stringify(heroes));
  }
}
export const getHeroesStats=()=>{
  getHeroesStatsFromApi();
  return JSON.parse(localStorage.getItem("heroesStats"));
}
export const getHeroes = () => {
  getHeroesFromApi();
  return JSON.parse(localStorage.getItem("heroes"));
};

export const getHero = (arr, id) => {
  return arr.filter((item) => item.id == id)[0];
};
export const getHeroByName = (arr, name) => {
  return arr.filter((item) => item.localized_name == name)[0];
};
export const getHeroIconUrl = (name) => {
  const nameUrl = name.split("npc_dota_hero_").join("");
  let resultUrl =
    "https://api.opendota.com/apps/dota2/images/heroes/" +
    nameUrl +
    "_full.png?";
  return resultUrl;
};
export const getHeroMatchups=async(id)=>{
  let matchups = await fetch(baseUrl+'/'+id+'/'+'matchups');
  matchups = await matchups.json();
  return matchups;
}
export const getItemBuilds=async(id)=>{
  let item = await fetch(baseUrl+`/${id}/itemPopularity`);
  item = await item.json();
  return item;

}
export const getHeroPlayers=async(id)=>{
  let players=await fetch(baseUrl+'/'+id+'/players');
  players=await players.json();
  return players;
}