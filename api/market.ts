import express from "express";
import admin from "firebase-admin";
import { authenticateToken, authorizeRole } from "./middleware";
import { db } from "./firebaseAdmin";

const router = express.Router();

// 🛒 4️⃣ SMART MARKET (SHOPS & PRODUCTS)
router.post("/shops/create", authenticateToken, async (req: any, res) => {
  const shop = {
    ...req.body,
    ownerId: req.user.uid,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('shops').add(shop);
  res.status(201).json({ id: docRef.id });
});

router.get("/shops", async (req, res) => {
  const snapshot = await db.collection('shops').where('status', '==', 'approved').get();
  const shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(shops);
});

router.get("/shops/:id", async (req, res) => {
  const doc = await db.collection('shops').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Shop not found" });
  res.json(doc.data());
});

router.put("/shops/:id", authenticateToken, async (req: any, res) => {
  const doc = await db.collection('shops').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Shop not found" });
  if (doc.data()!.ownerId !== req.user.uid && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  await db.collection('shops').doc(req.params.id).update(req.body);
  res.json({ message: "Shop updated" });
});

router.post("/products/add", authenticateToken, async (req: any, res) => {
  const product = {
    ...req.body,
    ownerId: req.user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection('products').add(product);
  res.status(201).json({ id: docRef.id });
});

router.get("/products", async (req, res) => {
  const snapshot = await db.collection('products').get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const doc = await db.collection('products').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Product not found" });
  res.json(doc.data());
});

router.put("/products/:id", authenticateToken, async (req: any, res) => {
  await db.collection('products').doc(req.params.id).update(req.body);
  res.json({ message: "Product updated" });
});

router.delete("/products/:id", authenticateToken, async (req: any, res) => {
  await db.collection('products').doc(req.params.id).delete();
  res.json({ message: "Product deleted" });
});

export default router;
