const cartList = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');
const shoppingList = cartList.childNodes;
const emptyCart = document.querySelector('.empty-cart');

function saveOnLocalStorage() {
  const arrayToSave = [];
  shoppingList.forEach((item) => arrayToSave
  .push({ class: item.classList[0], text: item.innerText }));
  localStorage.setItem('shoppinglist', JSON.stringify(arrayToSave));
}

 function calculatePrice() {
  const listPrices = [];
  shoppingList.forEach((item) => listPrices
    .push(Number(item.innerText.match(/[^$]*$/gm)[0])));
  const lista2 = listPrices.reduce((acc, curr) => acc + curr, 0);
  return Number(lista2.toFixed(2));
}

async function setTotalPrice() {
  const price = document.querySelector('.total-price');
  price.innerText = `${calculatePrice()}`;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;    
  e.innerText = innerText;
  if (innerText === 'Preço Total :') {
    e.innerText = 'Preço Total : R$0';
  }
  return e;
}

cart.appendChild(createCustomElement('p', 'total-price', 'Preço Total : $0'));

function createLoading() {
  return createCustomElement('p', 'loading', 'loading...');
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
  cartList.removeChild(event.target);
  setTotalPrice();
  saveOnLocalStorage();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const itemsSection = document.querySelector('.items');

async function getAPIData() {
  cart.appendChild(createLoading());
  const dataResponse = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await dataResponse.json();
  cart.lastChild.remove();
  return data;
}

async function getAPIProduct(e) {
  const productId = e.target.parentNode.firstChild.innerText;
  const productResponse = await fetch(
    `https://api.mercadolibre.com/items/${productId}`,
  );
  const productData = await productResponse.json();
  cart.appendChild(createLoading());
  const cartItem = await createCartItemElement(productData);
  cartList.appendChild(cartItem);
  saveOnLocalStorage();
  setTotalPrice();
}

function loadShoppList() {
  const shoppList = JSON.parse(localStorage.getItem('shoppinglist'));
  shoppList.forEach((listItem) => {
    // itemsSection.appendChild()
    cartList.appendChild(createCustomElement('li', listItem.class, listItem.text));
  });
  cartList.childNodes
  .forEach((cartItem) => cartItem.addEventListener('click', cartItemClickListener));
}

const eraseCart = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((cartListChild) => cartListChild.remove());
  setTotalPrice();
  saveOnLocalStorage();
};
emptyCart.addEventListener('click', eraseCart);

window.onload = async () => {
  const data = await getAPIData();
  const itemsList = data.results;
  itemsList.forEach((item) => {
    itemsSection.appendChild(createProductItemElement(item));
  });
  itemsSection.childNodes.forEach(((item) => item.lastChild
    .addEventListener('click', getAPIProduct)));
  loadShoppList();
  setTotalPrice();
};
