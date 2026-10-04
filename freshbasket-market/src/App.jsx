import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Clock3, Leaf, ShieldCheck, Truck, Search } from "lucide-react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { categories, products, weeklyDeals } from "./data/products";

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const searchMatch = !query || `${product.name} ${product.category} ${product.unit}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const jumpToShop = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="top" className="min-h-screen bg-[#fbfaf6]">
      <Header search={search} setSearch={setSearch} onCart={() => setCartOpen(true)} />

      <main>
        <section className="container-shell pt-7 sm:pt-10">
          <div className="relative overflow-hidden rounded-[32px] bg-[#dcebc7] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-black text-[#426136] backdrop-blur">
                <span className="size-1.5 rounded-full bg-lime-600" /> Freshness, without the fuss
              </div>
              <h1 className="max-w-xl text-4xl font-black leading-[1.02] tracking-[-.04em] text-[#243b2b] sm:text-6xl">
                Good food should feel <span className="text-lime-700">easy.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#52654d] sm:text-base">
                Curated groceries, honest prices, and doorstep delivery for the little meals and big weekends in between.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={jumpToShop} className="flex items-center gap-2 rounded-full bg-[#243b2b] px-5 py-3 text-sm font-black text-white hover:bg-[#17291d]">
                  Start shopping <ArrowRight size={17} />
                </button>
                <a href="#deals" className="rounded-full bg-white/75 px-5 py-3 text-sm font-black text-[#243b2b] hover:bg-white">See weekly picks</a>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-12 -top-16 hidden h-80 w-80 rounded-full border-[34px] border-white/35 sm:block" />
            <div className="pointer-events-none absolute -bottom-20 right-10 hidden size-72 rounded-full bg-lime-300/40 sm:block" />
            <div className="absolute bottom-5 right-7 hidden rotate-3 rounded-[26px] border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur sm:block lg:right-20">
              <div className="text-5xl">🥕</div>
              <p className="mt-2 text-xs font-black text-[#243b2b]">Picked this morning</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container-shell py-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Leaf, title: "Thoughtfully picked", text: "A tighter selection of everyday favourites." },
              { icon: Truck, title: "Friendly delivery", text: "Free when your basket reaches $35." },
              { icon: ShieldCheck, title: "Simple checkout", text: "A clean, no-pressure shopping flow." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-100 text-lime-700"><Icon size={19} /></span>
                <div><h3 className="text-sm font-black text-stone-800">{title}</h3><p className="mt-1 text-xs leading-5 text-stone-500">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="container-shell scroll-mt-24 pb-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-lime-700">The everyday shelf</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[#243b2b] sm:text-4xl">Shop the good stuff</h2>
            </div>
            <div className="relative max-w-xs md:hidden">
              <Search className="absolute left-3 top-3 text-stone-400" size={17} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none" />
            </div>
          </div>

          <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  activeCategory === category.id ? "bg-[#243b2b] text-white" : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                <span>{category.icon}</span> {category.label}
              </button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-stone-300 bg-white py-16 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 font-black text-stone-800">Nothing matched that search</h3>
              <p className="mt-1 text-sm text-stone-500">Try another grocery, category, or keyword.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-5 rounded-full bg-[#243b2b] px-5 py-2.5 text-sm font-bold text-white">Reset filters</button>
            </div>
          )}
        </section>

        <section id="deals" className="bg-[#243b2b] py-14 text-white">
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[.18em] text-lime-300">For this week only</p>
                <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Little wins for your basket</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/60"><Clock3 size={15} /> Updated every Monday</div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {weeklyDeals.map((deal) => (
                <div key={deal.id} className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className={`grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${deal.tone}`}><span className="text-4xl">{deal.emoji}</span></div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-lime-300">{deal.deal}</span>
                    <h3 className="truncate font-black">{deal.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2"><span className="font-black">${deal.price.toFixed(2)}</span><span className="text-xs text-white/40 line-through">${deal.oldPrice.toFixed(2)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-shell py-16">
          <div className="grid overflow-hidden rounded-[30px] border border-stone-200 bg-white md:grid-cols-[1.1fr_.9fr]">
            <div className="p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[.18em] text-lime-700">A calmer kind of grocery run</p>
              <h2 className="mt-2 max-w-lg text-3xl font-black tracking-tight text-[#243b2b] sm:text-4xl">Less scrolling. More cooking.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500">FreshBasket is intentionally small: the things you reach for often, presented clearly, with no maze of promotions between you and dinner.</p>
              <a href="#shop" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#243b2b]">Browse the shelf <ChevronRight size={16} /></a>
            </div>
            <div className="grid min-h-64 place-items-center bg-[#f1eee5]">
              <div className="grid grid-cols-2 gap-3 text-6xl">
                <div className="rounded-3xl bg-white p-5 shadow-sm">🥖</div>
                <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">🍓</div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">🥛</div>
                <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">🫐</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="container-shell flex flex-col gap-3 py-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-black text-[#243b2b]">freshbasket<span className="text-lime-600">.</span></div>
          <p>Designed as an original grocery storefront demo · © 2026 FreshBasket</p>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}

export default App;