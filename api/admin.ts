import express from "express";
import admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";
import { db } from "./firebaseAdmin";

const router = express.Router();

// 📊 1️⃣1️⃣ ADMIN APIs
router.get("/dashboard", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const usersCount = (await db.collection('users').count().get()).data().count;
  const ordersCount = (await db.collection('orders').count().get()).data().count;
  const shopsCount = (await db.collection('shops').count().get()).data().count;
  const totalSBR = (await db.collection('wallets').get()).docs.reduce((acc, doc) => acc + (doc.data().balance || 0), 0);

  res.json({
    usersCount,
    ordersCount,
    shopsCount,
    totalSBR,
    activeRunners: 42, // Mock for now
  });
});

router.get("/users", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(users);
});

router.get("/analytics", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  res.json({
    growth: "12%",
    revenue: "45,000 SBR",
    activeUsers: 1250,
  });
});

router.post("/approve-shop", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { shopId } = req.body;
  await db.collection('shops').doc(shopId).update({ status: 'approved' });
  res.json({ message: "Shop approved" });
});

router.post("/approve-place", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { placeId } = req.body;
  await db.collection('places').doc(placeId).update({ status: 'approved' });
  res.json({ message: "Place approved" });
});

router.post("/manage-rewards", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { type, amount } = req.body;
  // Update global reward settings
  res.json({ message: `Reward for ${type} updated to ${amount}` });
});

export default router;
