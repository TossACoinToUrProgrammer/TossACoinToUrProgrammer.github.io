import { redirectPageWithParams } from "./workWithUrl.js";


let showSearchForm = (selector) => {
  document.querySelectorAll(".header__searchForm").forEach((item) => {
    if (!Array.from(item.classList).includes(selector.split(".")[1])) {
      item.style.display = "none";
    }
  });
  let searchForm = document.querySelector(selector);
  searchForm.style.display == "none" || !searchForm.style.display
    ? (searchForm.style.display = "block")
    : (searchForm.style.display = "none");
};
document.querySelector(".header__matches-link").onclick = (e) => {
  e.preventDefault();
  showSearchForm(".match-search");
};
document.querySelector(".header__players-link").onclick = (e) => {
  e.preventDefault();
  showSearchForm(".player-search");
};
document.querySelector('.header__player-search-btn').onclick=()=>{
    console.log('header is here1');
    let text = document.querySelector('.header__player-search-input').value;  
    redirectPageWithParams('players.html', 'player', text);
}
document.querySelector('.header__match-search-btn').onclick=()=>{
    let text = document.querySelector('.header__match-search-input').value;
    redirectPageWithParams('matches.html', 'match', text);
}    
