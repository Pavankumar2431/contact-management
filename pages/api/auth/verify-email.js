// pages/api/auth/verify-email.js
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Simulate email verification process
      user.isVerified = true; // Mark as verified in the database
      await user.save();

      return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
