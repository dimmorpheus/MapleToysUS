import productsData from './product_data.js';
import {shippingData, shippingDataDefault, parcelFee, insurance} from './shipping_data.js';
import i18n from './i18n.js';

const productsContainer = document.querySelector('#products-container');
const digitNum = 4;
const dOffset = window.getComputedStyle(document.getElementById('header-container')).height.replaceAll(/[^0-9]/g,'');
const rate = getCurrRates();
const currSymbol = {'en': '$', 'ru': '$'};

let wOffset = 0;
let imgInd = new Array(productsData.length).fill(0);
let cart = [];
let totalProductsCost = 0;
let totalProductsWeight = 0;
let totalShippingCost = 0;
let lang = 'en';
let orderDetails = '';
let langNotDefined = true;
let currRate = 1;

function getLocalStorage() {
  let key = localStorage.getItem('_mapletoys_cart_');
  let str;

  if (key != null) {
    str = key.split('_');

    for (let i = 0; i < str.length; ++i) {
      if (str[i].length > 0)
        cart.push(str[i].split(','));
    }
  }
}

function setLocalStorage() {
  let tmp = [];

  for (let i = 0; i < cart.length; ++i) {
    if (cart[i].length > 0)
      tmp.push(cart[i].join(','));
    else
      cart.splice(i,1);
  }

  localStorage.setItem('_mapletoys_cart_', tmp.join('_'));

  for (let i of document.querySelectorAll('.required-data'))
    localStorage.setItem(`_mapletoys_cd_${i.id}_`, i.value);
}

function getMinPrice(arr) {
  let min = arr[0].price;

  for (let i = 1; i < arr.length; ++i) {
    if (arr[i].price < min)
      min = arr[i].price;
  }

  return min;
}

function formatProdID(ind) {
  let prodId = (ind + 1).toString();

  while (prodId.length < digitNum)
    prodId = '0' + prodId;

  return prodId;
}

function parseProducts() {
  for (let i = 0; i < productsData.length; ++i) {
    let prodId = formatProdID(i);

    productsContainer.innerHTML += `
            <div class="product-container" id="product_${prodId}">
                <div class="product-container-img">
                    <img src="./assets/images/products/small/${prodId}/0001.jpeg" alt="${prodId}_0001" class="product-img _${prodId}">
                    <div class="slider-container">
                        <div class="open-button _${prodId}">${i18n[lang]['_-open-button']}</div>
                        <div class="slider-container-center">
                            <div class="slider-button-prev _${prodId}"><</div>
                            <div class="slider-button-next _${prodId}">></div>
                        </div>
                        <div class="slider-inds">
                            <div class="slider-ind _${prodId} active"></div>
        ${function (){
      let htmlData = '';
      for (let j = 1; j < productsData[i].images; ++j)
        htmlData += `<div class="slider-ind _${prodId}"></div>`;
      return htmlData;
    }()}
                        </div>
                    </div>
                </div>
                <p class="product-title" id="product-title-${i}">${productsData[i].title[lang]}</p>
                <p class="product-cost" id="product-cost-${i}">$ ${getMinPrice(productsData[i].variation)}</p>
            </div>
        `;
  }
}

function changeActiveSlide(elements, ind) {
  for (let e of elements)
    e.classList.remove('active');
  elements[ind].classList.add('active');
}

function changeImg(element, id, ind, size) {
  element.src =`./assets/images/products/${size}/${formatProdID(id)}/${formatProdID(ind)}.jpeg`;
  element.alt = `${formatProdID(id)}_${formatProdID(ind)}`;
}

function prevImg(id) {
  if (imgInd[id] === 0)
    imgInd[id] = productsData[id].images - 1;
  else
    --imgInd[id];

  return imgInd[id];
}

function nextImg(id) {
  if (imgInd[id] === productsData[id].images - 1)
    imgInd[id] = 0;
  else
    ++imgInd[id];

  return imgInd[id];
}

