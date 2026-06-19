import http from "node:http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { env } from "./lib/env.js";
import { handleChat } from "./services/chat.service.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [env.CLIENT_URL, env.ADMIN_URL],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.emit("connected", { message: "DK's Cafe socket connected." });

  socket.on("chat:message", async (payload: { message: string; name?: string; email?: string; phone?: string }) => {
    try {
      const result = await handleChat(payload);
      socket.emit("chat:reply", result);
      io.emit("admin:conversation:new", { conversationId: result.conversationId });
    } catch (error) {
      socket.emit("chat:error", { message: "Unable to process chat message." });
      console.error(error);
    }
  });
});

server.listen(env.PORT, () => {
  console.log(`DK's Cafe API running on http://localhost:${env.PORT}`);
});
