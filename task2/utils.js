export const preloaderHTML = () => {
    return `<div class="preloader-container"><img class="preloader" src="./images/preloader.gif"/></div>`
}
export const errorHTML = (error) => `<h3 class='error'>${error}</h3>`