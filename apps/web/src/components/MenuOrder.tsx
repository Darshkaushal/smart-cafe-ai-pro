"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import type { MenuItem } from "@/lib/api";
import { postJson } from "@/lib/api";

type Cart = Record<string, number>;

export function MenuOrder({ items }: { items: MenuItem[] }) {
  const [cart, setCart] = useState<Cart>({});
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", pickupTime: "" });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });

  const categories = useMemo(() => ["all", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const filteredItems = useMemo(() => {
    const text = query.toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch = !text || `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(text);
      return matchesCategory && matchesSearch;
    });
  }, [category, items, query]);

  const cartItems = items.filter((item) => cart[item.id]);
  const total = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  function add(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function remove(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }

  function clear(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  async function orderNow() {
    if (!cartItems.length) return setStatus({ type: "error", message: "Add at least one item to your cart." });
    if (!customer.name || !customer.email || !customer.phone) return setStatus({ type: "error", message: "Enter name, email, and phone for order tracking." });
    setStatus({ type: "loading", message: "Placing your order..." });
    try {
      await postJson("/orders", {
        customer: { name: customer.name, email: customer.email, phone: customer.phone },
        pickupTime: customer.pickupTime,
        items: cartItems.map((item) => ({ menuItemId: item.id, quantity: cart[item.id] }))
      });
      setCart({});
      setStatus({ type: "success", message: "Order placed successfully. Owner can see it inside admin panel." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Order failed." });
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_410px]">
      <div>
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
            <input className="input-field pl-11" placeholder="Search cold coffee, sweet, mango..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-3 text-sm font-bold capitalize transition ${category === item ? "bg-cafe-caramel text-cafe-dark" : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.id} className="premium-card group overflow-hidden transition duration-300 hover:-translate-y-2">
              {item.imageUrl && (
                <div className="relative h-56 overflow-hidden">
                  <Image src={item.imageUrl} alt={item.name} width={700} height={520} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-transparent to-transparent" />
                  <p className="absolute right-4 top-4 rounded-full bg-cafe-caramel px-4 py-2 font-black text-cafe-dark">₹{item.price}</p>
                </div>
              )}
              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cafe-caramel/80">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-white">{item.name}</h3>
                </div>
                <p className="min-h-[48px] text-sm leading-6 text-white/58">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((tag) => <span key={tag} className="chip">#{tag}</span>)}
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <button onClick={() => add(item.id)} className="primary-btn w-full">Add {cart[item.id] ? `(${cart[item.id]})` : ""}</button>
                  {cart[item.id] ? <button onClick={() => remove(item.id)} className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10"><Minus size={18} /></button> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-[2rem] border border-white/10 bg-[#170d0b]/90 p-5 shadow-glow backdrop-blur-xl lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-cafe-caramel">Fast checkout</p>
            <h2 className="mt-1 text-3xl font-black text-white">Quick Order</h2>
          </div>
          <div className="relative grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel text-cafe-dark">
            <ShoppingBag />
            {itemCount > 0 && <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-cafe-neon text-xs font-black">{itemCount}</span>}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <input className="input-field" placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input className="input-field" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input className="input-field" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <input className="input-field" placeholder="Pickup time e.g. 7:30 PM" value={customer.pickupTime} onChange={(e) => setCustomer({ ...customer, pickupTime: e.target.value })} />
        </div>

        <div className="my-5 space-y-3 text-sm text-white/72">
          {cartItems.length === 0 && <p className="rounded-3xl border border-dashed border-white/15 p-4 text-center text-white/45">Your cart is empty. Add your favorite drink.</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 rounded-3xl bg-white/[0.055] p-3">
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-xs text-white/45">₹{item.price} × {cart[item.id]}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => remove(item.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Minus size={14} /></button>
                <button onClick={() => add(item.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Plus size={14} /></button>
                <button onClick={() => clear(item.id)} className="grid h-8 w-8 place-items-center rounded-full bg-red-500/15 text-red-200"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between text-lg font-black">
            <span>Total</span><span>₹{total}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-neon" style={{ width: `${Math.min(100, itemCount * 22)}%` }} /></div>
        </div>

        <button onClick={orderNow} disabled={status.type === "loading"} className="primary-btn mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60">
          {status.type === "loading" ? "Placing..." : "Place Order"}
        </button>
        {status.message && (
          <p className={`mt-4 flex gap-2 rounded-2xl p-3 text-sm ${status.type === "success" ? "bg-cafe-neon/10 text-cafe-neon" : status.type === "error" ? "bg-red-500/10 text-red-100" : "bg-white/10 text-white/75"}`}>
            {status.type === "success" && <CheckCircle2 size={18} />} {status.message}
          </p>
        )}
      </aside>
    </section>
  );
}
