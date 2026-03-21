import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

// 📍 7️⃣ LIVE TRACKING (REAL-TIME)
router.post("/update-location", authenticateToken, authorizeRole(['rider', 'admin']), async (req: any, res) => {
  const { deliveryId, lat, lng } = req.body;
  await db.collection('deliveries').doc(deliveryId).update({
    currentLocation: { lat, lng },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Broadcast via WebSocket (handled in server.ts)
  res.json({ status: "Location updated" });
});

router.get("/:delivery_id", authenticateToken, async (req: any, res) => {
  const doc = await db.collection('deliveries').doc(req.params.delivery_id).get();
  if (!doc.exists) return res.status(404).json({ error: "Delivery not found" });
  res.json(doc.data()!.currentLocation || { lat: 0, lng: 0 });
});

export default router;
