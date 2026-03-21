import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

// 🔔 🔟 NOTIFICATIONS
router.get("/:user_id", authenticateToken, async (req: any, res) => {
  if (req.user.uid !== req.params.user_id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  const snapshot = await db.collection('notifications').where('userId', '==', req.params.user_id).orderBy('timestamp', 'desc').get();
  const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(notifications);
});

router.post("/send", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const notification = {
    ...req.body,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    read: false,
  };
  const docRef = await db.collection('notifications').add(notification);
  res.status(201).json({ id: docRef.id });
});

router.put("/read", authenticateToken, async (req: any, res) => {
  const { notificationId } = req.body;
  await db.collection('notifications').doc(notificationId).update({ read: true });
  res.json({ message: "Notification marked as read" });
});

export default router;
