// Product Grid, Detail, Listing, Checkout, SPA Router

function renderProductGrid(container, filterFn, limit) {
  var list = products;
  if (typeof filterFn === 'function') list = list.filter(filterFn);
  if (limit) list = list.slice(0, limit);
  container.innerHTML = list.map(function(p) {
    var liked = wishlist.includes(p.id);
    var discHtml = p.discount ? '<span class="discount-badge">' + p.discount + '</span>' : '';
    var origHtml = p.original ? '<span class="original">$' + fmoney(p.original) + '</span>' : '';
    var couponHtml = p.coupon ? '<div class="coupon">Coupon available</div>' : '';
    var nameLink = p.link ? '<a href="' + p.link + '" target="_blank" rel="noopener" class="name" onclick="event.stopPropagation()" title="View on official site">' + p.name + ' &#8599;</a>' : '<a href="?page=product&amp;id=' + p.id + '" onclick="event.preventDefault();navigate(\'product\',{id:' + p.id + '})" class="name">' + p.name + '</a>';
    var imgLink = p.link ? '<a href="' + p.link + '" target="_blank" rel="noopener" onclick="event.stopPropagation()"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></a>' : '<a href="?page=product&amp;id=' + p.id + '" onclick="event.preventDefault();navigate(\'product\',{id:' + p.id + '})"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></a>';
    return '<div class="product-card"><div class="img-wrap">' + imgLink + discHtml + '<button class="wishlist-btn ' + (liked ? 'liked' : '') + '" onclick="event.preventDefault();event.stopPropagation();toggleWishlist(' + p.id + ');this.classList.toggle(\'liked\');this.textContent=this.classList.contains(\'liked\')?\'&#9829;\':\'&#9825;\'">' + (liked ? '&#9829;' : '&#9825;') + '</button><button class="quick-add" onclick="event.preventDefault();event.stopPropagation();addToCart(' + p.id + ');var t=this;t.classList.add(\'added\');setTimeout(function(){t.classList.remove(\'added\')},600)" title="Add to Cart">+</button></div><div class="info"><div class="brand">' + p.brand + '</div>' + nameLink + '<div class="pricing"><span class="price">$' + fmoney(p.price) + '</span>' + origHtml + '</div>' + couponHtml + '</div></div>';
  }).join('');
}

// ---- Product Detail ----
function renderProductDetail(id) {
  var p = findProduct(parseInt(id));
  if (!p) return '<div class="container" style="padding:60px 0;text-align:center"><h2>Product not found</h2></div>';
  var saved = p.original ? p.original - p.price : 0;
  var savedPct = p.original ? Math.round(saved / p.original * 100) : 0;
  var catName = p.cat.charAt(0).toUpperCase() + p.cat.slice(1);
  var isLiked = wishlist.includes(p.id);
  var officialLinkHtml = p.link ? '<a href="' + p.link + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-bottom:12px;display:inline-flex">View on Official Site &#8599;</a>' : '';
  return '<div class="container"><div class="breadcrumb"><a href="?page=home" onclick="event.preventDefault();navigate(\'home\')">Home</a><span>/</span><a href="?page=listing&amp;cat=' + p.cat + '" onclick="event.preventDefault();navigate(\'listing\',{cat:\'' + p.cat + '\'})">' + catName + '</a><span>/</span>' + p.brand + ' ' + p.name.slice(0, 40) + '...</div><div class="product-detail"><div class="product-gallery"><div class="main-img"><img src="' + p.img + '" alt="' + p.name + '" id="detail-main-img"></div><div class="thumb-list"><div class="thumb active" onclick="document.getElementById(\'detail-main-img\').src=\'' + p.img + '\'"><img src="' + p.img + '" alt=""></div></div></div><div class="product-info"><a href="?page=listing&amp;cat=' + p.cat + '" class="brand-link">' + p.brand + '</a><h1>' + p.name + '</h1>' + officialLinkHtml + '<div class="reviews"><span class="stars">★★★★★</span><span>4.8 (' + (Math.floor(Math.random() * 200) + 50) + ' reviews)</span></div><div class="product-price-block"><span class="current">$' + fmoney(p.price) + '</span>' + (p.original ? '<span class="was">$' + fmoney(p.original) + '</span>' : '') + (savedPct ? '<span class="saved">Save ' + savedPct + '% ($' + fmoney(saved) + ')</span>' : '') + (p.coupon ? '<div class="coupon-banner">Coupon available - extra savings at checkout</div>' : '') + '</div><div class="product-options"><label>Condition</label><select><option>New with tags</option><option>New without tags</option></select></div><div class="product-actions"><div class="qty-select"><button onclick="var s=this.nextElementSibling;s.textContent=Math.max(1,+s.textContent-1)">-</button><span>1</span><button onclick="this.previousElementSibling.textContent=+this.previousElementSibling.textContent+1">+</button></div><button class="btn btn-red btn-lg" onclick="var q=+this.parentElement.querySelector(\'span\').textContent;addToCart(' + p.id + ',q);openCart()">Add to Cart</button><button class="btn btn-outline btn-lg" onclick="toggleWishlist(' + p.id + ');var s=this.querySelector(\'span\');s.textContent=wishlist.includes(' + p.id + ')?\'Saved\':\'Save\'">&#9825; <span>' + (isLiked ? 'Saved' : 'Save') + '</span></button></div><div class="product-meta"><div class="meta-row"><span class="meta-icon">&#10003;</span> 100% Authentic - Guaranteed genuine</div><div class="meta-row"><span class="meta-icon">&#128737;</span> JOXOZP Warranty - Auto registered</div><div class="meta-row"><span class="meta-icon">&#8634;</span> Free 30-Day Returns</div><div class="meta-row"><span class="meta-icon">&#128666;</span> Free Shipping over $99</div></div></div></div><div class="tabs-section"><div class="tab-nav"><button class="active" onclick="switchTab(this,\'desc\')">Description</button><button onclick="switchTab(this,\'shipping\')">Shipping &amp; Returns</button><button onclick="switchTab(this,\'auth\')">Authenticity</button></div><div class="tab-panel active" id="tab-desc"><p>Experience luxury craftsmanship with this ' + p.brand + ' piece. Every detail engineered for precision and elegance.</p><p><strong>Features:</strong></p><ul><li>Premium materials from the finest suppliers</li><li>100% authentic - verified by expert team</li><li>Original packaging and documentation included</li></ul></div><div class="tab-panel" id="tab-shipping"><p><strong>Shipping:</strong> Free standard shipping over $99. Orders ship in 1-3 business days.</p><p><strong>Returns:</strong> 30-day free returns. Items must be in original condition.</p></div><div class="tab-panel" id="tab-auth"><p>Every JOXOZP product undergoes rigorous inspection by expert authenticators.</p><p><strong>100% Authenticity Guarantee</strong> - full refund if any item is counterfeit.</p></div></div></div>';
}

