function addFunc() {
  let elem = document.querySelector("#toDoList__input-title");
  let title = elem.value;
  let list = document.querySelector(".DoList__list");
  if (title.length >= 50) {
    alert("Текст слишком длинный, разбейте задачу на подзадачи");
    elem.value = "";
  } else if (title != "") {
    list.innerHTML += `<li class="DoList__elem"><p class="done">🗸</p>${title}<div class="close">X</div></li>`;
    elem.value = "";
    setOnclickAddFunc();
    setOnclickDelFunc();
  } else {
    alert("Вы ничего не ввели!");
  }
}

function setOnclickAddFunc() {//функция устанавливает обработчики нажатия на checkbox'ы
  let checkBox = document.getElementsByClassName("done");
  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].onclick = () => {
      if (checkBox[i].parentElement.classList.contains("active")) {
        checkBox[i].parentElement.classList.remove("active");
      } else {
        checkBox[i].parentElement.classList.add("active");
      }
    };
  }
}
function setOnclickDelFunc() { //функция устанавливает обработчики нажатия на крестики
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = () => {
      let div = close[i].parentNode;
      div.parentNode.removeChild(div);
      setOnclickAddFunc();
      setOnclickDelFunc(); //нужно для того, чтобы обновить индексы элементов после удаления одной из них
    };
  }
}
