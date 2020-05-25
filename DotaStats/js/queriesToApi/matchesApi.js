const baseUrl = "https://api.opendota.com/api/matches/";

export const getMatchFromApi = async(matchId) => { //запрос на сервер на получение матча
    let response =await fetch(baseUrl + matchId);
    response =await response.json();
    return response;
  };