function switchTab(btn, tabId) {
  var tabs = btn.parentElement.querySelectorAll('button');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  btn.classList.add('active');
  var panels = btn.closest('.tabs-section').querySelectorAll('.tab-panel');
  for (var j = 0; j < panels.length; j++) panels[j].classList.remove('active');
  document.getElementById('tab-' + tabId).classList.add('active');
}

// ---- Checkout ----
function renderCheckout() {
  if (cart.length === 0) return '<div class="container" style="padding:80px 0;text-align:center"><h2>Your cart is empty</h2><p style="color:#999;margin-bottom:20px">Add luxury items to get started.</p><a href="?page=home" class="btn btn-primary" onclick="event.preventDefault();navigate(\'home\')">Continue Shopping</a></div>';
  var total = getCartTotal();
  var shipping = total >= 99 ? 0 : 9.99;
  var tax = total * 0.08;
  var grand = total + shipping + tax;
  var itemsHtml = cart.map(function(item) {
    var p = findProduct(item.id); if (!p) return '';
    return '<div class="summary-item"><img src="' + p.img + '" alt=""><div class="si-info"><div class="si-name">' + p.brand + ' - ' + p.name.slice(0, 30) + '...</div><div style="font-size:0.75rem;color:#999">Qty: ' + item.qty + '</div><div class="si-price">$' + fmoney(p.price * item.qty) + '</div></div></div>';
  }).join('');
  return '<div class="container checkout-page"><h1 class="section-title">Checkout</h1><div class="checkout-grid"><div class="checkout-form"><h3 style="font-size:1.05rem;margin-bottom:16px">Shipping Information</h3><label>Email</label><input type="email" placeholder="your@email.com" value="customer@joxozp.com"><div class="form-row"><div><label>First Name</label><input type="text" placeholder="John" value="John"></div><div><label>Last Name</label><input type="text" placeholder="Doe" value="Doe"></div></div><label>Address</label><input type="text" placeholder="123 Main Street" value="123 Luxury Lane"><div class="form-row three"><div><label>City</label><input type="text" placeholder="New York" value="New York"></div><div><label>State</label><select><option>NY</option><option>CA</option><option>TX</option><option>FL</option></select></div><div><label>ZIP</label><input type="text" placeholder="10001" value="10001"></div></div><label>Phone</label><input type="tel" placeholder="(555) 123-4567" value="(555) 123-4567"><h3 style="font-size:1.05rem;margin:28px 0 16px">Payment Method</h3><div class="payment-methods"><label class="pm-option selected" onclick="selectPayment(this)"><input type="radio" name="payment" checked hidden><span class="pm-icon">&#128179;</span><div><div class="pm-label">Credit / Debit Card</div><div class="pm-desc">Visa, Mastercard, Amex, Discover</div></div></label><label class="pm-option" onclick="selectPayment(this)"><input type="radio" name="payment" hidden><span class="pm-icon">&#127975;</span><div><div class="pm-label">PayPal</div><div class="pm-desc">Pay with your PayPal account</div></div></label><label class="pm-option" onclick="selectPayment(this)"><input type="radio" name="payment" hidden><span class="pm-icon">&#127822;</span><div><div class="pm-label">Apple Pay</div><div class="pm-desc">Fast checkout with Apple Pay</div></div></label><label class="pm-option" onclick="selectPayment(this)"><input type="radio" name="payment" hidden><span class="pm-icon">&#128241;</span><div><div class="pm-label">Google Pay</div><div class="pm-desc">Pay with Google</div></div></label></div><h3 style="font-size:1.05rem;margin:28px 0 16px">Card Details</h3><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" value="4242 4242 4242 4242"><div class="form-row three"><div><label>Expiry</label><input type="text" placeholder="MM/YY" value="12/28"></div><div><label>CVC</label><input type="text" placeholder="123" value="123"></div></div><button class="btn btn-red btn-lg btn-block" style="margin-top:24px" onclick="placeOrder()">Place Order - $' + fmoney(grand) + '</button></div><div class="order-summary"><h3>Order Summary</h3>' + itemsHtml + '<div class="summary-totals"><div class="row"><span>Subtotal</span><span>$' + fmoney(total) + '</span></div><div class="row"><span>Shipping</span><span>' + (shipping === 0 ? '<span style="color:#0a8043">FREE</span>' : '$' + shipping.toFixed(2)) + '</span></div><div class="row"><span>Tax (est.)</span><span>$' + tax.toFixed(2) + '</span></div><div class="row total"><span>Total</span><span>$' + fmoney(grand) + '</span></div></div></div></div></div>';
}

