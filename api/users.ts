import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

router.get("/:id", authenticateToken, async (req, res) => {
  const userDoc = await db.collection('users').doc(req.params.id).get();
  if (!userDoc.exists) return res.status(404).json({ error: "User not found" });
  res.json(userDoc.data());
});

router.put("/:id", authenticateToken, async (req: any, res) => {
  if (req.user.uid !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  await db.collection('users').doc(req.params.id).update(req.body);
  res.json({ message: "User updated" });
});

router.delete("/:id", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  await db.collection('users').doc(req.params.id).delete();
  res.json({ message: "User deleted" });
});

export default router;
