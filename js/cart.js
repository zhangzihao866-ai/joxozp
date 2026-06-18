// Cart state & operations
let cart = JSON.parse(localStorage.getItem('joxozp_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('joxozp_wishlist') || '[]');

function saveCart() { localStorage.setItem('joxozp_cart', JSON.stringify(cart)); updateCartUI(); if (typeof renderCartItems === 'function') renderCartItems(); }
function saveWishlist() { localStorage.setItem('joxozp_wishlist', JSON.stringify(wishlist)); }
function fmoney(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 }); }
function findProduct(id) { return products.find(function(x) { return x.id === id; }); }
function getCartTotal() { return cart.reduce(function(sum, item) { var p = findProduct(item.id); return sum + (p ? p.price * item.qty : 0); }, 0); }
function getCartCount() { return cart.reduce(function(sum, item) { return sum + item.qty; }, 0); }

function addToCart(productId, qty) {
  qty = qty || 1;
  var p = findProduct(productId); if (!p) return;
  var existing = cart.find(function(x) { return x.id === productId; });
  if (existing) existing.qty += qty; else cart.push({ id: productId, qty: qty });
  saveCart(); showToast('Added: ' + p.brand, 'success');
}

function removeFromCart(productId) { cart = cart.filter(function(x) { return x.id !== productId; }); saveCart(); }

function updateQty(productId, delta) {
  var item = cart.find(function(x) { return x.id === productId; }); if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart();
}

function toggleWishlist(productId) {
  var idx = wishlist.indexOf(productId);
  if (idx > -1) wishlist.splice(idx, 1); else wishlist.push(productId);
  saveWishlist();
}

function showToast(msg, type) {
  var t = document.querySelector('.toast'); if (t) t.remove();
  t = document.createElement('div'); t.className = 'toast ' + (type || ''); t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function() { t.classList.add('show'); });
  setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 300); }, 2500);
}

function updateCartUI() {
  var count = getCartCount();
  [].forEach.call(document.querySelectorAll('.badge-count'), function(b) { b.textContent = count; });
  [].forEach.call(document.querySelectorAll('.cart-count-text-num'), function(b) { b.textContent = count + ' item' + (count !== 1 ? 's' : ''); });
  [].forEach.call(document.querySelectorAll('.cart-subtotal'), function(b) { b.textContent = '$' + fmoney(getCartTotal()); });
}
