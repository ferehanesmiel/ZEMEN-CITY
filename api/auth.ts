import express from "express";
import jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import { authenticateToken } from "./middleware";

const router = express.Router();
const db = admin.firestore();
const auth = admin.auth();
const JWT_SECRET = process.env.JWT_SECRET || "zemen-digital-city-secret-key-2026";

router.post("/register", async (req, res) => {
  const { email, password, name, phone, role } = req.body;
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    const userProfile = {
      uid: userRecord.uid,
      name,
      email,
      phone,
      role: role || 'customer',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('users').doc(userRecord.uid).set(userProfile);
    
    // Create wallet
    await db.collection('wallets').doc(userRecord.uid).set({
      userId: userRecord.uid,
      balance: 100, // Initial bonus
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "User registered", uid: userRecord.uid });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // In a real app, we'd use Firebase Auth client-side to get an ID token
    // and then verify it here. For this REST demo, we'll simulate it.
    const userRecord = await auth.getUserByEmail(email);
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    const role = userDoc.exists ? userDoc.data()!.role : 'customer';

    const token = jwt.sign({ uid: userRecord.uid, email: userRecord.email, role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, uid: userRecord.uid, role });
  } catch (error: any) {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

router.get("/me", authenticateToken, async (req: any, res) => {
  const userDoc = await db.collection('users').doc(req.user.uid).get();
  if (!userDoc.exists) return res.status(404).json({ error: "User not found" });
  res.json(userDoc.data());
});

export default router;
