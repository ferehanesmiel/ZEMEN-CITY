import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";
import * as admin from "firebase-admin";
import firebaseConfig from './firebase-applet-config.json' assert { type: 'json' };

// Import routes
import authRoutes from "./api/auth";
import userRoutes from "./api/users";
import walletRoutes from "./api/wallet";
import scoutRoutes from "./api/scouts";
import marketRoutes from "./api/market";
import orderRoutes from "./api/orders";
import deliveryRoutes from "./api/delivery";
import trackingRoutes from "./api/tracking";
import donationRoutes from "./api/donations";
import ratingRoutes from "./api/ratings";
import notificationRoutes from "./api/notifications";
import adminRoutes from "./api/admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();

async function startServer() {
  const app = express();
  const PORT = 3000;
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  // --- API ROUTES ---
  const apiRouter = express.Router();

  apiRouter.use("/auth", authRoutes);
  apiRouter.use("/users", userRoutes);
  apiRouter.use("/wallet", walletRoutes);
  apiRouter.use("/scouts", scoutRoutes);
  apiRouter.use("/market", marketRoutes);
  apiRouter.use("/orders", orderRoutes);
  apiRouter.use("/delivery", deliveryRoutes);
  apiRouter.use("/tracking", trackingRoutes);
  apiRouter.use("/donations", donationRoutes);
  apiRouter.use("/ratings", ratingRoutes);
  apiRouter.use("/notifications", notificationRoutes);
  apiRouter.use("/admin", adminRoutes);

  app.use("/api/v1", apiRouter);

  // --- WEBSOCKET SERVER ---
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Map<string, Set<any>>(); // deliveryId -> Set of clients

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws, request) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const deliveryId = url.searchParams.get('deliveryId');

    if (deliveryId) {
      if (!clients.has(deliveryId)) clients.set(deliveryId, new Set());
      clients.get(deliveryId)!.add(ws);

      ws.on('close', () => {
        clients.get(deliveryId)?.delete(ws);
        if (clients.get(deliveryId)?.size === 0) clients.delete(deliveryId);
      });
    }
  });

  // Export broadcast function for use in routes if needed
  // (In this setup, we'll just use the DB to trigger events or manual calls)
  
  // Real-time Event simulation for the demo
  setInterval(async () => {
    // Simulate a new task or order occasionally
  }, 30000);

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Zemen Digital City API running on http://localhost:${PORT}`);
  });
}

startServer();
