import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { BookingStatus, OrderStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { ApiError, ok, toNumber } from "../lib/http.js";
import { requireAdmin, signAdminToken, type AuthRequest } from "../middleware/auth.js";

export const adminRouter = Router();

adminRouter.post("/login", async (req, res, next) => {
  try {
    const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
    const admin = await prisma.admin.findUnique({ where: { email: body.email.toLowerCase() } });
    if (!admin) throw new ApiError(401, "Invalid email or password.");

    const valid = await bcrypt.compare(body.password, admin.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid email or password.");

    const token = signAdminToken({ id: admin.id, email: admin.email });
    ok(res, { token, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (error) {
    next(error);
  }
});

adminRouter.use(requireAdmin);

adminRouter.get("/me", async (req: AuthRequest, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: req.admin!.id }, select: { id: true, name: true, email: true } });
    ok(res, admin);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/overview", async (_req, res, next) => {
  try {
    const [bookings, orders, customers, conversations, revenue, latestBookings, latestOrders, predictions] = await Promise.all([
      prisma.booking.count(),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.conversation.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.booking.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { customer: true } }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { customer: true, items: { include: { menuItem: true } } } }),
      prisma.demandPrediction.findMany({ take: 7, orderBy: { targetDate: "asc" } })
    ]);

    ok(res, {
      stats: {
        bookings,
        orders,
        customers,
        conversations,
        revenue: toNumber(revenue._sum.totalAmount)
      },
      latestBookings,
      latestOrders: latestOrders.map((order) => ({ ...order, totalAmount: toNumber(order.totalAmount) })),
      predictions
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/bookings", async (_req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, include: { customer: true } });
    ok(res, bookings);
  } catch (error) {
    next(error);
  }
});

adminRouter.patch("/bookings/:id/status", async (req, res, next) => {
  try {
    const body = z.object({ status: z.nativeEnum(BookingStatus) }).parse(req.body);
    const booking = await prisma.booking.update({ where: { id: req.params.id }, data: { status: body.status }, include: { customer: true } });
    ok(res, booking);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/orders", async (_req, res, next) => {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { customer: true, items: { include: { menuItem: true } } } });
    ok(res, orders.map((order) => ({ ...order, totalAmount: toNumber(order.totalAmount) })));
  } catch (error) {
    next(error);
  }
});

adminRouter.patch("/orders/:id/status", async (req, res, next) => {
  try {
    const body = z.object({ status: z.nativeEnum(OrderStatus) }).parse(req.body);
    const order = await prisma.order.update({ where: { id: req.params.id }, data: { status: body.status }, include: { customer: true, items: { include: { menuItem: true } } } });
    ok(res, { ...order, totalAmount: toNumber(order.totalAmount) });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/customers", async (_req, res, next) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { bookings: true, orders: true, conversations: true } } }
    });
    ok(res, customers);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/conversations", async (_req, res, next) => {
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { createdAt: "desc" },
      include: { customer: true, messages: { orderBy: { createdAt: "asc" } } }
    });
    ok(res, conversations);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/predictions", async (_req, res, next) => {
  try {
    const predictions = await prisma.demandPrediction.findMany({ orderBy: { targetDate: "asc" }, take: 30 });
    ok(res, predictions);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/contacts", async (_req, res, next) => {
  try {
    const contacts = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    ok(res, contacts);
  } catch (error) {
    next(error);
  }
});
