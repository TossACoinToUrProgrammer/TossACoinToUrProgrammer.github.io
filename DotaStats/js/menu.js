document.querySelector('.header__burger').onclick=(e)=>{
    const btn = e.target;
    const parent = btn.closest('header');
    parent.classList.toggle('active-menu');
}