import { prisma } from "../lib/prisma.js";

export async function findOrCreateCustomer(input: { name: string; email?: string; phone?: string }) {
  const email = input.email?.trim().toLowerCase() || null;
  const phone = input.phone?.trim() || null;

  const existing = await prisma.customer.findFirst({
    where: {
      OR: [
        email ? { email } : undefined,
        phone ? { phone } : undefined
      ].filter(Boolean) as Array<{ email?: string; phone?: string }>
    }
  });

  if (existing) {
    return prisma.customer.update({
      where: { id: existing.id },
      data: {
        name: input.name.trim(),
        email: email ?? existing.email,
        phone: phone ?? existing.phone
      }
    });
  }

  return prisma.customer.create({
    data: {
      name: input.name.trim(),
      email,
      phone
    }
  });
}
