import express from "express";
import admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";
import { db } from "./firebaseAdmin";

const router = express.Router();

// ⭐ 9️⃣ RATINGS & REVIEWS
router.post("/add", authenticateToken, async (req: any, res) => {
  const rating = {
    ...req.body,
    userId: req.user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('ratings').add(rating);
  res.status(201).json({ id: docRef.id });
});

router.get("/:entity_id", async (req, res) => {
  const snapshot = await db.collection('ratings').where('entityId', '==', req.params.entity_id).get();
  const ratings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(ratings);
});

export default router;
