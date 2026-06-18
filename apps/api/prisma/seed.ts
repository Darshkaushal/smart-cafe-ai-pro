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
];

async function main() {
  const passwordHash = await bcrypt.hash("Owner@12345", 12);

  await prisma.admin.upsert({
    where: { email: "owner@smartcafe.ai" },
    update: { name: "Smart Cafe Owner", passwordHash },
    create: { name: "Smart Cafe Owner", email: "owner@smartcafe.ai", passwordHash }
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
