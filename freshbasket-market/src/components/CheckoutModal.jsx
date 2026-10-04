import { useState } from "react";
import { Check, X, CreditCard, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store";

export default function CheckoutModal({ open, onClose }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + delivery;

  const finish = (e) => {
    e.preventDefault();
    setDone(true);
    dispatch(clearCart());
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-auto rounded-[30px] bg-[#fbfaf6] shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white shadow-sm"><X size={17} /></button>

        {done ? (
          <div className="px-7 py-16 text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-lime-100 text-lime-700"><Check size={36} /></div>
            <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-lime-700">Order received</p>
            <h2 className="mt-2 text-3xl font-black text-[#243b2b]">You're all set!</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-500">Your pretend FreshBasket order has been placed. This demo doesn't process real payments.</p>
            <button onClick={onClose} className="mt-7 rounded-full bg-[#243b2b] px-6 py-3 text-sm font-bold text-white">Back to store</button>
          </div>
        ) : (
          <form onSubmit={finish} className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.18em] text-lime-700">Secure demo checkout</p>
            <h2 className="mt-2 text-3xl font-black text-[#243b2b]">Almost yours.</h2>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-stone-600">Delivery address</span>
                <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                  <MapPin size={17} className="text-stone-400" />
                  <input required placeholder="123 Market Street" className="w-full outline-none placeholder:text-stone-300" />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-stone-600">Card number</span>
                <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                  <CreditCard size={17} className="text-stone-400" />
                  <input required inputMode="numeric" minLength="12" placeholder="4242 4242 4242 4242" className="w-full outline-none placeholder:text-stone-300" />
                </div>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="MM / YY" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" />
                <input required placeholder="CVC" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#243b2b] p-4 text-white">
              <div className="flex justify-between text-sm text-white/70"><span>Items</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="mt-2 flex justify-between text-sm text-white/70"><span>Delivery</span><span>{delivery ? `$${delivery.toFixed(2)}` : "Free"}</span></div>
              <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-lg font-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button type="submit" className="mt-5 w-full rounded-2xl bg-lime-400 py-3.5 text-sm font-black text-[#17291d] hover:bg-lime-300">Place demo order</button>
            <p className="mt-3 text-center text-[11px] text-stone-400">Demo only · no real payment is submitted</p>
          </form>
        )}
      </div>
    </div>
  );
}