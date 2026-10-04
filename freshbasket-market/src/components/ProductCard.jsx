import { Star, Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.find((item) => item.id === product.id));

  return (
    <article className="group rounded-[24px] border border-stone-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl">
      <div className={`relative flex h-48 items-center justify-center overflow-hidden rounded-[19px] bg-gradient-to-br ${product.tone}`}>
        <span className="text-8xl drop-shadow-sm transition duration-500 group-hover:scale-110">{product.emoji}</span>
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-stone-700 backdrop-blur">
          {product.badge}
        </span>
      </div>

      <div className="px-1.5 pb-1 pt-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="truncate font-bold text-stone-800">{product.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-stone-500">
            <Star size={13} fill="currentColor" /> {product.rating}
          </span>
        </div>
        <p className="text-sm text-stone-400">{product.unit}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-black text-[#243b2b]">${product.price.toFixed(2)}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-black transition ${
              cartItem ? "bg-lime-100 text-lime-800" : "bg-[#243b2b] text-white hover:bg-[#17291d]"
            }`}
          >
            {cartItem ? <Check size={15} /> : <Plus size={15} />}
            {cartItem ? `${cartItem.quantity} added` : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}