for (var i = 0; i < 11; i++) {
  setTimeout(function() {
    console.log(i);
  });
}
/*
    консоль выведет 10 10 раз
    потому что к моменту срабатывания setTimeout, 
     цикл уже полностью выполнится и переменная примет значение равное десяти
*/

/*Write a JavaScript program to display the current
day and time in the following format.  
Sample Output : 
Today is : Friday. 
Current time is : 4 PM : 50 : 22*/

function currentTime() {
  const date = new Date();
  console.log(
    "Today is : " +
      date.toLocaleString("en-US", { weekday: "long" }) +
      "\n" +
      "Current time is : " +
      date.toLocaleString("en-US", { hour: "numeric" }) +
      " : " +
      date.toLocaleString("en-US", { minute: "numeric" }) +
      " : " +
      date.toLocaleString("en-US", { second: "numeric" })
  );
}
currentTime();

/*Write a JavaScript function that reverse a number.  */
function reverseNumber(num) {
  num = num + "";
  num = num
    .split("")
    .reverse()
    .join(""); //разделили каждый символ, перевернули строку, соединили
  return parseInt(num);
}

/*Write a JavaScript program to calculate the factorial 
of a number. In mathematics, the factorial of a non-negative 
integer n, denoted by n!, is the product of all positive integers 
less than or equal to n. 
For example, 5! = 5 x 4 x 3 x 2 x 1 = 120*/
function factorial(num) {
  if (typeof num != "number") {
    alert("Введите число!");
    return 0;
  }
  if (num < 0) {
    alert("число отрицательное");
    return 0;
  } else if (num == 1) {
    return 1;
  }
  num *= factorial(num - 1);
  return num;
}
/** Write a JavaScript program that accept two integers and display the larger.*/
function compare(num1, num2) {
  if (typeof num1 != "number" || typeof num2 != "number") {
    alert("Вводите только числа!");
    return;
  } else if (num1 == num2) {
    alert("Они равны");
  }
  num1 > num2
    ? alert(`${num1} больше ${num2}`)
    : alert(`${num2} больше ${num1}`);
}

/**Write a simple JavaScript program to join 
all elements of the following array into a string. 
Sample array : myColor = ["Red", "Green", "White", "Black"];
Expected Output : 
"Red,Green,White,Black"
"Red+Green+White+Black"
*/
function strFromArray(arr) {
  let str = "";
  for (elem in arr) {
    str += arr[elem] + ",";
  }
  return str;
}

/**
Write a JavaScript function to get the month name from a particular date. 
Test Data :
console.log(month_name(new Date("10/11/2009"))); 
console.log(month_name(new Date("11/13/2014")));
Output :
"October" 
"November" 
 */
function get_month(date) {
  return date.toLocaleString("en-SU", { month: "long" });
}

/**Write a JavaScript program to test the first character of a string is uppercase or not
 */
