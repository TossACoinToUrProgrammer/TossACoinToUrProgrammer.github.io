const urlCategories = "http://46.101.146.101:8081/categories/";

async function fetchAsync(url) {
  const response = await fetch(url);
  let result = await response.json();
  return result;
}

fetchAsync(urlCategories)
  .then(response => {
    let div = document.querySelector(".categories");
    div.innerHTML += `<ul>`;
    for (i in response) {
      div.innerHTML += `<li style="margin-top:20px;">Id:${response[i]["id"]}<br>Title:${response[i]["title"]}<br>category image:<br><img width="500px" src="${response[i]["category_image_url"]}"></li>`;
    }
    div.innerHTML += `</ul>`;
  })
  .catch(error => ConstantSourceNode.error(error));

function findGif() {
  const input = document.querySelector(".find-gif__input").value;
  let div = document.querySelector(".find-gif__gifs");
  div.innerHTML = "";
  fetchAsync(
    `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=tdTHeamDvNzxOkO2RPScG1ikdVBHe1OM`
  ).then(response => {
    for (i in response["data"]) {
      div.innerHTML += `<img src="${response["data"][i]["images"]["original"]["url"]}">`;
    }
  });
}
