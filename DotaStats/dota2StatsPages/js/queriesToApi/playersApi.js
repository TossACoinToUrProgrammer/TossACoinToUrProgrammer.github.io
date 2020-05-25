const baseUrl = "https://api.opendota.com/api/players/";

const queryTemplate=async(url)=>{
  let obj=await fetch(url);
  obj=await obj.json();
  return obj;
}

export const getPlayerFromApi = async (id) =>queryTemplate(baseUrl + id);
export const getPlayerWinLose=async(id)=>queryTemplate(baseUrl + id+'/wl');
export const getPlayerRecentMatches=async(id)=>queryTemplate(baseUrl + id+'/recentMatches');
export const getPlayerHeroesStats=async(id)=>queryTemplate(baseUrl+id+'/heroes');
export const getPlayerTotals=async(id)=>queryTemplate(baseUrl+id+'/totals');
export const getPlayersAvatar=async(id)=>{
  let player = await getPlayerFromApi(id);
  return player.profile.avatarfull;
}