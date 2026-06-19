import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ok, toNumber } from "../lib/http.js";
import { findOrCreateCustomer } from "../services/customer.service.js";
import { handleChat } from "../services/chat.service.js";

export const publicRouter = Router();

const customerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal(""))
});

publicRouter.get("/menu", async (_req, res, next) => {
  try {
    const items = await prisma.menuItem.findMany({ where: { isAvailable: true }, orderBy: { createdAt: "asc" } });
    ok(res, items.map((item) => ({ ...item, price: toNumber(item.price) })));
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/bookings", async (req, res, next) => {
  try {
    const body = z.object({
      customer: customerSchema,
      date: z.string().min(10),
      timeSlot: z.string().min(3),
      guests: z.coerce.number().min(1).max(30),
      notes: z.string().max(500).optional().or(z.literal(""))
    }).parse(req.body);

    const customer = await findOrCreateCustomer(body.customer);
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        date: new Date(body.date),
        timeSlot: body.timeSlot,
        guests: body.guests,
        notes: body.notes || null
      },
      include: { customer: true }
    });

    ok(res, booking, 201);
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/orders", async (req, res, next) => {
  try {
    const body = z.object({
      customer: customerSchema,
      pickupTime: z.string().optional().or(z.literal("")),
      items: z.array(z.object({ menuItemId: z.string().min(1), quantity: z.coerce.number().min(1).max(20) })).min(1)
    }).parse(req.body);

    const customer = await findOrCreateCustomer(body.customer);
    const menuItems = await prisma.menuItem.findMany({ where: { id: { in: body.items.map((item) => item.menuItemId) } } });

    const orderItems = body.items.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);
      if (!menuItem) throw new Error(`Menu item not found: ${item.menuItemId}`);
      return {
        menuItemId: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => sum + toNumber(item.price) * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        pickupTime: body.pickupTime || null,
        totalAmount,
        items: { create: orderItems }
      },
      include: { customer: true, items: { include: { menuItem: true } } }
    });

    ok(res, { ...order, totalAmount: toNumber(order.totalAmount) }, 201);
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/contact", async (req, res, next) => {
  try {
    const body = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional().or(z.literal("")),
      subject: z.string().min(3),
      message: z.string().min(5).max(1000)
    }).parse(req.body);

    const contact = await prisma.contactMessage.create({ data: { ...body, phone: body.phone || null } });
    ok(res, contact, 201);
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/chat", async (req, res, next) => {
  try {
    const body = z.object({
      message: z.string().min(2),
      name: z.string().optional(),
      email: z.string().email().optional().or(z.literal("")),
      phone: z.string().optional().or(z.literal("")),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000)
      })).max(12).optional()
    }).parse(req.body);

    const result = await handleChat(body);
    ok(res, result, 201);
  } catch (error) {
    next(error);
  }
});
