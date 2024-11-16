import express from 'express';
import Contact from '../models/Contact.js';
import { getErrorResponse, getSuccessResponse } from '../utils/response.js';

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle
    });
    await contact.save();
    return res.send(getSuccessResponse("Seccess", contact));
  } catch (error) {
    return res.send(getErrorResponse(error.message));
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.send(getSuccessResponse("Seccess", contacts));
  } catch (error) {
    return res.send(getErrorResponse(error.message));
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phoneNumber, company, jobTitle },
      { new: true }
    );
    if (!contact) {
        return res.send(getErrorResponse("contact not found"));
    }
    return res.send(getSuccessResponse("Seccess", contact));
  } catch (error) {
    return res.send(getErrorResponse(error.message));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    return res.send(getSuccessResponse("Seccess"));
  } catch (error) {
    return res.send(getErrorResponse(error.message));
  }
});

export default router;
