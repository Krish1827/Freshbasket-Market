import { useState } from "react";
import { Search, ShoppingBag, Menu, X, MapPin, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header({ search, setSearch, onCart }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fbfaf6]/95 backdrop-blur">
      <div className="container-shell flex h-[74px] items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="FreshBasket home">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#243b2b] text-xl text-lime-200">✦</span>
          <span className="text-xl font-black tracking-tight text-[#243b2b]">fresh<span className="text-lime-600">basket</span></span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-stone-600 lg:flex">
          <a href="#shop" className="transition hover:text-[#243b2b]">Shop</a>
          <a href="#deals" className="transition hover:text-[#243b2b]">Weekly picks</a>
          <a href="#how-it-works" className="transition hover:text-[#243b2b]">How it works</a>
        </nav>

        <div className="hidden min-w-0 flex-1 justify-end gap-3 md:flex lg:max-w-[470px]">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 shadow-sm">
            <Search size={18} className="shrink-0 text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groceries..."
              className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
          </label>
          <button
            onClick={onCart}
            className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#243b2b] text-white transition hover:bg-[#17291d]"
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-lime-400 text-[10px] font-black text-[#17291d]">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onCart} className="relative grid size-10 place-items-center rounded-full bg-[#243b2b] text-white">
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-lime-400 text-[10px] font-bold text-black">{count}</span>}
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} className="grid size-10 place-items-center rounded-full border border-stone-200 bg-white">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white p-4 md:hidden">
          <label className="mb-4 flex items-center gap-2 rounded-2xl border border-stone-200 px-4 py-3">
            <Search size={17} className="text-stone-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search groceries..." className="w-full outline-none" />
          </label>
          <div className="grid gap-1 text-sm font-semibold">
            <a onClick={() => setMobileOpen(false)} href="#shop" className="rounded-xl px-3 py-3 hover:bg-stone-50">Shop</a>
            <a onClick={() => setMobileOpen(false)} href="#deals" className="rounded-xl px-3 py-3 hover:bg-stone-50">Weekly picks</a>
            <a onClick={() => setMobileOpen(false)} href="#how-it-works" className="rounded-xl px-3 py-3 hover:bg-stone-50">How it works</a>
          </div>
        </div>
      )}
    </header>
  );
}