const burgerInit = () => {
    const btn = document.querySelector('.burger-btn')
    const menu = document.querySelector('.menu')
    btn.onclick = () => {
        menu.classList.toggle('active')
        btn.classList.toggle('active')
    }
}

burgerInit()