// pages/api/auth/reset-password.js
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, newPassword } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Simulate password reset process
      user.password = await hash(newPassword, 10);
      await user.save();

      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
