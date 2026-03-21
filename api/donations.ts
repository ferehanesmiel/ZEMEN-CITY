import express from "express";
import * as admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";

const router = express.Router();
const db = admin.firestore();

// ❤️ 8️⃣ BLOOMING HEART (DONATIONS)
router.post("/create", authenticateToken, authorizeRole(['admin']), async (req: any, res) => {
  const donation = {
    ...req.body,
    status: 'active',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('donations').add(donation);
  res.status(201).json({ id: docRef.id });
});

router.get("/", async (req, res) => {
  const snapshot = await db.collection('donations').get();
  const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(donations);
});

router.post("/contribute", authenticateToken, async (req: any, res) => {
  const { donationId, amount } = req.body;
  const userId = req.user.uid;

  try {
    await db.runTransaction(async (t) => {
      const walletRef = db.collection('wallets').doc(userId);
      const donationRef = db.collection('donations').doc(donationId);
      
      const walletDoc = await t.get(walletRef);
      const donationDoc = await t.get(donationRef);

      if (!walletDoc.exists || !donationDoc.exists) throw new Error("Wallet or Donation not found");
      if (walletDoc.data()!.balance < amount) throw new Error("Insufficient balance");

      t.update(walletRef, { balance: admin.firestore.FieldValue.increment(-amount) });
      t.update(donationRef, { currentAmount: admin.firestore.FieldValue.increment(amount) });

      const txRef = db.collection('transactions').doc();
      t.set(txRef, {
        userId,
        donationId,
        amount: -amount,
        description: `Donation to ${donationDoc.data()!.title}`,
        type: 'donation',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'completed'
      });
    });
    res.json({ message: "Donation successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const doc = await db.collection('donations').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Donation not found" });
  res.json(doc.data());
});

export default router;
