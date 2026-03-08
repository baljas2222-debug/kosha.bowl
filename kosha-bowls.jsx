import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap');`;

const MENU = {
  "Signature Bowls": [
    { id: 1, name: "Butter Chicken Power Bowl", price: 349, cal: 580, badge: "🌟 Best Seller", desc: "Free-range chicken in a rich tomato-cashew gravy, brown basmati rice, cucumber raita, fresh coriander — no artificial colour, no preservatives", tags: ["High Protein"], emoji: "🍛", color: "#c45c38" },
    { id: 2, name: "Tandoori Paneer Protein Bowl", price: 299, cal: 510, badge: "💪 High Protein", desc: "Hormone-free paneer marinated in yogurt & spices, grilled in a clay oven, served over millets with mint chutney & roasted bell peppers", tags: ["Vegetarian", "High Protein"], emoji: "🧀", color: "#e07b39" },
    { id: 3, name: "Satvik Veg Nourish Bowl", price: 269, cal: 420, badge: "🌿 Staff Pick", desc: "Seasonal organic sabzi, steamed brown rice, raw salad, sprouted moong, lemon tadka — light, satvik and deeply nourishing", tags: ["Vegan", "Gluten-Free"], emoji: "🥗", color: "#4a7c5c" },
    { id: 4, name: "Chickpea & Millet Energy Bowl", price: 279, cal: 490, badge: "⚡ Energy Boost", desc: "Organic kala chana, pearl millet base, roasted sweet potato, tamarind dressing, pomegranate, microgreens — ancient grains, modern nutrition", tags: ["Vegan", "Gluten-Free"], emoji: "🌾", color: "#b87333" },
    { id: 5, name: "Egg Bhurji Protein Bowl", price: 299, cal: 530, badge: "🥚 Power Up", desc: "Farm-fresh desi eggs scrambled with onion, tomato, green chilli & turmeric, served over quinoa with a side of whole wheat roti strips", tags: ["High Protein"], emoji: "🍳", color: "#d4a017" },
  ],
  "Shawarmaz": [
    { id: 6, name: "Chicken Shawarma Roll", price: 249, cal: 460, badge: "🔥 Trending", desc: "Free-range chicken marinated overnight in Lebanese spices, slow-roasted, wrapped in whole wheat pita with garlic yogurt, pickled onions, fresh greens — zero seed oils used", tags: ["High Protein"], emoji: "🌯", color: "#c17f3a" },
    { id: 7, name: "Veg Shawarma Roll", price: 199, cal: 380, badge: "🌱 Fan Fave", desc: "Spiced roasted paneer & chickpeas, whole wheat pita, hummus, shredded purple cabbage, cucumber, tomato, tahini drizzle — flavour without compromise", tags: ["Vegetarian"], emoji: "🥙", color: "#7c5c9a" },
  ],
  "Shorbas (Soups)": [
    { id: 8, name: "Lentil Protein Shorba", price: 149, cal: 210, badge: "✨ Anti-Inflammatory", desc: "Organic masoor dal slow-cooked with cumin, ginger, haldi and black pepper — a gut-healing, protein-rich bowl of warmth. All FSSAI approved ingredients", tags: ["Vegan", "Gluten-Free"], emoji: "🍲", color: "#c0392b" },
    { id: 9, name: "Spinach Garlic Shorba", price: 149, cal: 160, badge: "💚 Detox", desc: "Farm-fresh palak blended with roasted garlic, cold-press olive oil and sea salt — iron-rich, toxin-free, made fresh every morning. No MSG, no fillers", tags: ["Vegan", "Gluten-Free"], emoji: "🥬", color: "#2d6a4f" },
  ],
  "Drinks & Elixirs": [
    { id: 10, name: "Turmeric Golden Milk", price: 129, cal: 110, badge: "✨ Healing", desc: "Organic haldi, black pepper, A2 cow milk, raw honey, cardamom — an ancient Ayurvedic recipe with zero refined sugar", tags: ["Vegetarian"], emoji: "🥛", color: "#f0a500" },
    { id: 11, name: "Beet & Berry Immunity Shot", price: 149, cal: 95, badge: "💜 Antioxidant", desc: "Cold-pressed organic beetroot, amla, wild berries, ginger — no preservatives, no added sugar, bottled same day", tags: ["Vegan", "Raw+"], emoji: "🫐", color: "#8e44ad" },
    { id: 12, name: "Pressed Green Detox Juice", price: 159, cal: 80, badge: "🌿 Cold Press", desc: "Cucumber, celery, spinach, green apple, ginger, nimbu — cold pressed daily, zero heat treatment to preserve live enzymes", tags: ["Vegan", "Raw+"], emoji: "🥒", color: "#27ae60" },
  ],
};

