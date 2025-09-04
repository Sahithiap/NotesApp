import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '..User.js';
import { isEmail } from '../utils/validate.js';

const router = Router();


router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
if (!isEmail(email)) return res.status(400).json({ error: 'Invalid email' });


const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ error: 'Email already registered' });


const passwordHash = await bcrypt.hash(password, 12);
const user = await User.create({ name, email, passwordHash });
const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Server error' });
}
});


router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Server error' });
}
});


router.get('/me', async (req, res) => {
res.json({ ok: true });
});


export default router;