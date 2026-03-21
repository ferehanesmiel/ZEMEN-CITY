import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

// 📦 5️⃣ ORDERS (MARKET → DELIVERY)
router.post("/create", authenticateToken, async (req: any, res) => {
  const order = {
    ...req.body,
    userId: req.user.uid,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('orders').add(order);
  
  // Trigger delivery request automatically
  await db.collection('deliveries').add({
    orderId: docRef.id,
    userId: req.user.uid,
    status: 'pending',
    pickupLocation: req.body.pickupLocation,
    dropoffLocation: req.body.dropoffLocation,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.status(201).json({ id: docRef.id });
});

router.get("/:user_id", authenticateToken, async (req: any, res) => {
  if (req.user.uid !== req.params.user_id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  const snapshot = await db.collection('orders').where('userId', '==', req.params.user_id).get();
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(orders);
});

router.get("/:id", authenticateToken, async (req: any, res) => {
  const doc = await db.collection('orders').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Order not found" });
  res.json(doc.data());
});

router.put("/:id/status", authenticateToken, async (req: any, res) => {
  const { status } = req.body;
  await db.collection('orders').doc(req.params.id).update({ status });
  res.json({ message: "Order status updated" });
});

export default router;
