import express from "express";
import admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";
import { db } from "./firebaseAdmin";

const router = express.Router();

// 🗺️ 3️⃣ ZEMEN SCOUTS (PLACES & TASKS)
router.post("/places/add", authenticateToken, async (req: any, res) => {
  const place = {
    ...req.body,
    createdBy: req.user.uid,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('places').add(place);
  res.status(201).json({ id: docRef.id });
});

router.get("/places", async (req, res) => {
  const snapshot = await db.collection('places').get();
  const places = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(places);
});

router.get("/places/:id", async (req, res) => {
  const doc = await db.collection('places').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Place not found" });
  res.json(doc.data());
});

router.put("/places/:id", authenticateToken, async (req: any, res) => {
  await db.collection('places').doc(req.params.id).update(req.body);
  res.json({ message: "Place updated" });
});

router.post("/places/verify", authenticateToken, authorizeRole(['admin', 'scout']), async (req: any, res) => {
  const { placeId, status } = req.body;
  await db.collection('places').doc(placeId).update({ status, verifiedBy: req.user.uid });
  res.json({ message: "Place verified" });
});

router.post("/tasks/create", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const task = {
    ...req.body,
    status: 'active',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('tasks').add(task);
  res.status(201).json({ id: docRef.id });
});

router.get("/tasks", async (req, res) => {
  const snapshot = await db.collection('tasks').where('status', '==', 'active').get();
  const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(tasks);
});

router.post("/tasks/submit", authenticateToken, async (req: any, res) => {
  const submission = {
    ...req.body,
    userId: req.user.uid,
    status: 'pending',
    submittedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('submissions').add(submission);
  res.status(201).json({ id: docRef.id });
});

router.get("/tasks/submissions", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const snapshot = await db.collection('submissions').get();
  const submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(submissions);
});

router.post("/tasks/approve", authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { submissionId, reward } = req.body;
  const subDoc = await db.collection('submissions').doc(submissionId).get();
  if (!subDoc.exists) return res.status(404).json({ error: "Submission not found" });
  
  const userId = subDoc.data()!.userId;
  await db.collection('submissions').doc(submissionId).update({ status: 'approved' });
  
  // Credit wallet
  await db.collection('wallets').doc(userId).update({
    balance: admin.firestore.FieldValue.increment(reward),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  
  res.json({ message: "Submission approved and reward sent" });
});

export default router;
