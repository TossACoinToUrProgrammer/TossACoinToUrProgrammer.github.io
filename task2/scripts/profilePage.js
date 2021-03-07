import { getUser, getTodos, getPosts, createPost } from "../queries.js"
import { errorHTML, preloaderHTML } from "../utils.js"

const userId = window.location.search.split("=")[1]

const $root = document.querySelector(".content")
const $leftside = document.createElement("div")
const $rightside = document.createElement("div")
$leftside.classList.add('leftside')
$rightside.classList.add('rightside')
$root.insertAdjacentElement("afterbegin", $rightside)
$root.insertAdjacentElement("afterbegin", $leftside)

const render = async () => {
  $leftside.innerHTML = $rightside.innerHTML = preloaderHTML()
  const user = await getUser(userId)
  const todos = await getTodos(userId)
  const posts = await getPosts(userId)
  if (user.error || todos.error || posts.error) {
    $root.innerHTML = errorHTML('Error')
    return
  }
  setDataToPage({ user, todos, posts })
  tabsInit()
  postFormInit()
}
render()

function setDataToPage({ user, posts = [], todos = [] }) {
  $leftside.innerHTML = `
    <img class='avatar' src="./images/avatarMan.svg" alt="Avatar">
    <h4>${user.name}</h4>
    `
  $rightside.innerHTML = `
    <ul class="tabs">
      <li class='tab-link' data-tab="todos"><span>Todos</span></li>
      <li class='tab-link active' data-tab="posts"><span>Posts</span></li>
    </ul>
    `
  $rightside.innerHTML += `
  <ul class="tab todos">${todosHTML(todos)}</ul>`
  $rightside.innerHTML += `
  <ul class="tab posts active">
    <form class='post-form'>
      <input class='post-form__title' placeholder="Enter title..." type="text">
      <input class='post-form__body' placeholder="Enter text..." type="text">
      <button>post</button>
    </form>
    ${postsHTML(posts)}
  </ul>`
}

function todosHTML(todos) {
  return todos
    .map(
      (todo, i) => `
    <li class="todo">
      <span class="todo__num">${i}</span>
      <span class="todo__title">${todo.title}</span>
      <button class='todo__delete'>X</button>
    </li>
    `).join("")
}

function postsHTML(posts) {
  return posts.map(
    (post) => `
    <li class="post">
      <div class="post__title">${post.title}</div>
      <div class="post__body">${post.body}</div>
    </li>
    `
  ).join('')
}

function tabsInit() {
    const links = $root.querySelectorAll('.tab-link')
    const tabs = $root.querySelectorAll('.tab')

    links.forEach(link => {
        link.onclick = () => {
            links.forEach(item => item.classList.remove('active'))
            link.classList.add('active')
            const tabName = link.dataset.tab
            tabs.forEach(item => item.classList.remove('active'))
            $root.querySelector(`.tab.${tabName}`).classList.add('active')
        }
    })
}

function postFormInit() {
    const $form = $root.querySelector('.post-form')
    const $inputTitle = $form.querySelector('.post-form__title')
    const $inputBody = $form.querySelector('.post-form__body')
    $form.onsubmit = async(e) => {
        e.preventDefault()
        const newPost = {title: $inputTitle.value, body: $inputBody.value, userId}
        const result = await createPost(newPost)
        alert("Пост успешно создан\n" + JSON.stringify(result))
    }
}