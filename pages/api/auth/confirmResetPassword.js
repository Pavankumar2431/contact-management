// pages/api/auth/confirmResetPassword.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { connectDB } from '../../../utils/db';

connectDB();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const { token, newPassword } = req.body;

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token or token expired' });
      }
      break;
    }

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