function selectPayment(el) {
  var all = el.parentElement.querySelectorAll('.pm-option');
  for (var i = 0; i < all.length; i++) all[i].classList.remove('selected');
  el.classList.add('selected');
}

function placeOrder() {
  var total = getCartTotal();
  var shipping = total >= 99 ? 0 : 9.99;
  var grand = total + shipping + total * 0.08;
  if (!confirm('Confirm your order of $' + fmoney(grand) + '?')) return;
  showToast('Order placed! Confirmation #JOX-' + Date.now().toString(36).toUpperCase(), 'success');
  cart = []; saveCart(); closeCart(); navigate('home');
}

// ---- SPA Router ----
function navigate(page, params) {
  params = params || {};
  var qs = Object.keys(params).map(function(k) { return k + '=' + encodeURIComponent(params[k]); }).join('&amp;');
  history.pushState({ page: page, params: params }, '', '?' + (qs ? 'page=' + page + '&amp;' + qs : 'page=' + page));
  renderPage(page, params);
  window.scrollTo(0, 0);
}

function renderPage(page, params) {
  params = params || {};
  var main = document.querySelector('main');
  switch (page) {
    case 'home': renderHome(); break;
    case 'product': main.innerHTML = renderProductDetail(params.id); break;
    case 'listing':
      main.innerHTML = renderListing(params.cat || 'watches');
      setTimeout(function() {
        var g = document.getElementById('listing-grid');
        if (g) renderProductGrid(g, function(p) { return !params.cat || p.cat === params.cat; });
      }, 0);
      break;
    case 'checkout': main.innerHTML = renderCheckout(); break;
    case 'cart': openCart(); renderHome(); break;
    default: renderHome();
  }
  updateCartUI();
  setTimeout(function() {
    [].forEach.call(document.querySelectorAll('.fade-up'), function(el) {
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { entries[0].target.classList.add('visible'); obs.unobserve(entries[0].target); }
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }, 100);
}

function renderListing(cat) {
  var catName = cat.charAt(0).toUpperCase() + cat.slice(1);
  var count = products.filter(function(p) { return p.cat === cat; }).length;
  return '<div class="container listing-page"><div class="breadcrumb"><a href="?page=home" onclick="event.preventDefault();navigate(\'home\')">Home</a><span>/</span>' + catName + '</div><div class="listing-header"><div><h1>' + catName + '</h1><span class="count">' + count + ' products</span></div><div class="listing-toolbar"><select onchange="renderProductGrid(document.getElementById(\'listing-grid\'),function(p){return p.cat===\'' + cat + '\'})"><option>Best Match</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Discount: High to Low</option></select></div></div><div class="product-grid" id="listing-grid"></div></div>';
}
