import { RESULT } from "../common/constants.js";
import {
  contactSchema,
  deleteContactSchema,
  updateContactSchema,
} from "../utils/contactUtil.js";

import Contact from "../models/Contact.js";

export const getAllContact = async (req, res) => {
  const { userId } = req.body;

  const contact = await Contact.find({ userId });

  if (!contact) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Contact found successfully",
    contact,
  });
};

export const deleteContact = async (req, res) => {
  const { userId, contactId } = req.body;

  const { error } = deleteContactSchema.validate({
    userId,
    contactId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedContact = await Contact.findOneAndDelete({
    userId,
    _id: contactId,
  });

  if (!deletedContact) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Contact deleted successfully",
    contact: deletedContact,
  });
};

export const updateContact = async (req, res) => {
  const { userId, contactId, ...rest } = req.body;

  const { error } = updateContactSchema.validate({
    userId,
    contactId,
    ...rest,
  });

  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { userId, _id: contactId },
      { ...rest },
      { new: true }
    );

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const createContact = async (req, res) => {
  const { error } = contactSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const contact = new Contact({
    ...req.body,
  });

  try {
    const savedContact = await contact.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Contact added successfully",
      contact: savedContact,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Contact already exists",
      error,
    });
  }
};
