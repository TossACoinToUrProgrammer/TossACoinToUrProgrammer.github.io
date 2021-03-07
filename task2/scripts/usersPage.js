import { getUsers } from "../queries.js"
import { errorHTML, preloaderHTML } from "../utils.js"

const $root = document.querySelector(".content")

const render = async () => {
  $root.innerHTML = preloaderHTML()
  const users = await getUsers()
  if (users.error) {
    $root.innerHTML = errorHTML(users.error)
    return
  }
  setDataToPage(users)
}

render()

function setDataToPage(users) {
  $root.innerHTML = `
    <ul class='users-list'> ${getUsersHTML(users)} </ul>
    `
}
function getUsersHTML(users) {
    return users.map((user) => `
        <li class="user">
        <h3 class="user__name">${user.name}</h3>
        <div class="user__info">
          <div>
            <div class="user__username"><span class='user__key'>Username:</span> ${user.username}</div>
            <div class="user__email"><span class='user__key'>Email:</span> ${user.email}</div>
            <div class="user__phone"><span class='user__key'>Phone:</span> ${user.phone}</div>
          </div>
          <img
            class="user__avatar"
            src="./images/avatarFem.svg"
            alt="user avatar"
          />
        </div>
        <div class="user__address">
          <h4>Address:</h4>
          <div class="user__street"><span class='user__key'>Streer:</span> ${user.address.street}</div>
          <div class="user__city"><span class='user__key'>City:</span> ${user.address.city}</div>
        </div>
        <div class="user__company">
          <h4>Company:</h4>
          <div class="user__companyName"><span class='user__key'>Name:</span> ${user.company.name}</div>
          <div class="user__companyCatchPhrase">
            <span class='user__key'>Catch Phrase:</span> ${user.company.catchPhrase}
          </div>
        </div>
        <a class='user__profile-link' href="profile.html?id=${user.id}">Go To Profile</a>
      </li>`
    )
    .join("")
}