// Cart Drawer UI
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartItems() {
  var container = document.getElementById('cart-items');
  var empty = document.getElementById('cart-empty');
  var footer = document.getElementById('cart-footer');
  var progress = document.getElementById('shipping-progress');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (footer) footer.style.display = 'none';
    if (progress) progress.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';
  var total = getCartTotal();
  if (progress) {
    progress.style.display = 'block';
    var pct = Math.min(100, (total / 99) * 100);
    document.getElementById('ship-bar-fill').style.width = pct + '%';
    if (total >= 99) {
      document.getElementById('ship-msg').innerHTML = '<span class="free">Free Shipping unlocked!</span>';
    } else {
      document.getElementById('ship-msg').innerHTML = '<span class="away">Add $' + fmoney(99 - total) + ' more for <strong>Free Shipping</strong></span>';
    }
  }
  container.innerHTML = cart.map(function(item) {
    var p = findProduct(item.id); if (!p) return '';
    return '<div class="cart-item"><div class="cart-item-img"><img src="' + p.img + '" alt=""></div><div class="cart-item-info"><div class="brand">' + p.brand + '</div><div class="name">' + p.name + '</div><div class="price">$' + fmoney(p.price * item.qty) + '</div><div class="cart-item-qty"><button onclick="updateQty(' + item.id + ',-1)">-</button><span>' + item.qty + '</span><button onclick="updateQty(' + item.id + ',1)">+</button></div><a class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">Remove</a></div></div>';
  }).join('');
  document.getElementById('cart-subtotal-amt').textContent = '$' + fmoney(total);
  document.getElementById('cart-total-amt').textContent = '$' + fmoney(total);
}
