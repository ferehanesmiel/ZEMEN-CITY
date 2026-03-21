import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

// 🛵 6️⃣ RUNNER LINK (DELIVERIES)
router.post("/request", authenticateToken, async (req: any, res) => {
  const delivery = {
    ...req.body,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('deliveries').add(delivery);
  res.status(201).json({ id: docRef.id });
});

router.get("/list", authenticateToken, async (req: any, res) => {
  const snapshot = await db.collection('deliveries').where('status', '==', 'pending').get();
  const deliveries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(deliveries);
});

router.post("/accept", authenticateToken, authorizeRole(['rider', 'admin']), async (req: any, res) => {
  const { deliveryId } = req.body;
  await db.collection('deliveries').doc(deliveryId).update({
    status: 'assigned',
    riderId: req.user.uid,
    assignedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  res.json({ message: "Delivery accepted" });
});

router.post("/update-status", authenticateToken, authorizeRole(['rider', 'admin']), async (req: any, res) => {
  const { deliveryId, status } = req.body;
  await db.collection('deliveries').doc(deliveryId).update({ status });
  
  if (status === 'completed') {
    const delDoc = await db.collection('deliveries').doc(deliveryId).get();
    const riderId = delDoc.data()!.riderId;
    const reward = 15; // Fixed reward for now
    
    // Credit rider wallet
    await db.collection('wallets').doc(riderId).update({
      balance: admin.firestore.FieldValue.increment(reward),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    await db.collection('transactions').add({
      userId: riderId,
      amount: reward,
      description: `Delivery reward for ${deliveryId}`,
      type: 'earn',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed'
    });
  }
  
  res.json({ message: "Delivery status updated" });
});

router.get("/:id", authenticateToken, async (req: any, res) => {
  const doc = await db.collection('deliveries').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Delivery not found" });
  res.json(doc.data());
});

export default router;
