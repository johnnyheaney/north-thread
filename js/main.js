/* North Thread – sample storefront behaviour. Basket lives in this browser only; nothing is sent anywhere. */
(function () {
  /* Control style preview: ?ui=a|b|c switches the button style and remembers it in this browser */
  try {
    const ui = new URLSearchParams(location.search).get("ui");
    if (/^[abc]$/.test(ui || "")) localStorage.setItem("nt-ui", ui);
    const saved = localStorage.getItem("nt-ui");
    if (saved) document.documentElement.className = "ui-" + saved;
  } catch (e) {}
  const FREE_OVER = 75, DELIVERY = 3.95, KEY = "nt-basket";
  const byId = id => NT_PRODUCTS.find(p => p.id === id);

  /* ---------- Basket (localStorage, with in-memory fallback) ---------- */
  let memory = [];
  const basket = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return memory; } },
    set(items) { memory = items; try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} updateCount(); },
    add(id, size, colour, qty) {
      const items = basket.get();
      const hit = items.find(i => i.id === id && i.size === size && i.colour === colour);
      if (hit) hit.qty = Math.min(hit.qty + qty, 9); else items.push({ id, size, colour, qty });
      basket.set(items);
    },
    count() { return basket.get().reduce((n, i) => n + i.qty, 0); },
    subtotal() { return basket.get().reduce((s, i) => s + (byId(i.id) ? byId(i.id).price * i.qty : 0), 0); }
  };

  function updateCount() {
    document.querySelectorAll(".basket-count").forEach(el => { el.textContent = basket.count(); });
  }

  /* ---------- Nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- Toast ---------- */
  function toast(html) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.innerHTML = html;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 4000);
  }

  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  function card(p) {
    return `<a class="card" href="product.html?id=${p.id}">${ntImage(p, 0, true, { hover: true })}
      <h3>${esc(p.name)} <span class="tag-sample">Sample</span></h3>
      <div class="price">${ntMoney(p.price)}</div>
      <div class="swatches" aria-label="${p.colours.length} colours">${p.colours.map(c => `<span class="dot" style="background:${c[1]}" title="${c[0]}"></span>`).join("")}</div></a>`;
  }

  /* ---------- Home ---------- */
  const featured = document.getElementById("featured");
  if (featured) featured.innerHTML = ["fell-crew", "tarn-cardigan", "harbour-chore", "watch-beanie"].map(id => card(byId(id))).join("");

  /* Newsletter (sample: not connected, says so rather than faking success) */
  const news = document.getElementById("news-form");
  if (news) news.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("news-msg").textContent = "This is a sample site, so sign-up isn't connected. Nothing was sent or saved.";
  });

  /* ---------- Shop ---------- */
  const shopGrid = document.getElementById("shop-grid");
  if (shopGrid) {
    const form = document.getElementById("filters");
    const params = new URLSearchParams(location.search);
    if (params.get("cat")) {
      const box = form.querySelector(`input[name="cat"][value="${CSS.escape(params.get("cat"))}"]`);
      if (box) box.checked = true;
    }
    const priceOut = document.getElementById("price-out");
    const render = () => {
      const cats = [...form.querySelectorAll('input[name="cat"]:checked')].map(i => i.value);
      const sizes = [...form.querySelectorAll('input[name="size"]:checked')].map(i => i.value);
      const max = +form.price.value;
      priceOut.textContent = ntMoney(max);
      let list = NT_PRODUCTS.filter(p =>
        (!cats.length || cats.includes(p.cat)) &&
        (!sizes.length || sizes.some(s => p.sizes.includes(s) && !p.soldOut.includes(s))) &&
        p.price <= max);
      const sort = document.getElementById("sort").value;
      if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
      document.getElementById("result-count").textContent = `${list.length} sample product${list.length === 1 ? "" : "s"}`;
      shopGrid.innerHTML = list.length ? list.map(card).join("")
        : `<div class="empty" style="grid-column:1/-1"><p>Nothing matches those filters.</p><button type="button" class="btn btn-ghost" id="clear2">Clear filters</button></div>`;
      const c2 = document.getElementById("clear2");
      if (c2) c2.addEventListener("click", clear);
    };
    const clear = () => { form.reset(); history.replaceState(null, "", "shop.html"); render(); };
    form.addEventListener("input", render);
    document.getElementById("sort").addEventListener("change", render);
    document.getElementById("clear").addEventListener("click", clear);
    render();
  }

  /* ---------- Product ---------- */
  const pdp = document.getElementById("pdp");
  if (pdp) {
    const p = byId(new URLSearchParams(location.search).get("id")) || NT_PRODUCTS[0];
    document.title = `${p.name} (sample) | North Thread`;
    document.getElementById("crumb-name").textContent = p.name;
    const media = document.getElementById("pdp-media");
    const details = document.getElementById("pdp-details");
    /* Colourway thumbnails (click to switch) plus a credit line for the stock photo */
    const showDetails = i => {
      details.innerHTML = (p.colours.length > 1 ? `<div class="pdp-thumbs">${p.colours.map((c, n) =>
        `<button type="button" class="thumb${n === i ? " on" : ""}" data-c="${n}" aria-label="Show ${esc(c[0])}" aria-pressed="${n === i}"><img src="${ntSrc(p, n, true)}" alt="" width="500" height="625" loading="lazy"></button>`).join("")}</div>` : "")
        + `<p class="photo-credit">${ntCredit(p, i)}</p>`;
    };
    details.addEventListener("click", e => {
      const b = e.target.closest(".thumb"); if (!b) return;
      const r = colourWrap.querySelector(`input[value="${b.dataset.c}"]`); r.checked = true;
      r.dispatchEvent(new Event("change", { bubbles: true }));
    });
    media.innerHTML = ntImage(p, 0, true, { large: true, eager: true });
    showDetails(0);
    document.getElementById("pdp-name").textContent = p.name;
    document.getElementById("pdp-price").textContent = ntMoney(p.price);
    document.getElementById("pdp-blurb").textContent = p.blurb;
    document.getElementById("pdp-fabric").textContent = p.fabric;
    document.getElementById("pdp-fit").textContent = p.fit;

    const colourWrap = document.getElementById("colours");
    colourWrap.innerHTML = p.colours.map((c, i) =>
      `<label class="colour"><input type="radio" name="colour" value="${i}" ${i === 0 ? "checked" : ""}><span style="background:${c[1]}" title="${c[0]}"></span><span class="visually-hidden">${c[0]}</span></label>`).join("");
    const colourName = document.getElementById("colour-name");
    colourName.textContent = p.colours[0][0];
    colourWrap.addEventListener("change", e => {
      const i = +e.target.value;
      colourName.textContent = p.colours[i][0];
      media.innerHTML = ntImage(p, i, true, { large: true, eager: true });
      showDetails(i);
    });

    const sizeWrap = document.getElementById("sizes");
    if (p.sizes.length === 1) sizeWrap.style.gridTemplateColumns = "1fr";
    sizeWrap.innerHTML = p.sizes.map(s => {
      const out = p.soldOut.includes(s);
      return `<label class="size"><input type="radio" name="size" value="${s}" ${out ? "disabled" : ""} ${p.sizes.length === 1 ? "checked" : ""}><span>${s}${out ? '<span class="visually-hidden"> (sold out)</span>' : ""}</span></label>`;
    }).join("");
    if (p.soldOut.length) document.getElementById("soldout-note").textContent = `Sold out in ${p.soldOut.join(", ")} (sample stock).`;

    let qty = 1;
    const qtyOut = document.getElementById("qty");
    document.getElementById("qty-down").addEventListener("click", () => { qty = Math.max(1, qty - 1); qtyOut.textContent = qty; });
    document.getElementById("qty-up").addEventListener("click", () => { qty = Math.min(9, qty + 1); qtyOut.textContent = qty; });

    const msg = document.getElementById("add-msg");
    document.getElementById("add-form").addEventListener("submit", e => {
      e.preventDefault();
      const size = (pdp.querySelector('input[name="size"]:checked') || {}).value;
      if (!size) { msg.className = "form-msg error"; msg.textContent = "Please choose a size."; sizeWrap.querySelector("input:not(:disabled)").focus(); return; }
      const colour = p.colours[+pdp.querySelector('input[name="colour"]:checked').value][0];
      basket.add(p.id, size, colour, qty);
      msg.className = "form-msg ok";
      msg.textContent = `Added ${qty} × ${p.name} (${colour}, ${size}) to your basket.`;
      toast(`<span>Added to basket</span><a href="basket.html">View basket (${basket.count()})</a>`);
    });

    const more = document.getElementById("more");
    more.innerHTML = NT_PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(NT_PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 4).map(card).join("");
  }

  /* ---------- Basket ---------- */
  const lines = document.getElementById("lines");
  if (lines) {
    const render = () => {
      const items = basket.get().filter(i => byId(i.id));
      const sub = basket.subtotal();
      const empty = !items.length;
      document.getElementById("basket-empty").hidden = !empty;
      document.getElementById("basket-full").hidden = empty;
      if (empty) return;
      lines.innerHTML = items.map((i, n) => {
        const p = byId(i.id);
        const ci = Math.max(0, p.colours.findIndex(c => c[0] === i.colour));
        return `<li class="line">${ntImage(p, ci, false)}<div>
          <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a> <span class="tag-sample">Sample</span></h3>
          <div class="meta">${esc(i.colour)} · Size ${esc(i.size)} · ${ntMoney(p.price)} each</div>
          <div class="line-actions">
            <div class="qty" aria-label="Quantity for ${esc(p.name)}">
              <button type="button" data-act="dec" data-n="${n}" aria-label="Decrease quantity">−</button>
              <span>${i.qty}</span>
              <button type="button" data-act="inc" data-n="${n}" aria-label="Increase quantity">+</button>
            </div>
            <strong>${ntMoney(p.price * i.qty)}</strong>
            <button type="button" class="link-btn" data-act="rm" data-n="${n}">Remove</button>
          </div></div></li>`;
      }).join("");
      const del = sub >= FREE_OVER ? 0 : DELIVERY;
      document.getElementById("sum-sub").textContent = ntMoney(sub);
      document.getElementById("sum-del").textContent = del ? ntMoney(del) : "Free";
      document.getElementById("sum-total").textContent = ntMoney(sub + del);
      const left = FREE_OVER - sub;
      document.getElementById("free-msg").textContent = left > 0 ? `Spend ${ntMoney(left)} more for free UK delivery.` : "You've got free UK delivery.";
      document.getElementById("free-bar").style.width = Math.min(100, (sub / FREE_OVER) * 100) + "%";
    };
    lines.addEventListener("click", e => {
      const b = e.target.closest("button[data-act]");
      if (!b) return;
      const items = basket.get().filter(i => byId(i.id));
      const it = items[+b.dataset.n];
      if (b.dataset.act === "inc") it.qty = Math.min(9, it.qty + 1);
      if (b.dataset.act === "dec") it.qty = Math.max(1, it.qty - 1);
      if (b.dataset.act === "rm") items.splice(+b.dataset.n, 1);
      basket.set(items);
      render();
    });
    const dlg = document.getElementById("demo-dialog");
    document.getElementById("checkout").addEventListener("click", () => {
      if (dlg.showModal) dlg.showModal(); else alert("Sample shop: there is no real checkout and no payment is taken.");
    });
    document.getElementById("clear-basket").addEventListener("click", () => { basket.set([]); if (dlg.open) dlg.close(); render(); });
    render();
  }

  /* ---------- Contact (opens the visitor's email app; nothing is sent by this site) ---------- */
  const contact = document.getElementById("contact-form");
  if (contact) {
    contact.addEventListener("submit", e => {
      e.preventDefault();
      const f = contact.elements;
      const status = document.getElementById("contact-status");
      if (!contact.checkValidity()) { contact.reportValidity(); return; }
      const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nOrder number: ${f.order.value || "n/a"}\n\n${f.message.value}`;
      location.href = `mailto:hello@example.com?subject=${encodeURIComponent("[North Thread sample] " + f.topic.value)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should now open with your message ready to send. Nothing has been sent by this site. (Sample: example.com does not receive mail.)";
    });
  }

  updateCount();
})();
