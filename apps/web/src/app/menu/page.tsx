import { MenuOrder } from "@/components/MenuOrder";
import { getMenu } from "@/lib/api";

export default async function MenuPage() {
  const items = await getMenu();

  return (
    <main className="px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-cafe-caramel">Live menu + order system</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Menu that connects directly with MySQL orders.</h1>
          <p className="mt-4 text-white/60">Customers can order from here. Every order, item quantity, amount, and customer detail appears in the owner admin dashboard.</p>
        </div>
        <MenuOrder items={items} />
      </div>
    </main>
  );
}