const TAG_COLORS = {
  "Vegan": { bg: "#e8f5e9", color: "#2d6a4f" },
  "Gluten-Free": { bg: "#fff3e0", color: "#a04000" },
  "High Protein": { bg: "#fce4ec", color: "#880e4f" },
  "Vegetarian": { bg: "#f1f8e9", color: "#33691e" },
  "Raw+": { bg: "#e0f2f1", color: "#00695c" },
};

const INGREDIENTS = [
  "Cold-Press Mustard Oil", "A2 Desi Cow Dairy", "Organic Basmati Rice", "Stone-Ground Whole Wheat",
  "Farm-Fresh Desi Eggs", "Free-Range Chicken", "Organic Masoor Dal", "Hormone-Free Paneer",
  "Himalayan Pink Salt", "Raw Forest Honey", "Organic Turmeric", "Virgin Coconut Oil",
  "Sprouted Legumes", "Ancient Millets", "Cold-Press Olive Oil", "No MSG · No Maida · No Seed Oils",
];

export default function KoshaBowls() {
  const [activeSection, setActiveSection] = useState("Signature Bowls");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [activePage, setActivePage] = useState("home");

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setNotification(`🌿 ${item.name} added!`);
    setTimeout(() => setNotification(""), 2000);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    setCartOpen(false);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: "#faf8f3", minHeight: "100vh", color: "#2c2c2c" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #faf8f3; }
        ::-webkit-scrollbar-thumb { background: #4a7c5c; border-radius: 10px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes leafFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(8deg); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(74,124,92,0.18) !important; }
        .btn-green { background: #4a7c5c; color: white; border: none; padding: 14px 32px; border-radius: 50px; cursor: pointer; font-family: 'Lato',sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.5px; transition: all 0.25s; }
        .btn-green:hover { background: #3a6a4c; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(74,124,92,0.35); }
        .nav-link { cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #2d6a4f !important; }
        .tag-btn { transition: all 0.2s; font-family: 'Lato',sans-serif; cursor: pointer; }
        .tag-btn:hover { transform: scale(1.05); }
        .tag-btn.active { background: #4a7c5c !important; color: white !important; border-color: #4a7c5c !important; }
        .add-btn { transition: background 0.2s; cursor: pointer; }
        .add-btn:hover { background: #3a6a4c !important; }
        .qty-btn { cursor: pointer; transition: all 0.2s; }
        .qty-btn:hover { background: #4a7c5c !important; color: white !important; }
      `}</style>

      {/* Toast Notification */}
      {notification && (
        <div style={{ position: "fixed", top: 80, right: 24, background: "#2d6a4f", color: "white", padding: "12px 24px", borderRadius: 50, zIndex: 9999, fontWeight: 700, fontSize: 14, animation: "popIn 0.3s ease", boxShadow: "0 8px 30px rgba(45,106,79,0.35)" }}>
          {notification}
        </div>
      )}

      {/* Order Success Modal */}
      {orderPlaced && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: 24, padding: "48px 60px", textAlign: "center", animation: "popIn 0.4s ease", maxWidth: 420 }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🌿</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#2d6a4f", marginBottom: 12 }}>Order Placed! 🎉</h2>
            <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7 }}>Your kosha meal is being freshly prepared.<br />Ready in 12–15 minutes.</p>
            <div style={{ marginTop: 24, padding: "12px 24px", background: "#e8f5e9", borderRadius: 50, display: "inline-block", color: "#2d6a4f", fontWeight: 700 }}>
              Order #KB-{Math.floor(Math.random() * 9000 + 1000)}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 400, background: "#faf8f3", animation: "slideIn 0.35s ease", display: "flex", flexDirection: "column", boxShadow: "-10px 0 50px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #e0d8cc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24 }}>Your Order</h2>
                <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{itemCount} item{itemCount !== 1 ? "s" : ""} · 100% clean ingredients 🌿</p>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 80 }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🥗</div>
                  <p style={{ color: "#aaa", fontSize: 16 }}>Your bowl is empty.<br />Add something nourishing!</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 16, background: "white", borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 36, minWidth: 50, textAlign: "center" }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: "#4a7c5c", fontWeight: 700, fontSize: 15 }}>₹{item.price * item.qty}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, border: "1.5px solid #ddd", borderRadius: "50%", background: "white", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, border: "1.5px solid #ddd", borderRadius: "50%", background: "white", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "20px 28px", borderTop: "1px solid #e0d8cc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "#888" }}>Subtotal</span><span style={{ fontWeight: 700 }}>₹{total}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingTop: 12, borderTop: "1px solid #eee" }}>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: 20, color: "#2d6a4f" }}>₹{total}</span>
                </div>
                <button className="btn-green" onClick={placeOrder} style={{ width: "100%", padding: 16, fontSize: 16 }}>
                  Place Order 🌿
                </button>
                <p style={{ textAlign: "center", fontSize: 11, color: "#aaa", marginTop: 10 }}>FSSAI Lic. No. 12722999000651 · No hidden ingredients</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 500, background: "rgba(250,248,243,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(74,124,92,0.15)", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🌿</span>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 900, color: "#2d6a4f" }}>Kosha Bowls</span>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "#a0855a", marginLeft: 10 }}>CLEAN · PURE · NOURISHING</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["home", "Menu"], ["story", "Our Story"], ["locations", "Locations"]].map(([pg, label]) => (
            <span key={pg} className="nav-link" onClick={() => setActivePage(pg)}
              style={{ fontSize: 14, fontWeight: 600, color: activePage === pg ? "#2d6a4f" : "#4a4a4a", borderBottom: activePage === pg ? "2px solid #4a7c5c" : "2px solid transparent", paddingBottom: 2, transition: "all 0.2s" }}>
              {label}
            </span>
          ))}
        </div>
        <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "#2d6a4f", color: "white", border: "none", padding: "10px 22px", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          🛒 Cart
          {itemCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#e07b39", color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, animation: "pulse 1.5s infinite" }}>{itemCount}</span>}
        </button>
      </nav>

      {/* ════════════ HOME PAGE ════════════ */}
      {activePage === "home" && <>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "92vh", background: "linear-gradient(145deg, #1a3d2b 0%, #2d6a4f 40%, #4a7c5c 70%, #6b9e7a 100%)", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "60% 40% 55% 45%", background: "rgba(255,255,255,0.04)", animation: "leafFloat 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: 600, height: 600, borderRadius: "45% 55% 40% 60%", background: "rgba(255,255,255,0.03)", animation: "leafFloat 11s ease-in-out infinite reverse" }} />
          <div style={{ position: "absolute", top: "20%", right: "10%", fontSize: 130, opacity: 0.1, animation: "leafFloat 7s ease-in-out infinite" }}>🌿</div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(50px)", transition: "all 1s ease" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: 50, padding: "8px 20px", marginBottom: 28 }}>
                <span>🇮🇳</span>
                <span style={{ color: "#b8e0c8", fontSize: 13, fontWeight: 600, letterSpacing: "0.5px" }}>PROUDLY MADE IN INDIA · FSSAI LICENSED</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 68, fontWeight: 900, color: "white", lineHeight: 1.05, marginBottom: 28 }}>
                Clean Food.<br /><em style={{ color: "#a8d5b5" }}>Pure Life.</em>
              </h1>
              <p style={{ fontSize: 17, color: "#b8d8c4", lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>
                Kosha Bowls was born in Punjab with one belief — food should heal, not harm. Every bowl uses traceable, toxin-free ingredients. No maida, no seed oils, no MSG. Just pure nourishment.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-green" style={{ background: "white", color: "#2d6a4f", padding: "16px 40px", fontSize: 16 }}
                  onClick={() => document.getElementById("menu").scrollIntoView({ behavior: "smooth" })}>
                  Order Now 🥗
                </button>
                <button style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.5)", color: "white", padding: "16px 36px", borderRadius: 50, cursor: "pointer", fontSize: 15, fontWeight: 600, transition: "all 0.25s" }}
                  onClick={() => setActivePage("story")}
                  onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.target.style.background = "transparent"}>
                  Our Story
                </button>
              </div>
              <div style={{ display: "flex", gap: 36, marginTop: 52 }}>
                {[["2", "Locations in India"], ["15min", "Fresh Daily Prep"], ["0g", "Artificial Additives"]].map(([n, l]) => (
                  <div key={n}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "white" }}>{n}</div>
                    <div style={{ fontSize: 12, color: "#9abfac", letterSpacing: "0.5px", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transition: "all 1.2s ease 0.3s" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { e: "🍛", n: "Butter Chicken Bowl", t: "₹349", c: "rgba(196,92,56,0.88)" },
                  { e: "🌯", n: "Chicken Shawarma", t: "₹249", c: "rgba(193,127,58,0.88)" },
                  { e: "🍲", n: "Lentil Shorba", t: "₹149", c: "rgba(192,57,43,0.88)" },
                  { e: "🧀", n: "Tandoori Paneer", t: "₹299", c: "rgba(45,106,79,0.88)" },
                ].map((item, i) => (
                  <div key={i} style={{ background: item.c, borderRadius: 20, padding: 24, textAlign: "center", animation: `fadeUp 0.8s ease ${0.5 + i * 0.15}s both`, border: "1px solid rgba(255,255,255,0.15)" }}>
                    <div style={{ fontSize: 52, marginBottom: 12 }}>{item.e}</div>
                    <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{item.n}</div>
                    <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4, fontWeight: 700 }}>{item.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 80" fill="none"><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#faf8f3" /></svg>
          </div>
        </section>

        {/* SCROLLING INGREDIENT TICKER */}
        <div style={{ background: "#2d6a4f", padding: "14px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "ticker 28s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
            {[...INGREDIENTS, ...INGREDIENTS].map((ing, i) => (
              <span key={i} style={{ color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.5px", padding: "0 28px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>🌿 {ing}</span>
            ))}
          </div>
        </div>

        {/* VALUES STRIP */}
        <section style={{ background: "#faf8f3", padding: "48px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { icon: "🚫", title: "No Maida. Ever.", desc: "Whole wheat, millets and ancient grains only" },
              { icon: "🧪", title: "Zero Seed Oils", desc: "Cold-press mustard, coconut or olive oil in every dish" },
              { icon: "🐄", title: "A2 Dairy Only", desc: "Hormone-free milk and paneer from desi Indian breeds" },
              { icon: "📋", title: "FSSAI Licensed", desc: "Lic. No. 12722999000651 · Full ingredient transparency" },
            ].map(v => (
              <div key={v.title} style={{ textAlign: "center", padding: "28px 20px", borderRadius: 16, background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, marginBottom: 8, color: "#2d3a2e" }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MENU ── */}
        <section id="menu" style={{ background: "#faf8f3", padding: "60px 40px 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", color: "#a0855a", marginBottom: 12, fontWeight: 700 }}>FRESHLY PREPARED DAILY</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "#1a3d2b", marginBottom: 16 }}>Today's Menu</h2>
              <p style={{ color: "#888", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>Made fresh each morning with traceable, toxin-free ingredients. Every item FSSAI approved.</p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 44 }}>
              {Object.keys(MENU).map(cat => (
                <button key={cat} className={`tag-btn ${activeSection === cat ? "active" : ""}`}
                  onClick={() => setActiveSection(cat)}
                  style={{ padding: "10px 24px", borderRadius: 50, border: "2px solid", borderColor: activeSection === cat ? "#4a7c5c" : "#e0d8cc", background: activeSection === cat ? "#4a7c5c" : "white", color: activeSection === cat ? "white" : "#4a4a4a", fontWeight: 700, fontSize: 14 }}>
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
              {MENU[activeSection].map((item, i) => (
                <div key={item.id} className="card-hover" style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                  <div style={{ height: 140, background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span style={{ fontSize: 72 }}>{item.emoji}</span>
                    {item.badge && <span style={{ position: "absolute", top: 12, left: 12, background: "white", color: "#2d3a2e", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 50, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>{item.badge}</span>}
                    <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 50 }}>{item.cal} cal</span>
                  </div>
                  <div style={{ padding: 22 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#1a3d2b", lineHeight: 1.3, flex: 1 }}>{item.name}</h3>
                      <span style={{ fontWeight: 900, fontSize: 18, color: "#2d6a4f", minWidth: 55, textAlign: "right" }}>₹{item.price}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 14 }}>{item.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                      {item.tags.map(t => (
                        <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 50, background: TAG_COLORS[t]?.bg, color: TAG_COLORS[t]?.color }}>{t}</span>
                      ))}
                    </div>
                    <button className="add-btn" onClick={() => addToCart(item)} style={{ width: "100%", background: "#4a7c5c", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 700, fontSize: 14, fontFamily: "'Lato',sans-serif", letterSpacing: "0.3px" }}>
                      + Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION BANNER */}
        <section style={{ background: "linear-gradient(135deg, #1a3d2b, #2d6a4f)", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🇮🇳</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: "white", marginBottom: 20 }}>Rooted in Punjab.<br /><em style={{ color: "#a8d5b5" }}>Built for India.</em></h2>
            <p style={{ fontSize: 17, color: "#9abfac", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
              We believe Indians deserve clean, whole food that draws from our own traditions — dal, millets, A2 dairy, cold-press oils and healing spices. No western junk dressed up as "healthy."
            </p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              {[["🏪 2", "Locations in India"], ["✅ FSSAI", "Licensed & Verified"], ["🚫 0", "Artificial Additives"], ["🌿 100%", "Toxin-Free Ingredients"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 28px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "white" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#7aad8c", marginTop: 6, fontWeight: 600, letterSpacing: "0.5px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>}

      {/* ════════════ OUR STORY PAGE ════════════ */}
      {activePage === "story" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 40px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a0855a", marginBottom: 12, fontWeight: 700 }}>FROM LUDHIANA, WITH LOVE</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: "#1a3d2b", lineHeight: 1.1 }}>The Story Behind<br /><em>Kosha Bowls</em></h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }}>
            <div style={{ background: "linear-gradient(135deg, #2d6a4f, #4a7c5c)", borderRadius: 24, padding: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 80, marginBottom: 16 }}>🌿</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "white", fontWeight: 700 }}>Born in Punjab</div>
                <div style={{ color: "#a8d5b5", fontSize: 14, marginTop: 8 }}>Ludhiana · Kapurthala</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              {[["🌾", "Punjab Roots"], ["🧬", "Clean Ingredients"], ["📋", "FSSAI Licensed"], ["❤️", "Made with Intention"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "white", borderRadius: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: 26 }}>{icon}</span>
                  <span style={{ fontWeight: 700, color: "#1a3d2b", fontSize: 15 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {[
            {
              heading: "Where It All Started",
              body: "Kosha Bowls was born right here in Ludhiana, Punjab — not in a boardroom, but out of a real frustration. We looked around and saw a city full of people who wanted to eat better, who were tired of oily takeout and ultra-processed \"health food\" that was anything but healthy. We had grown up eating naani's dal, fresh sabzi from the bazaar, and dahi from the local dairy. We knew what real food tasted like — and we knew it was missing from the food scene around us."
            },
            {
              heading: "The Kosha Philosophy",
              body: "\"Kosha\" means the layers of the self in Sanskrit — the physical, the energetic, the mental. We believe what you eat touches all of them. That's why we obsess over every ingredient: no refined seed oils, no maida, no artificial colours or flavours, no MSG, no hidden sugars. Every ingredient on our menu earns its place — it either nourishes, heals or energises you. We use A2 desi dairy, cold-press oils, organic dal and millets, free-range chicken, and farm-fresh desi eggs. Nothing else."
            },
            {
              heading: "Growing Across Punjab",
              body: "We started in Ludhiana and the response from Punjab was overwhelming. People were hungry — not just for good food, but for honesty. They wanted to know exactly what was in their meal. So we put everything on the label, got our FSSAI licence verified, and made transparency our brand promise. In 2025, we opened our second location in Kapurthala — bringing clean bowls to more families across the region. More cities are coming, because every person in India deserves to eat this well."
            },
            {
              heading: "Our Promise to You",
              body: "Every morning our kitchen starts fresh. No reheated bases, no frozen shortcuts. Our shorbas are made from scratch, our shawarma is marinated overnight, and our bowls are assembled to order. We are FSSAI licensed and fully compliant. We believe food is medicine, and we take that responsibility seriously — every single day, every single bowl."
            },
          ].map(({ heading, body }) => (
            <div key={heading} style={{ marginBottom: 44 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#1a3d2b", marginBottom: 14 }}>{heading}</h2>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.95 }}>{body}</p>
            </div>
          ))}

          <div style={{ background: "linear-gradient(135deg, #1a3d2b, #2d6a4f)", borderRadius: 20, padding: "40px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🌱</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "white", fontStyle: "italic", lineHeight: 1.6 }}>"Eat clean. Live full. That's the Kosha way."</p>
            <p style={{ color: "#7aad8c", marginTop: 12, fontSize: 13, letterSpacing: "0.1em" }}>— KOSHA BOWLS · LUDHIANA & KAPURTHALA, PUNJAB</p>
          </div>
        </div>
      )}

      {/* ════════════ LOCATIONS PAGE ════════════ */}
      {activePage === "locations" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 40px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a0855a", marginBottom: 12, fontWeight: 700 }}>FIND US IN PUNJAB</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 50, fontWeight: 900, color: "#1a3d2b" }}>Our Locations</h1>
            <p style={{ color: "#888", marginTop: 14, fontSize: 16 }}>Two homes, one promise — always clean, always fresh.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { city: "Ludhiana", state: "Punjab · 141001", flag: "🏙️", label: "Flagship Store", hours: "Mon–Sun: 11am – 10pm", phone: "+91 98760 00000", note: "Our original home. Walk-ins welcome.", color: "#2d6a4f" },
              { city: "Kapurthala", state: "Punjab · 144601", flag: "🌿", label: "New Location", hours: "Mon–Sun: 11am – 9:30pm", phone: "+91 98760 00001", note: "Now open! Serving all of Kapurthala.", color: "#4a7c5c" },
            ].map(loc => (
              <div key={loc.city} style={{ background: "white", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
                <div style={{ background: `linear-gradient(135deg, ${loc.color}, ${loc.color}cc)`, padding: "36px 36px 28px", position: "relative" }}>
                  <span style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 50, letterSpacing: "0.1em" }}>{loc.label}</span>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{loc.flag}</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "white", fontWeight: 900 }}>{loc.city}</h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 }}>{loc.state}</p>
                </div>
                <div style={{ padding: "28px 36px" }}>
                  {[["🕐 Hours", loc.hours], ["📞 Phone", loc.phone], ["📋 FSSAI", "Lic. No. 12722999000651"]].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0ebe2" }}>
                      <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: 13, color: "#2c2c2c", fontWeight: 700 }}>{val}</span>
                    </div>
                  ))}
                  <p style={{ marginTop: 18, fontSize: 13, color: "#a0855a", fontStyle: "italic" }}>{loc.note}</p>
                  <button className="btn-green" style={{ marginTop: 20, width: "100%", padding: 13 }}>Get Directions 📍</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, background: "#e8f5e9", borderRadius: 16, padding: "28px 36px", display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 40 }}>🚀</span>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#1a3d2b", marginBottom: 6 }}>More locations coming soon</h3>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6 }}>Expanding across Punjab and beyond. Want Kosha Bowls in your city? Reach out — we'd love to hear from you.</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#111e16", color: "#7a9982", padding: "60px 40px 30px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🌿</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "white", fontWeight: 900 }}>Kosha Bowls</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 260 }}>Clean food, pure ingredients, honest labels. Proudly serving Punjab from Ludhiana & Kapurthala.</p>
              <p style={{ fontSize: 11, color: "#4a6a52", marginTop: 12 }}>FSSAI Lic. No. 12722999000651</p>
            </div>
            {[
              { title: "Menu", links: ["Signature Bowls", "Shawarmaz", "Shorbas", "Drinks & Elixirs"] },
              { title: "Company", links: ["Our Story", "Our Ingredients", "Locations", "Careers"] },
              { title: "Connect", links: ["Instagram", "WhatsApp Order", "Feedback"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: "white", fontWeight: 700, marginBottom: 16, letterSpacing: "0.5px", fontSize: 14 }}>{col.title}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#a8d5b5"} onMouseLeave={e => e.target.style.color = "#7a9982"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1e3225", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13 }}>© 2026 Kosha Bowls. Made with 💚 in Punjab, India.</span>
            <span style={{ fontSize: 13 }}>🇮🇳 Proudly Indian · FSSAI Licensed · No Junk Ingredients</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