function addEvents() {
  let sliderInd;
  let prodId;
  let prevButton, nextButton, openButton;

  for (let i = 0; i < productsData.length; ++i) {
    prodId = formatProdID(i);
    sliderInd = document.querySelectorAll(`.slider-ind._${prodId}`);
    prevButton = document.querySelector(`.slider-button-prev._${prodId}`);
    nextButton = document.querySelector(`.slider-button-next._${prodId}`);
    openButton = document.querySelector(`.open-button._${prodId}`);

    prevButton.addEventListener('click', () => {
      prevImg(i);
      changeImg(document.querySelector(`.product-img._${formatProdID(i)}`), i, imgInd[i], 'small');
      changeActiveSlide(document.querySelectorAll(`.slider-ind._${formatProdID(i)}`), imgInd[i]);
    });

    nextButton.addEventListener('click', () => {
      nextImg(i);
      changeImg(document.querySelector(`.product-img._${formatProdID(i)}`), i, imgInd[i], 'small');
      changeActiveSlide(document.querySelectorAll(`.slider-ind._${formatProdID(i)}`), imgInd[i]);
    });

    openButton.addEventListener('click', () => {
      openProductDetails(i);
    });

    sliderInd.forEach((s, ind) => {
      s.addEventListener('click', () => {
        imgInd[i] = ind;
        changeImg(document.querySelector(`.product-img._${formatProdID(i)}`), i, ind, 'small');
        changeActiveSlide(document.querySelectorAll(`.slider-ind._${formatProdID(i)}`), ind, 'small');
      });
    });
  }

  document.getElementById('cart-button').addEventListener('click', () => {
    openCart();
  });

  document.getElementById('pd-close-button').addEventListener('click', () => {
    closeProductDetails();
  });

  document.getElementById('cart-close-button').addEventListener('click', () => {
    closeCart();
  });

  document.getElementById('russian-lang').addEventListener('click', () => {
    langNotDefined = false;
    lang = 'ru';
    currRate = rate;
    selectLang();
  });

  document.getElementById('english-lang').addEventListener('click', () => {
    langNotDefined = false;
    lang = 'en';
    currRate = 1;
    selectLang();
  });

  window.onkeydown = function (event) {
    if (event.key === 'Escape') {
      closeProductDetails();
      closeCart();
    }
  }

  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}