function caseCheck(str) {
  if (str[0] == str[0].toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

/**Write a js program to draw a smile */
let head = document.querySelector(".head");
head.style.background = "yellow";
head.style.borderRadius = "100%";

let eyes__line = document.querySelector(".eyes__line");
eyes__line.style.display = "flex";
eyes__line.style.justifyContent = "space-around";

let eyes = document.getElementsByClassName("eyes");
eyes[1].style.background = eyes[0].style.background = "black";
eyes[1].style.borderRadius = eyes[0].style.borderRadius = "100%";
eyes[1].style.marginTop = eyes[0].style.marginTop = "120px";

let mouth = document.querySelector(".mouth");
mouth.style.marginTop = "120px";
mouth.style.marginLeft = "120px";
mouth.style.border = " 2px solid red";
mouth.style.borderRadius = " 0 0 50% 50% / 0 0 100% 100%";
mouth.style.background = "white";

/**Задание 1
На странице есть верстка:

<div id="string-1">Ядра в вёдра, выдру в тундру!</div>
<div id="string-2">Выдрав с выдры в тундре гетры</div>
<div id="string-3">В недрах тундры, выдры в гетрах </div>
<div id="string-4">Вытру гетрой выдре морду </div>
<div id="string-5">Тырят в вёдра ядра кедров!</div>
<div id="string-6">Вытру выдрой ядра кедров</div>
	
Необходимо поочередно обратиться к каждому тэгу в нужном порядке, и 
вывести их содержимое в консоль, чтобы получилась осмысленная скороговорка.

Вывод в консоли:
В недрах тундры, выдры в гетрах
Тырят в вёдра ядра кедров!
Выдрав с выдры в тундре гетры
Вытру выдрой ядра кедров
Вытру гетрой выдре морду
Ядра в вёдра, выдру в тундру!
 */
console.log(
  document.getElementById("string-3").textContent +
    "\n" +
    document.getElementById("string-5").textContent +
    "\n" +
    document.getElementById("string-2").textContent +
    "\n" +
    document.getElementById("string-6").textContent +
    "\n" +
    document.getElementById("string-4").textContent +
    "\n" +
    document.getElementById("string-1").textContent +
    "\n"
);

/**
 Задание 2
На странице есть верстка

<div class="element">Element 1</div>
<div class="element">Element 2</div>
<div class="element">Element 3</div>
<div class="element">Element 4</div>
<div class="element">Element 5</div>
<div class="element">Element 6</div>

С помощью JS необходимо первым трем  элементам задать красный 
цвет текста, а остальным трем - зеленый.

 */
let elements = document.getElementsByClassName("element");
for (let i = 0; i < elements.length; i++) {
  if (i < 3) {
    elements[i].style.color = "red";
  } else {
    elements[i].style.color = "green";
  }
}

/**Задание 3

На странице есть контейнер <ol id="todo-list"></ol>, 
необходимо с помощью цикла добавить в него пять задач (элементов <li>) 
с классом task и текстом, взятым из массива задач из пяти элементов: 

var tasks = ['Buy lemonade', 'Make toasts', 'Repair car', 'Play games', 'Pet a cat'];

Ожидаемый результат в инспекторе после выполнения скрипта:

<ol id="todo-list">
	<li class="task">Buy lemonade</li>
	<li class="task">Make toasts</li>
	<li class="task">Repair car</li>
	<li class="task">Play games</li>
	<li class="task">Pet a cat</li>
</ol>
 */
let list = document.getElementById("todo-list");
const tasks = [
  "Buy lemonade",
  "Make toasts",
  "Repair car",
  "Play games",
  "Pet a cat"
];
for (let i = 0; i < tasks.length; i++) {
  list.innerHTML += `<li class="task">${tasks[i]}</li>`;
}

/**Задание 4
На странице есть следующая разметка:

<article>
<h3>What is Lorem Ipsum?</h3>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type
specimen book. It has survived not only five centuries, but also the leap into 
electronic typesetting, remaining essentially unchanged. It was popularised in the 
1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
<h3>Where does it come from?</h3>
<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
 in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
  The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line 
  in section 1.10.32. from "The Extremes of Good and Evil" by Cicero</p>
<h3>Why do we use it?</h3>
<p>It is a long established fact that a reader will be distracted by the readable
 content of a page when looking at its layout. The point of using Lorem Ipsum is
  that it has a more-or-less normal distribution of letters, as opposed to using
   'Content here, content here', making it look like readable English.</p>
</article>

Вам необходимо с помощью JavaScript вставить после каждого тега <p> тег <hr>,
для визуального отделения абзацев друг от друга.
	
Указания:
Подразумевается, что вышеуказанная разметка находится внутри тега <body>.
Нельзя модифицировать указанную разметку.
За использование цикла дополнительные баллы.
 */
let texts = document.getElementsByTagName("p");
for (let i = 0; i < texts.length; i++) {
  texts[i].innerHTML += "<hr>";
}

/**Задание 5
Дана такая разметка:

<div id="cart-items">
	<div class="item">Milk 1 l.<span class="qty">x 2</span></div>
	<div class="item">Cola 1.5 l. <span class="qty">x 1</span></div>
	<div class="item">Bread<span class="qty">x 2</span></div>
	<div class="item">Cheese<span class="qty">x 1</span></div>
	<div class="item">Chocolate bar<span class="qty">x 3</span></div>
</div>

Необходимо с помощью JavaScript удалить элемент "Cola 1.5 l" и заменить товар 
"Chocolate bar" на "Canned Fish", количеством 4 штуки.

Указания:
Для удаления использовать .remove()
Для замены использовать .replaceChild()
Подразумевается, что вышеуказанная разметка находится внутри тега <body>.

*/
let items = document.getElementsByClassName("item");
let cart_items = document.getElementById("cart-items");
const newDiv = document.createElement("div");
newDiv.innerHTML = 'Canned Fish<span class="qty">x 4</span>';
for (let i = 0; i < items.length; i++) {
  if (items[i].textContent.indexOf("Cola 1.5 l") >= 0) {
    items[i].remove();
  }
  if (items[i].textContent.indexOf("Chocolate bar") >= 0) {
    cart_items = cart_items.replaceChild(newDiv, items[i]);
  }
}

/**Задание 6
Напишите программу для создания списка задач, которые будет вводить пользователь:
в
Для каждого пункта:
Запрашивайте содержимое пункта у пользователя с помощью prompt.
Создавайте пункт и добавляйте его к UL.
Процесс прерывается, когда пользователь нажимает "Отмена" или вводит пустую строку.
 */
let doList = document.getElementById("toDoList");
function addElemToList() {
  let item = prompt("Add element");
  if (item != "Отмена" && item != "отмена" && item != ""&&item!=null) {
    doList.innerHTML += `<input type="checkbox" style="float:left;"><ul>${item}</ul>`;
    addElemToList();
  } 
}
