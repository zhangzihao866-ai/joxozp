// Homepage renderer — all images aligned with content
function renderHome() {
  var main = document.querySelector('main');
  main.innerHTML = '<section class="hero"><div class="hero-bg"><img src="assets/images/rolex/submariner.jpg" alt="Rolex Submariner"></div><div class="container"><div class="hero-content fade-up"><h1>Luxury for Less,<br>Always Authentic</h1><p>Premium watches, designer handbags, and exclusive fragrances at unbeatable prices. Every piece guaranteed genuine.</p><a href="?page=listing&amp;cat=watches" class="btn" onclick="event.preventDefault();navigate(\'listing\',{cat:\'watches\'})">Shop Watches</a><a href="?page=listing&amp;cat=handbags" class="btn" style="background:transparent;color:#fff;border:2px solid #fff;margin-left:12px" onclick="event.preventDefault();navigate(\'listing\',{cat:\'handbags\'})">Shop Handbags</a></div></div></section>' +

  '<section class="categories"><div class="container"><h2 class="section-title">Shop by Category</h2><div class="cat-grid">' +
    '<a href="?page=listing&amp;cat=watches" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'watches\'})"><img src="assets/images/rolex/submariner.jpg" alt="Watches"><div class="cat-overlay"><span>WATCHES</span></div></a>' +
    '<a href="?page=listing&amp;cat=handbags" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'handbags\'})"><img src="assets/images/cat-handbags.jpg" alt="Handbags"><div class="cat-overlay"><span>HANDBAGS</span></div></a>' +
    '<a href="?page=listing&amp;cat=fragrances" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'fragrances\'})"><img src="assets/images/cat-fragrances.jpg" alt="Fragrances"><div class="cat-overlay"><span>FRAGRANCES</span></div></a>' +
    '<a href="?page=listing&amp;cat=sunglasses" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'sunglasses\'})"><img src="assets/images/cat-sunglasses.jpg" alt="Sunglasses"><div class="cat-overlay"><span>SUNGLASSES</span></div></a>' +
    '<a href="?page=listing&amp;cat=jewelry" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'jewelry\'})"><img src="assets/images/cat-jewelry.jpg" alt="Jewelry"><div class="cat-overlay"><span>JEWELRY</span></div></a>' +
    '<a href="?page=listing&amp;cat=shoes" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'shoes\'})"><img src="assets/images/cat-shoes.jpg" alt="Shoes"><div class="cat-overlay"><span>SHOES</span></div></a>' +
    '<a href="?page=listing&amp;cat=fragrances" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'fragrances\'})"><img src="assets/images/cat-beauty.jpg" alt="Beauty"><div class="cat-overlay"><span>BEAUTY</span></div></a>' +
    '<a href="?page=listing&amp;cat=handbags" class="cat-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'handbags\'})"><img src="assets/images/cat-handbags.jpg" alt="Pre-Owned"><div class="cat-overlay"><span>PRE-OWNED</span></div></a>' +
  '</div></div></section>' +

  '<section class="sales-section"><div class="container"><h2 class="section-title">Sales &amp; Events <a href="#" class="view-all">View All</a></h2><div class="sale-grid">' +
    '<a href="?page=listing&amp;cat=watches" class="sale-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'watches\'})"><img src="assets/images/rolex/daydate.jpg" alt="Rolex Day-Date"><div class="sale-info"><h3>Rolex Watches: 60+ Deals Added</h3><span class="pct">Up to 15% Off</span></div></a>' +
    '<a href="?page=listing&amp;cat=fragrances" class="sale-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'fragrances\'})"><img src="assets/images/cat-fragrances.jpg" alt="Creed Fragrances"><div class="sale-info"><h3>Creed + Sospiro: New Arrivals</h3><span class="pct">Up to 60% Off</span></div></a>' +
    '<a href="?page=listing&amp;cat=handbags" class="sale-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'handbags\'})"><img src="assets/images/cat-handbags.jpg" alt="Burberry Handbags"><div class="sale-info"><h3>Burberry Summer Clearance</h3><span class="pct">Up to 90% Off</span></div></a>' +
    '<a href="?page=listing&amp;cat=sunglasses" class="sale-card" onclick="event.preventDefault();navigate(\'listing\',{cat:\'sunglasses\'})"><img src="assets/images/cat-sunglasses.jpg" alt="Gucci Sunglasses"><div class="sale-info"><h3>Gucci: Prices Dropped!</h3><span class="pct">Limited Time</span></div></a>' +
  '</div></div></section>' +

  '<section class="products-section"><div class="container"><h2 class="section-title">Trending Now</h2><div class="product-grid" id="home-trending"></div><div style="text-align:center;margin-top:32px"><a href="?page=listing&amp;cat=watches" class="btn btn-primary" onclick="event.preventDefault();navigate(\'listing\',{cat:\'watches\'})">Shop All Watches</a></div></div></section>' +

  '<section class="brands-section"><div class="container"><h2 class="section-title">Featured Brands</h2><p class="section-sub">Over 500 luxury brands at unbeatable prices</p><div class="brand-grid">' +
    '<a href="#">ROLEX</a><a href="#">OMEGA</a><a href="#">CARTIER</a><a href="#">BREITLING</a>' +
    '<a href="#">TISSOT</a><a href="#">TUDOR</a><a href="#">GUCCI</a><a href="#">PRADA</a>' +
    '<a href="#">BURBERRY</a><a href="#">DIOR</a><a href="#">HERMES</a><a href="#">LONGINES</a>' +
  '</div></div></section>' +

  '<section class="trust-section"><div class="container">' +
    '<div class="trust-item"><div class="ticon">&#10003;</div><h3>100% Authenticity Guaranteed</h3><p>Every product sourced from authorized dealers and verified for authenticity.</p></div>' +
    '<div class="trust-item"><div class="ticon">&#128737;</div><h3>JOXOZP Warranty</h3><p>Automatic warranty registration with every watch purchase. Shop with confidence.</p></div>' +
    '<div class="trust-item"><div class="ticon">&#8634;</div><h3>Fast &amp; Easy Returns</h3><p>Not satisfied? Return within 30 days for a full refund.</p></div>' +
    '<div class="trust-item"><div class="ticon">&#128176;</div><h3>Never Pay Retail</h3><p>Buy what you love at a price you love even more.</p></div>' +
  '</div></section>';

  // Render trending products
  setTimeout(function() {
    var grid = document.getElementById('home-trending');
    if (grid) renderProductGrid(grid, function() { return true; }, 12);
  }, 0);
}
