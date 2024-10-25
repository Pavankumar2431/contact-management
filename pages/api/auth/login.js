// pages/api/auth/login.js
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
