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
document.querySelector('.player-search .search__btn').onclick=()=>{
    let text = document.querySelector('.header__searchForm .playerSearchInput').textContent;
    redirectPageWithParams('players.html', 'player', text);
}
document.querySelector('.match-search .search__btn').onclick=()=>{
    let text = document.querySelector('.header__searchForm .matchSearchInput').textContent;
    redirectPageWithParams('matches.html', 'match', text);
}