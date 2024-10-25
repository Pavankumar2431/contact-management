import User from '../../../models/User';
import { hash } from 'bcryptjs';
import { connectDB } from '../../../utils/db';
export default async function handler(req, res) {
    await connectDB();
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    try {
      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        name
      });

      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating user:', error);

      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
