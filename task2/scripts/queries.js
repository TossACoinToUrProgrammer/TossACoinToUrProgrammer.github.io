const baseUrl = "https://jsonplaceholder.typicode.com/"

const getQueryTemplate = (url) => {
  return fetch(baseUrl + url)
    .then((response) =>
      response.status !== 200 ? { error: "Error" } : response.json()
    )
    .then((data) => data)
    .catch((err) => ({ error: err }))
}

export const getUsers = () => getQueryTemplate("users")
export const getUser = (id) => getQueryTemplate(`users/${id}`)
export const getTodos = (id) => getQueryTemplate(`todos?userId=${id}`)
export const getPosts = (id) => getQueryTemplate(`posts?userId=${id}`)

export const createPost = ({title, body, userId}) => {
  return fetch(baseUrl + "posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
}