function openProductDetails(id) {
  let prodId = formatProdID(id);
  let img = document.getElementById('product-details-img');
  let slider = document.getElementById('product-details-slider');
  let sliders = null;
  let htmlData = '';
  let articles = `\n\n${i18n[lang]['_-title-variations']}: \n\n<div id="product-selection-container"><select id="product-selection-variant">`;

  wOffset = document.getElementById(`product_${prodId}`).offsetTop;
  img.src =`./assets/images/products/large/${prodId}/0001.jpeg`;
  img.alt =`${prodId}_0001`;
  imgInd[id] = 0;

  for (let i = 0; i < productsData[id].images; ++i) {
    htmlData += `
          <div class="product-details-slider-item${i === 0 ? ' active' : ''}">
            <img src="./assets/images/products/small/${prodId}/${formatProdID(i)}.jpeg" alt="${prodId}_${formatProdID(i)}">
          </div>
        `;
  }

  for (let i = 0; i < productsData[id].variation.length; ++i)
    articles += `<option>${prodId}-${String.fromCharCode(65 + i)} - ${productsData[id].variation[i].title[lang]}: $ ${productsData[id].variation[i].price}</option>\n`;

  articles += `
            </select>
            <input type="number" min="1" max="100" value="1" id="product-selection-qnt">
        </div>
        <div id="product-details-cart-buttons">
          <input type="button" value="${i18n[lang]['_-add-to-cart']}" id="add-to-cart">
          <input type="button" value="${i18n[lang]['_-go-to-cart']}" id="go-to-cart">
        </div>
        `;

  slider.innerHTML = htmlData;

  document.getElementById('product-details-header').innerHTML = productsData[id].title[lang];
  document.getElementById('product-details-description-container').innerHTML = (productsData[id].description[lang] + articles).replaceAll('\n', '<br />');

  sliders = document.querySelectorAll('.product-details-slider-item');

  sliders.forEach((s, ind) => {
    s.addEventListener('click', () => {
      imgInd[id] = ind;
      changeImg(img, id, ind, 'large');
      changeActiveSlide(sliders, ind);
    });
  });

  document.getElementById('product-details-container-img-button-next').addEventListener('click', () => {
    nextImg(id);
    changeImg(img, id, imgInd[id], 'large');
    changeActiveSlide(sliders, imgInd[id]);
  });
  document.getElementById('product-details-container-img-button-prev').addEventListener('click', () => {
    prevImg(id);
    changeImg(img, id, imgInd[id], 'large');
    changeActiveSlide(sliders, imgInd[id]);
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    let id = parseInt(document.getElementById('product-selection-variant').value.substring(0,4)) - 1;
    let variant = document.getElementById('product-selection-variant').value.substring(5,6).charCodeAt(0) - 65;
    let qnt = Number.parseInt(document.getElementById('product-selection-qnt').value);
    addToCart(id, variant, qnt);
  });

  document.getElementById('go-to-cart').addEventListener('click', () => {
    openCart();
  });

  document.getElementById('page').classList.add('hidden');
  document.getElementById('product-details').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function closeProductDetails() {
  document.getElementById('product-details').classList.add('hidden');
  document.getElementById('page').classList.remove('hidden');
  window.scrollTo(0, wOffset - dOffset - 20);
}

function addToCart(id, variant, qnt) {
  let notFound = true;

  for (let i = 0; i < cart.length; ++i) {
    if ((cart[i][0] == id) && (cart[i][1] == variant)) {
      notFound = false;
      cart[i][2] = Number.parseInt(cart[i][2]) + Number.parseInt(qnt);
      break;
    }
  }

  if (notFound)
    cart.push([id, variant, qnt]);
}

function getCartItemDetails(i) {
  let id = Number.parseInt(cart[i][0]);
  let variation = Number.parseInt(cart[i][1]);
  let qnt = Number.parseInt(cart[i][2]);
  let price = productsData[id].variation[variation].price;
  let weight = productsData[id].weight;

  return {'id': id, 'variation': variation, 'qnt': qnt, 'price': price, 'weight': weight};
}

function updateOrderDetails() {
  let item;
  orderDetails = '';

  for (let i = 0; i < cart.length; ++i) {
    item = getCartItemDetails(i);
    orderDetails += `${formatProdID(item.id)}-${String.fromCharCode(65 + i)} - ${productsData[item.id].variation[item.variation].title[lang]}, ${productsData[item.id].title['en']}, ${productsData[item.id].variation[item.variation].title['en']} - ${item.qnt} pcs\n`;
  }

  document.getElementById('client-order-details').innerHTML = orderDetails;
}

function updateCart() {
  let cartHTMLData = '';
  let item;

  totalProductsCost = 0;
  totalProductsWeight = 0;
  orderDetails = '';

  for (let i = 0; i < cart.length; ++i) {
    item = getCartItemDetails(i);
    totalProductsCost += item.qnt * Number(item.price);
    totalProductsWeight += item.qnt * item.weight;

    cartHTMLData +=
        `<div class="cart-row" id="cart-list-${i}">
         <div><img src="./assets/images/products/small/${formatProdID(item.id)}/0001.jpeg" alt="prod_${formatProdID(item.id)}"></div>
         <div>${productsData[item.id].title[lang]}</div>
         <div>${productsData[item.id].variation[item.variation].title[lang]}</div>
         <div class="cart-row-button" id="cart-list-${i}-minus">-</div>
         <div id="cart-list-${i}-qnt">${item.qnt}</div>
         <div class="cart-row-button" id="cart-list-${i}-plus">+</div>
         <div>$${item.price}</div>
         <div id="cart-list-${i}-sum">₽${item.price * item.qnt}</div>
         <div class="cart-row-button" id="cart-list-${i}-delete">x</div>
       </div>`
  }

  document.getElementById('cart-products-list').innerHTML = cartHTMLData;

  updateOrderDetails();
  updateShippingCost();
  updateCartTotals();

  document.getElementById('client-country').addEventListener('change', () => {
    updateShippingCost();
    updateCartTotals();
  });

  for (let i = 0; i < cart.length; ++i) {
    document.getElementById(`cart-list-${i}-minus`).addEventListener('click', () => {
      decQnt(i);
      updateOrderDetails();
      updateShippingCost();
      updateCartTotals();
    });

    document.getElementById(`cart-list-${i}-plus`).addEventListener('click', () => {
      incQnt(i);
      updateOrderDetails();
      updateShippingCost();
      updateCartTotals();
    });

    document.getElementById(`cart-list-${i}-delete`).addEventListener('click', () => {
      deleteFromCart(i);
    });
  }
}

function checkRequiredData() {
  let requiredData = document.querySelectorAll('.required-data');
  let filled = true;
  let cCode = document.getElementById('client-country').value;

  for (let item of requiredData) {
    if (item.value.length === 0) {
      filled = false;
      break;
    }
  }

  if (filled) {
    document.getElementById('checkout-button').disabled = false;
    document.getElementById('checkout-warning').style.visibility = 'hidden';
    document.getElementById('checkout-message').style.visibility = 'visible';
  } else {
    document.getElementById('checkout-button').disabled = true;
    document.getElementById('checkout-warning').style.visibility = 'visible';
    document.getElementById('checkout-message').style.visibility = 'hidden';
  }

  if (cCode !== "")
    document.getElementById('client-country-name').value = shippingData[cCode].description['en'];

}

function showCart() {
  document.getElementById('page').classList.add('hidden');
  document.getElementById('product-details').classList.add('hidden');
  document.getElementById('cart').classList.remove('hidden');

  window.scrollTo(0, 0);
}

function openCart() {
  let countryHTMLData = `<option id="title-client-country" value="">${i18n[lang]['_-client-country']}</option>`;

  updateCart();

  for (let cc of Object.keys(shippingData))
    countryHTMLData += `<option value="${cc}">${shippingData[cc].description[lang]}</option>`

  document.getElementById('client-country').innerHTML = countryHTMLData;
  document.getElementById('client-country').value = localStorage.getItem('_mapletoys_cd_client-country_');

  checkRequiredData();

  for (let item of document.querySelectorAll('.required-data')) {
    item.addEventListener('input', () => {
      checkRequiredData();
    });
  }

  showCart();
}

function closeCart() {
  document.getElementById('cart').classList.add('hidden');
  document.getElementById('page').classList.remove('hidden');
  localStorage.setItem('_mapletoys_cd_client-country_',document.getElementById('client-country').value);
  window.scrollTo(0, wOffset - dOffset - 20);
}

function updateShippingCost() {
  let country = document.getElementById('client-country').value;
  let base = 0;
  let add = 0;

  totalShippingCost = 0;

  if (totalProductsWeight !== 0) {
    if (country.length !== 0) {
      if (shippingData[country].pkg.base == null) {
        base = shippingDataDefault.pkg.base.cost;
        add = shippingDataDefault.pkg.add.cost;
      } else {
        base = shippingData[country].pkg.base;
        add = shippingData[country].pkg.add;
      }

      if (totalProductsWeight < shippingDataDefault.parcel.base.weight)
        totalShippingCost = base + Math.ceil((totalProductsWeight - shippingDataDefault.pkg.base.weight) / shippingDataDefault.pkg.add.weight) * add;
      else
        totalShippingCost = Math.min(
            base + Math.ceil((totalProductsWeight - shippingDataDefault.pkg.base.weight) / shippingDataDefault.pkg.add.weight) * add,
            shippingData[country].parcel.base + parcelFee + Math.ceil((totalProductsWeight - shippingDataDefault.parcel.base.weight) / shippingDataDefault.parcel.add.weight) * shippingData[country].parcel.add
        );
    }
  }

  totalShippingCost = totalShippingCost == 0 ? 0 : Math.ceil(totalShippingCost + Number(totalProductsCost) * insurance);
}

function updateCartTotals() {
  document.getElementById('cart-subtotal').innerHTML = `$${totalProductsCost}`;
  document.getElementById('checkout-products-total').innerHTML =`${i18n[lang]['inner-checkout-products-total']}: $${totalProductsCost}`;
  document.getElementById('checkout-shipping-total').innerHTML = `${i18n[lang]['inner-checkout-shipping-total']}: $${totalShippingCost}`;
  document.getElementById('checkout-grand-total').innerHTML = `${i18n[lang]['inner-checkout-grand-total']}: $${Number(totalProductsCost) + totalShippingCost}`;
  document.getElementById('client-order-summary').innerHTML = `Products: ₽${totalProductsCost}\nShipping: $${totalShippingCost}\nTotal: $${totalProductsCost + totalShippingCost}\n`;
}

function decQnt(i) {
  let item = getCartItemDetails(i);

  if (item.qnt > 1) {
    --cart[i][2];
    totalProductsCost -= Number(item.price);
    totalProductsWeight -= item.weight;
    document.getElementById(`cart-list-${i}-qnt`).innerHTML = cart[i][2];
    document.getElementById(`cart-list-${i}-sum`).innerHTML = `$${cart[i][2] * item.price}`;
  }
}

function incQnt(i) {
  let item = getCartItemDetails(i);

  if (item.qnt < 100) {
    ++cart[i][2];
    totalProductsCost += Number(item.price);
    totalProductsWeight += item.weight;
    document.getElementById(`cart-list-${i}-qnt`).innerHTML = cart[i][2];
    document.getElementById(`cart-list-${i}-sum`).innerHTML = `$${cart[i][2] * item.price}`;
  }
}

function deleteFromCart(i) {
  cart.splice(i,1);
  updateCart();
}

function selectLang() {
  let objType = '';
  let item;
  let id;

  if (langNotDefined) {
    if (navigator.language === 'ru-RU')
      lang = 'ru';
    else
      lang = 'en';
  }

  for (let k of document.querySelectorAll('.open-button')) {
    k.innerHTML = i18n[lang]['_-open-button'];
  }

  for (let i = 0; i < productsData.length; ++i)
    document.getElementById(`product-title-${i}`).innerHTML = productsData[i].title[lang];

  for (let k of Object.keys(i18n['en'])) {

    objType = k.split('-')[0];
    id = k.split('-').slice(1).join('-');

    item = document.getElementById(id);

    if (item !== null) {
      switch (objType) {
        case 'inner':
          document.getElementById(id).innerHTML = i18n[lang][k];
          break;
        case 'placeholder':
          document.getElementById(id).placeholder = i18n[lang][k];
          break;
      }
    }
  }
}

function restoreClientData() {
  let tmp;
  for (let i of document.querySelectorAll('.required-data')) {
    tmp = localStorage.getItem(`_mapletoys_cd_${i.id}_`);
    i.value = tmp;
  }
}

async function getCurrRates() {
  /*
  const defaultRate = 78.325046;
  const url= 'https://free.currconv.com/api/v7/convert?q=USD_RUB&compact=ultra&apiKey=51b2113ea5debb11e9c1';
  const res = await fetch(url);

  if (res.status !== 200)
    return defaultRate;

  const data = await res.json();

   */

 return data['USD_RUB'];
}

parseProducts();
selectLang();
addEvents();
restoreClientData();