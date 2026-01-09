const products = [
  {id:1,name:'Bukiet ze świec',price:29, img:'images/bukiet.jpg'},
  {id:2,name:'Bukiet box',price:35, img:'images/green_box.jpg'},
];

function $(sel){return document.querySelector(sel)}

function loadCart(){
  return JSON.parse(localStorage.getItem('cart')||'[]');
}

function saveCart(cart){
  localStorage.setItem('cart',JSON.stringify(cart));
}

function addToCart(id){
  const cart = loadCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({id,qty:1});
  saveCart(cart);
  updateCartCount();
}

function removeFromCart(id){
  let cart = loadCart();
  cart = cart.filter(i=>i.id!==id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function clearCart(){
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();
}

function updateCartCount(){
  const cart = loadCart();
  const count = cart.reduce((s,i)=>s+i.qty,0);
  $('#cart-count').textContent = count;
}

function renderProducts(){
  const root = $('#products');
  root.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price} PLN</p>
      <div class="actions">
        <button class="add">Dodaj do koszyka</button>
      </div>
    `;
    el.querySelector('.add').addEventListener('click',()=>addToCart(p.id));
    root.appendChild(el);
  });
}

function renderCart(){
  const container = $('#cart-contents');
  const cart = loadCart();
  if(cart.length===0){
    container.innerHTML = '<p>Koszyk jest pusty.</p>';
    return;
  }
  container.innerHTML = '';
  cart.forEach(ci=>{
    const prod = products.find(p=>p.id===ci.id);
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <div style="flex:1">
        <strong>${prod.name}</strong>
        <div>${ci.qty} × ${prod.price} PLN</div>
      </div>
      <div>
        <button class="remove">Usuń</button>
      </div>
    `;
    el.querySelector('.remove').addEventListener('click',()=>removeFromCart(ci.id));
    container.appendChild(el);
  });
}

function showCartToggle(){
  const cartEl = $('#cart');
  cartEl.classList.toggle('hidden');
  if(!cartEl.classList.contains('hidden')) renderCart();
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  updateCartCount();
  $('#cart-button').addEventListener('click',showCartToggle);
  $('#clear-cart').addEventListener('click',clearCart);
});
