// NutriKart Marketplace — Demo Checkout
(function(){
  const isCheckout = location.pathname.endsWith('checkout.html');

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(()=> toast.classList.add('hidden'), 2500);
  }

  function sanitizeText(value) {
    return String(value || '').replace(/[<>]/g, '');
  }

  function formatCurrency(num) {
    const n = Number(num||0);
    return `₹${n.toLocaleString('en-IN')}`;
  }

  function getCart() {
    try {
      const raw = sessionStorage.getItem('nk_marketplace_cart');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function setCart(items) {
    sessionStorage.setItem('nk_marketplace_cart', JSON.stringify(items));
  }

  function importFromMainCartIfNeeded() {
    // Import items from Nutri dashboard cart (localStorage) into marketplace cart once per session
    const existing = getCart();
    if (existing && existing.length) return; // keep user's marketplace state
    try {
      const saved = localStorage.getItem('nutriKartData');
      if (!saved) return;
      const parsed = JSON.parse(saved);
      const mainCart = Array.isArray(parsed && parsed.cart) ? parsed.cart : [];
      if (!mainCart.length) return;
      const imported = mainCart.map((i) => ({
        id: i.id || `${i.name}-${i.price}`,
        name: i.name,
        price: Number(i.price||0),
        img: i.img || '',
        qty: Number(i.qty||1)
      }));
      setCart(imported);
    } catch {}
  }

  async function getUserId() {
    try {
      const { data } = await supabase.auth.getUser();
      return data && data.user ? data.user.id : null;
    } catch { return null; }
  }

  // PRODUCTS PAGE
  async function renderProducts() {
    const grid = document.getElementById('product-grid');
    const empty = document.getElementById('products-empty');
    if (!grid) return;

    try {
      // Try products table first, fallback to groceries
      let { data, error } = await supabase.from('products').select('*').limit(100);
      if (error) {
        console.log('Products table not found, using groceries table');
        ({ data, error } = await supabase.from('groceries').select('*').limit(100));
      }
      if (error) throw error;

      grid.innerHTML = '';
      if (!data || data.length === 0) {
        empty && empty.classList.remove('hidden');
        return;
      }
      empty && empty.classList.add('hidden');

      const cart = getCart();
      const cartMap = new Map(cart.map(i => [i.id, i]));

      data.forEach(item => {
        const id = item.id;
        const name = sanitizeText(item.name);
        const price = Number(item.price||0);
        const img = item.img || item.image_url || 'https://img.icons8.com/color/96/000000/package.png';
        const tags = Array.isArray(item.tags) ? item.tags : (()=>{ try { return JSON.parse(item.tags||'[]'); } catch { return []; }})();

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${img}" alt="${name}" />
          <h4>${name}</h4>
          <div class="product-meta">
            <span class="price">${formatCurrency(price)}</span>
          </div>
          <div class="tags">${tags.map(t=>`<span class="tag">${sanitizeText(t)}</span>`).join('')}</div>
          <button class="add-btn">Add to Cart</button>
        `;

        const btn = card.querySelector('.add-btn');
        btn.addEventListener('click', () => {
          const current = getCart();
          const existingIndex = current.findIndex(x => x.id === id);
          if (existingIndex >= 0) {
            current[existingIndex].qty += 1;
          } else {
            current.push({ id, name, price, img, qty: 1 });
          }
          setCart(current);
          updateCartPanel();
          showToast('Added to cart');
        });

        grid.appendChild(card);
      });
    } catch (e) {
      console.error(e);
      showToast('Failed to load products');
    }
  }

  // Function to migrate groceries to products table (run once)
  async function migrateGroceriesToProducts() {
    try {
      const { data: groceries, error } = await supabase.from('groceries').select('*');
      if (error) throw error;
      
      const products = groceries.map(g => ({
        name: g.name,
        price: g.price,
        image_url: g.img,
        tags: g.tags || [],
        category: g.category,
        goal: g.goal,
        protein: g.protein,
        carbs: g.carbs,
        fats: g.fats,
        fiber: g.fiber,
        calories: g.calories
      }));
      
      const { error: insertError } = await supabase.from('products').insert(products);
      if (insertError) throw insertError;
      
      console.log('Successfully migrated groceries to products table');
      showToast('Products table populated from groceries');
    } catch (e) {
      console.error('Migration failed:', e);
      showToast('Migration failed - using groceries table');
    }
  }

  function updateCartPanel() {
    const itemsBox = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!itemsBox) return;

    const cart = getCart();
    itemsBox.innerHTML = '';
    let total = 0, count = 0;
    cart.forEach(item => {
      total += item.qty * item.price;
      count += item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div>${sanitizeText(item.name)}</div>
        <input class="qty-input" type="number" min="1" value="${item.qty}" />
        <div class="price">${formatCurrency(item.price*item.qty)}</div>
        <button class="remove-x" title="Remove">×</button>
      `;
      const qty = row.querySelector('.qty-input');
      qty.addEventListener('input', () => {
        const v = Math.max(1, parseInt(qty.value||'1',10));
        const next = getCart().map(x => x.id === item.id ? { ...x, qty: v } : x);
        setCart(next);
        updateCartPanel();
      });
      const remove = row.querySelector('.remove-x');
      remove.addEventListener('click', () => {
        const next = getCart().filter(x => x.id !== item.id);
        setCart(next);
        updateCartPanel();
      });
      itemsBox.appendChild(row);
    });
    countEl && (countEl.textContent = String(count));
    subtotalEl && (subtotalEl.textContent = formatCurrency(total));
    checkoutBtn && (checkoutBtn.disabled = cart.length === 0);
  }

  function wireCheckoutNav() {
    const btn = document.getElementById('checkout-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      location.href = 'checkout.html';
    });
  }

  // CHECKOUT PAGE
  function loadOrderSummary() {
    const body = document.getElementById('order-items');
    const sub = document.getElementById('order-subtotal');
    if (!body) return { items: [], subtotal: 0 };
    const items = getCart();
    body.innerHTML = '';
    let subtotal = 0;
    items.forEach(i => {
      const tr = document.createElement('tr');
      const line = i.qty * i.price;
      subtotal += line;
      tr.innerHTML = `<td>${sanitizeText(i.name)}</td><td>${i.qty}</td><td>${formatCurrency(i.price)}</td><td>${formatCurrency(line)}</td>`;
      body.appendChild(tr);
    });
    sub && (sub.textContent = formatCurrency(subtotal));
    return { items, subtotal };
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email||'').toLowerCase());
  }

  function wireConfirmPurchase() {
    const form = document.getElementById('billing-form');
    const success = document.getElementById('success-box');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = sanitizeText(form.name.value);
      const email = sanitizeText(form.email.value);
      const address = sanitizeText(form.address.value);
      if (!name || !email || !address) { showToast('Please fill all fields'); return; }
      if (!validEmail(email)) { showToast('Invalid email'); return; }

      const { items, subtotal } = loadOrderSummary();
      if (!items.length) { showToast('Cart is empty'); return; }

      try {
        // Handle user authentication with Supabase v2 syntax and graceful fallback
        let user = null;
        
        try {
          const { data, error: userError } = await supabase.auth.getUser();
          if (!userError && data?.user) {
            user = data.user;
            console.log('Current user:', user);
          }
        } catch (authErr) {
          console.warn('No user session found, continuing in demo mode:', authErr.message);
        }

        // Map existing variables to the required insert shape
        const cart = items;
        const total = subtotal;

        const { data, error } = await supabase.from('orders').insert([
          {
            user_id: user?.id || null,
            order_items: Array.isArray(cart) ? cart : JSON.parse(cart || '[]'),
            total_amount: total,
            is_demo: true,
            billing_name: name,
            billing_email: email,
            billing_address: address
          }
        ]);

        if (error) {
          console.error('Supabase insert error:', error.message);
          alert('❌ Failed to place order: ' + error.message);
          return;
        } else {
          console.log('✅ Order placed successfully:', data);
          alert('✅ Demo order placed successfully!');
        }

        // Preserve existing UI flow on success
        sessionStorage.removeItem('nk_marketplace_cart');
        form.classList.add('hidden');
        success.classList.remove('hidden');
        showToast('Order recorded');
      } catch (err) {
        console.error('Unexpected checkout error:', err);
        alert('❌ Failed to place order: ' + (err && err.message ? err.message : 'Unknown error'));
      }
    });
  }

  // INIT
  window.addEventListener('DOMContentLoaded', async () => {
    if (!isCheckout) {
      importFromMainCartIfNeeded();
      renderProducts();
      updateCartPanel();
      wireCheckoutNav();
      
      // Wire migration button
      const migrateBtn = document.getElementById('migrate-btn');
      if (migrateBtn) {
        migrateBtn.addEventListener('click', async () => {
          migrateBtn.disabled = true;
          migrateBtn.textContent = 'Migrating...';
          await migrateGroceriesToProducts();
          migrateBtn.disabled = false;
          migrateBtn.textContent = 'Migrate Groceries to Products';
          renderProducts(); // Refresh products
        });
      }
    } else {
      loadOrderSummary();
      wireConfirmPurchase();
    }
  });

  // Expose migration function globally for console use
  window.migrateGroceriesToProducts = migrateGroceriesToProducts;
})();


