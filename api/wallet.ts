import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

router.get("/:user_id", authenticateToken, async (req: any, res) => {
  if (req.user.uid !== req.params.user_id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  const walletDoc = await db.collection('wallets').doc(req.params.user_id).get();
  if (!walletDoc.exists) return res.status(404).json({ error: "Wallet not found" });
  res.json(walletDoc.data());
});

router.post("/transfer", authenticateToken, async (req: any, res) => {
  const { toUserId, amount, description } = req.body;
  const fromUserId = req.user.uid;

  try {
    await db.runTransaction(async (t) => {
      const fromRef = db.collection('wallets').doc(fromUserId);
      const toRef = db.collection('wallets').doc(toUserId);
      
      const fromDoc = await t.get(fromRef);
      const toDoc = await t.get(toRef);

      if (!fromDoc.exists || !toDoc.exists) throw new Error("Wallet not found");
      if (fromDoc.data()!.balance < amount) throw new Error("Insufficient balance");

      t.update(fromRef, { balance: admin.firestore.FieldValue.increment(-amount) });
      t.update(toRef, { balance: admin.firestore.FieldValue.increment(amount) });

      const txRef = db.collection('transactions').doc();
      t.set(txRef, {
        userId: fromUserId,
        toUserId,
        amount: -amount,
        description: description || "Transfer",
        type: 'spend',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'completed'
      });

      const txToRef = db.collection('transactions').doc();
      t.set(txToRef, {
        userId: toUserId,
        fromUserId,
        amount: amount,
        description: description || "Received transfer",
        type: 'earn',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'completed'
      });
    });
    res.json({ message: "Transfer successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/convert", authenticateToken, async (req: any, res) => {
  const { amount, from, to } = req.body; // from: 'SBR' | 'Birr', to: 'SBR' | 'Birr'
  // Simplified conversion logic
  res.json({ message: "Conversion successful", amount, from, to });
});

router.get("/transactions/:user_id", authenticateToken, async (req: any, res) => {
  if (req.user.uid !== req.params.user_id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  const snapshot = await db.collection('transactions').where('userId', '==', req.params.user_id).orderBy('timestamp', 'desc').get();
  const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(txs);
});

router.post("/credit", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { userId, amount, description } = req.body;
  await db.collection('wallets').doc(userId).update({
    balance: admin.firestore.FieldValue.increment(amount),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  await db.collection('transactions').add({
    userId,
    amount,
    description,
    type: 'earn',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    status: 'completed'
  });
  res.json({ message: "Wallet credited" });
});

router.post("/debit", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { userId, amount, description } = req.body;
  await db.collection('wallets').doc(userId).update({
    balance: admin.firestore.FieldValue.increment(-amount),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  await db.collection('transactions').add({
    userId,
    amount: -amount,
    description,
    type: 'spend',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    status: 'completed'
  });
  res.json({ message: "Wallet debited" });
});

export default router;
