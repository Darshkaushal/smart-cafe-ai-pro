import { MenuOrder } from "@/components/MenuOrder";
import { getMenu } from "@/lib/api";

export default async function MenuPage() {
  const items = await getMenu();

  return (
    <main className="px-5 py-14">
      <div className="page-shell">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="section-label">Live menu + smart order system</p>
            <h1 className="section-heading">A premium menu connected directly with MySQL orders.</h1>
            <p className="mt-5 max-w-2xl text-white/60">Search, filter, add items, and place orders smoothly. Every order, quantity, amount, and customer detail appears in the owner admin dashboard.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 text-center">
            <div className="rounded-3xl bg-white/[0.05] p-4"><p className="text-2xl font-black text-white">{items.length}</p><p className="text-xs text-white/45">Items</p></div>
            <div className="rounded-3xl bg-white/[0.05] p-4"><p className="text-2xl font-black text-cafe-caramel">AI</p><p className="text-xs text-white/45">Ready</p></div>
            <div className="rounded-3xl bg-white/[0.05] p-4"><p className="text-2xl font-black text-cafe-neon">Live</p><p className="text-xs text-white/45">Orders</p></div>
          </div>
        </div>
        <MenuOrder items={items} />
      </div>
    </main>
  );
}
