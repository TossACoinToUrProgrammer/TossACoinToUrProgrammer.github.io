const baseUrl = "https://api.opendota.com/api/constants/items";

export const getItems = async () => {
  if (!localStorage.getItem("items")) {
    let items = await fetch(baseUrl);
    items= await items.json();
    localStorage.setItem('items', JSON.stringify(items));
  }
};

export const getItem=(id)=>{
    getItems();
    let items = JSON.parse(localStorage.getItem('items'));
    let item;
    for(let i in items){
        if(items[i]['id']===id){
            item=items[i];
        }
    }
    return item;
}
export const getItemModalHtml=(item)=>{
  //Возвращает модальное окно, которая появляется при наведении на предмет
  return `
  <div class="item__modal">
    <h4>${item.dname}</h4>
    ${item.hint ? item.hint.map(i=>`<p class="item__hint">${i}</p>`).join('') : ''}
    <ul class="item__attribs">
    <h6 class="item__title">Attributes:</h6>
      ${item.attrib.length && item.attrib.map(i=>`<p class="item__attrib">${(i.footer ? i.footer : '') + " " + i.header + " " + i.value}</p>`).join('')}
    </ul>
    ${item.cost && `<p><h6 class="item__title">Cost:</h6><p class="item__cost">${item.cost}</p></p>`}
    ${item.notes && `<p class="item__note"><h6 class="item__title">Note:</h6> ${item.notes}</p>`}
    ${item.lore && `<p class="item__lore"><h6 class="item__title">Lore:</h6> ${item.lore}</p>`}
    ${(item.cd && item.cd!==false) && `<p class="item__cd"><h6 class="item__title">Cooldown:</h6> ${item.cd}sec</p>`}
  </div>
  `;
};

