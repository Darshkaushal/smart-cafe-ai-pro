import bcrypt from "bcryptjs";
import { PrismaClient, MenuCategory } from "@prisma/client";

const prisma = new PrismaClient();

const menuItems = [
  {
    name: "Iced Caramel Cloud Coffee",
    slug: "iced-caramel-cloud-coffee",
    description: "Cold coffee with caramel foam, creamy milk, and a smooth sweet finish.",
    category: MenuCategory.COFFEE,
    price: 189,
    tags: ["cold", "sweet", "coffee", "caramel", "creamy", "genz", "best-seller"],
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Berry Blast Frappe",
    slug: "berry-blast-frappe",
    description: "A chilled berry frappe with strawberry syrup, vanilla, and whipped cream.",
    category: MenuCategory.SHAKE,
    price: 219,
    tags: ["cold", "sweet", "berry", "shake", "frappe", "creamy"],
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Mango Mint Cooler",
    slug: "mango-mint-cooler",
    description: "Refreshing mango cooler with mint, lime, and crushed ice.",
    category: MenuCategory.MOCKTAIL,
    price: 169,
    tags: ["cold", "sweet", "mango", "mint", "refreshing", "summer"],
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    sweetness: 4,
    temperature: "cold"
  },
  {
    name: "Classic Cappuccino",
    slug: "classic-cappuccino",
    description: "Hot espresso, steamed milk, and a velvety foam top.",
    category: MenuCategory.COFFEE,
    price: 149,
    tags: ["hot", "coffee", "classic", "less-sweet", "espresso"],
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    sweetness: 1,
    temperature: "hot"
  },
  {
    name: "Masala Chai Latte",
    slug: "masala-chai-latte",
    description: "Indian masala chai with steamed milk and balanced spice.",
    category: MenuCategory.TEA,
    price: 129,
    tags: ["hot", "tea", "chai", "indian", "spicy", "comfort"],
    imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80",
    sweetness: 3,
    temperature: "hot"
  },
  {
    name: "Chocolate Brownie Shake",
    slug: "chocolate-brownie-shake",
    description: "Thick chocolate shake blended with brownie bites and vanilla ice cream.",
    category: MenuCategory.SHAKE,
    price: 239,
    tags: ["cold", "very sweet", "chocolate", "brownie", "dessert", "shake"],
    imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Blue Lagoon Sparkle",
    slug: "blue-lagoon-sparkle",
    description: "A fizzy blue mocktail with lemon, soda, and a tropical vibe.",
    category: MenuCategory.MOCKTAIL,
    price: 179,
    tags: ["cold", "sweet", "fizzy", "lemon", "mocktail", "refreshing"],
    imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
    sweetness: 4,
    temperature: "cold"
  },
  {
    name: "Nutella Waffle Bites",
    slug: "nutella-waffle-bites",
    description: "Crispy waffle bites topped with Nutella, chocolate drizzle, and nuts.",
    category: MenuCategory.DESSERT,
    price: 199,
    tags: ["sweet", "dessert", "chocolate", "waffle", "snack"],
    imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "warm"
  },
  {
    name: "Peri Peri Cheese Fries",
    slug: "peri-peri-cheese-fries",
    description: "Crispy fries with peri-peri seasoning and melted cheese sauce.",
    category: MenuCategory.SNACK,
    price: 159,
    tags: ["spicy", "snack", "cheese", "fries", "savory"],
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
    sweetness: 0,
    temperature: "hot"
  }
  ,
  {
    name: "Spanish Latte",
    slug: "spanish-latte",
    description: "Smooth espresso with creamy milk and a mellow caramel sweetness.",
    category: MenuCategory.COFFEE,
    price: 199,
    tags: ["coffee", "latte", "sweet", "creamy", "best-seller"],
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    sweetness: 4,
    temperature: "cold"
  },
  {
    name: "Hazelnut Mocha",
    slug: "hazelnut-mocha",
    description: "Chocolatey coffee with roasted hazelnut notes and a silky finish.",
    category: MenuCategory.COFFEE,
    price: 219,
    tags: ["coffee", "chocolate", "hazelnut", "sweet", "hot"],
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    sweetness: 4,
    temperature: "hot"
  },
  {
    name: "Orange Espresso Tonic",
    slug: "orange-espresso-tonic",
    description: "A bright fizzy espresso drink with orange zest and tonic sparkle.",
    category: MenuCategory.COFFEE,
    price: 209,
    tags: ["coffee", "cold", "fizzy", "orange", "refreshing"],
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    sweetness: 2,
    temperature: "cold"
  },
  {
    name: "Rose Pistachio Frappe",
    slug: "rose-pistachio-frappe",
    description: "A chilled rose frappe with pistachio crunch and soft cream.",
    category: MenuCategory.SHAKE,
    price: 229,
    tags: ["cold", "sweet", "rose", "pistachio", "creamy", "dessert"],
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Lotus Biscoff Shake",
    slug: "lotus-biscoff-shake",
    description: "A thick caramel biscuit shake with whipped cream and cookie crumble.",
    category: MenuCategory.SHAKE,
    price: 249,
    tags: ["cold", "sweet", "biscoff", "caramel", "shake", "dessert"],
    imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Oreo Midnight Shake",
    slug: "oreo-midnight-shake",
    description: "Dark cookie shake blended with vanilla ice cream and chocolate drizzle.",
    category: MenuCategory.SHAKE,
    price: 229,
    tags: ["cold", "sweet", "oreo", "chocolate", "shake", "best-seller"],
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Peach Iced Tea",
    slug: "peach-iced-tea",
    description: "A light iced tea with peach, lemon and a clean refreshing finish.",
    category: MenuCategory.TEA,
    price: 149,
    tags: ["cold", "tea", "peach", "refreshing", "less-sweet"],
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    sweetness: 2,
    temperature: "cold"
  },
  {
    name: "Matcha Cream Latte",
    slug: "matcha-cream-latte",
    description: "Earthy matcha with creamy milk, soft vanilla and a smooth finish.",
    category: MenuCategory.TEA,
    price: 219,
    tags: ["matcha", "tea", "cold", "creamy", "less-sweet"],
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
    sweetness: 2,
    temperature: "cold"
  },
  {
    name: "Lemon Mint Iced Tea",
    slug: "lemon-mint-iced-tea",
    description: "Cool tea with lemon, mint and crushed ice for a clean summer mood.",
    category: MenuCategory.TEA,
    price: 139,
    tags: ["cold", "tea", "lemon", "mint", "refreshing", "budget"],
    imageUrl: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    sweetness: 2,
    temperature: "cold"
  },
  {
    name: "Watermelon Basil Cooler",
    slug: "watermelon-basil-cooler",
    description: "Fresh watermelon cooler with basil, lime and crushed ice.",
    category: MenuCategory.MOCKTAIL,
    price: 169,
    tags: ["cold", "watermelon", "basil", "refreshing", "summer"],
    imageUrl: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    sweetness: 3,
    temperature: "cold"
  },
  {
    name: "Strawberry Cheesecake Cup",
    slug: "strawberry-cheesecake-cup",
    description: "Layered cheesecake cream, strawberry compote and biscuit crumble.",
    category: MenuCategory.DESSERT,
    price: 189,
    tags: ["sweet", "dessert", "strawberry", "cheesecake", "birthday"],
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    sweetness: 5,
    temperature: "cold"
  },
  {
    name: "Tiramisu Jar",
    slug: "tiramisu-jar",
    description: "Coffee-soaked layers, mascarpone-style cream and cocoa dust.",
    category: MenuCategory.DESSERT,
    price: 219,
    tags: ["dessert", "coffee", "sweet", "cream", "date"],
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=80",
    sweetness: 4,
    temperature: "cold"
  },
  {
    name: "Garlic Cheese Toast",
    slug: "garlic-cheese-toast",
    description: "Toasted bread loaded with garlic butter, herbs and melted cheese.",
    category: MenuCategory.SNACK,
    price: 149,
    tags: ["snack", "cheese", "garlic", "savory", "budget"],
    imageUrl: "https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?auto=format&fit=crop&w=900&q=80",
    sweetness: 0,
    temperature: "hot"
  },
  {
    name: "Cafe Club Sandwich",
    slug: "cafe-club-sandwich",
    description: "Grilled veggie club sandwich with cheese, sauces and crisp sides.",
    category: MenuCategory.SNACK,
    price: 189,
    tags: ["snack", "sandwich", "savory", "filling", "veg"],
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    sweetness: 0,
    temperature: "hot"
  },
  {
    name: "Creamy Pesto Pasta Bowl",
    slug: "creamy-pesto-pasta-bowl",
    description: "Comforting pasta bowl with basil pesto, cream and grated cheese.",
    category: MenuCategory.SNACK,
    price: 249,
    tags: ["snack", "pasta", "cheese", "savory", "filling"],
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    sweetness: 0,
    temperature: "hot"
  },
  {
    name: "Loaded Nachos Bowl",
    slug: "loaded-nachos-bowl",
    description: "Crunchy nachos with cheese sauce, salsa, jalapeños and herbs.",
    category: MenuCategory.SNACK,
    price: 199,
    tags: ["snack", "spicy", "cheese", "nachos", "shareable"],
    imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
    sweetness: 0,
    temperature: "hot"
  }

];

async function main() {
  const passwordHash = await bcrypt.hash("Owner@12345", 12);

  await prisma.admin.upsert({
    where: { email: "owner@dkscafe.in" },
    update: { name: "DK's Cafe Owner", passwordHash },
    create: { name: "DK's Cafe Owner", email: "owner@dkscafe.in", passwordHash }
  });

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }

  console.log("Seed completed: admin + menu items are ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
