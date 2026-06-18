"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "@/lib/api";
import { postJson } from "@/lib/api";

type Cart = Record<string, number>;

export function MenuOrder({ items }: { items: MenuItem[] }) {
  const [cart, setCart] = useState<Cart>({});
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", pickupTime: "" });
  const [status, setStatus] = useState("");

  const cartItems = items.filter((item) => cart[item.id]);
  const total = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  function add(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  async function orderNow() {
    if (!cartItems.length) return setStatus("Add at least one item.");
    if (!customer.name || !customer.email || !customer.phone) return setStatus("Enter name, email, and phone for order tracking.");
    setStatus("Placing order...");
    try {
      await postJson("/orders", {
        customer: { name: customer.name, email: customer.email, phone: customer.phone },
        pickupTime: customer.pickupTime,
        items: cartItems.map((item) => ({ menuItemId: item.id, quantity: cart[item.id] }))
      });
      setCart({});
      setStatus("Order placed. Owner can see it inside admin panel.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Order failed.");
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="glass-card overflow-hidden rounded-[2rem]">
            {item.imageUrl && <Image src={item.imageUrl} alt={item.name} width={600} height={420} className="h-52 w-full object-cover" />}
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black text-white">{item.name}</h3>
                <p className="rounded-full bg-cafe-caramel px-3 py-1 font-bold text-cafe-dark">₹{item.price}</p>
              </div>
              <p className="text-sm text-white/60">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">#{tag}</span>)}
              </div>
              <button onClick={() => add(item.id)} className="primary-btn w-full">Add to Order {cart[item.id] ? `(${cart[item.id]})` : ""}</button>
            </div>
          </article>
        ))}
      </div>

      <aside className="glass-card h-fit rounded-[2rem] p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl font-black text-white">Quick Order</h2>
        <div className="mt-4 space-y-3">
          <input className="input-field" placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input className="input-field" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input className="input-field" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <input className="input-field" placeholder="Pickup time e.g. 7:30 PM" value={customer.pickupTime} onChange={(e) => setCustomer({ ...customer, pickupTime: e.target.value })} />
        </div>
        <div className="my-5 space-y-2 text-sm text-white/70">
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <span>{item.name} × {cart[item.id]}</span>
              <span>₹{item.price * cart[item.id]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-black">
          <span>Total</span><span>₹{total}</span>
        </div>
        <button onClick={orderNow} className="primary-btn mt-5 w-full">Place Order</button>
        {status && <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/75">{status}</p>}
      </aside>
    </section>
  );
}
