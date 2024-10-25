import Contact from '../../../models/Contact';
import authMiddleware from '../../../utils/authMiddleware';

export default async function handler(req, res) {
  await authMiddleware(req, res, async () => {
    const userid = req.user.id; // Assuming req.user contains the authenticated user information

    // GET method to fetch all contacts for the authenticated user
    if (req.method === 'GET') {
      try {
        const contacts = await Contact.findAll({ where: { userid } });
        return res.status(200).json({ contacts });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching contacts', error: error.message });
      }
    }

    // Add Contact(s) (POST method)
    else if (req.method === 'POST') {
      const contacts = Array.isArray(req.body.contacts) ? req.body.contacts : [req.body];

      try {
        const createdContacts = await Promise.all(
          contacts.map(async (contactData) => {
            const { name, email, phone, address, timezone } = contactData;
            const contact = await Contact.create({
              name,
              email,
              phone,
              address,
              timezone,
              userid, // Associate each contact with the authenticated user's id
            });
            return contact;
          })
        );

        return res.status(201).json({
          message: `Contact${contacts.length > 1 ? 's' : ''} added successfully`,
          contacts: createdContacts,
        });
      } catch (error) {
        return res.status(400).json({ message: 'Error adding contact(s)', error: error.message });
      }
    }

    // Update Contact(s) (PUT method)
    else if (req.method === 'PUT') {
      const { id } = req.query; // Assuming the contact ID is passed as a query parameter
      const contacts = Array.isArray(req.body.contacts) ? req.body.contacts : [req.body];

      try {
        const updatedContacts = await Promise.all(
          contacts.map(async (contactData) => {
            const { name, email, phone, address, timezone } = contactData;

            const contact = await Contact.findOne({
              where: { id, userid }, // Ensure the contact belongs to the authenticated user
            });

            if (!contact) {
              return { id, status: 'Contact not found' }; // Handle if a contact doesn't exist
            }

            await contact.update({ name, email, phone, address, timezone });
            return { id, status: 'Updated successfully', contact };
          })
        );

        return res.status(200).json({
          message: `Contact${contacts.length > 1 ? 's' : ''} updated successfully`,
          contacts: updatedContacts,
        });
      } catch (error) {
        return res.status(400).json({ message: 'Error updating contact(s)', error: error.message });
      }
    }

    // Delete Contact(s) (DELETE method)
    else if (req.method === 'DELETE') {
      const { id } = req.query; // Assuming the contact ID is passed as a query parameter

      try {
        const contact = await Contact.findOne({ where: { id, userid } });
        if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
        await contact.destroy(); // Delete the contact
        return res.status(200).json({ message: 'Contact deleted successfully' });
      } catch (error) {
        return res.status(400).json({ message: 'Error deleting contact', error: error.message });
      }
    }

    // Handle unsupported methods
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
