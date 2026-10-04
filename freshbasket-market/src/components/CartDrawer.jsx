import { Minus, Plus, Trash2, X, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeFromCart } from "../store";

export default function CartDrawer({ open, onClose, onCheckout }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 35 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + delivery;

  return (
    <>
      {open && <button aria-label="Close cart" onClick={onClose} className="fixed inset-0 z-50 cursor-default bg-black/30 backdrop-blur-[2px]" />}
      <aside className={`fixed right-0 top-0 z-[60] flex h-full w-full max-w-[430px] flex-col bg-[#fbfaf6] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-lime-700">Your basket</p>
            <h2 className="mt-1 text-2xl font-black text-[#243b2b]">Ready to checkout?</h2>
          </div>
          <button onClick={onClose} className="grid size-10 place-items-center rounded-full border border-stone-200 bg-white hover:bg-stone-50"><X size={19} /></button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-lime-100 text-4xl">🧺</div>
                <h3 className="mt-5 text-xl font-black text-stone-800">Your basket is empty</h3>
                <p className="mx-auto mt-2 max-w-[270px] text-sm leading-6 text-stone-500">Add a few everyday favourites and they’ll show up here.</p>
                <button onClick={onClose} className="mt-5 rounded-full bg-[#243b2b] px-5 py-3 text-sm font-bold text-white">Keep shopping</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-3">
                  <div className={`grid size-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.tone}`}>
                    <span className="text-4xl">{item.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="truncate font-bold text-stone-800">{item.name}</h3>
                        <p className="text-xs text-stone-400">{item.unit}</p>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="text-stone-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-black text-[#243b2b]">${(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex items-center gap-2 rounded-full border border-stone-200 p-1">
                        <button onClick={() => dispatch(decrement(item.id))} className="grid size-6 place-items-center rounded-full hover:bg-stone-100"><Minus size={13} /></button>
                        <span className="w-4 text-center text-xs font-black">{item.quantity}</span>
                        <button onClick={() => dispatch(increment(item.id))} className="grid size-6 place-items-center rounded-full hover:bg-stone-100"><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 bg-white p-5">
            {delivery > 0 && <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">Add ${(35 - subtotal).toFixed(2)} more for free delivery.</p>}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-stone-500"><span>Delivery</span><span>{delivery ? `$${delivery.toFixed(2)}` : "Free"}</span></div>
              <div className="flex justify-between border-t border-stone-100 pt-3 text-lg font-black text-[#243b2b]"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button onClick={onCheckout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#243b2b] py-3.5 text-sm font-black text-white transition hover:bg-[#17291d]">
              Continue to checkout <ArrowRight size={17} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}