import Contact from "../models/Contact.js";
import {
  contactSchema,
  deleteContactSchema,
  updateContactSchema,
} from "../utils/contactUtil.js";

export const getAllContact = async (req, res) => {
  const { userId } = req.body;

  const contact = await Contact.find({ userId });

  if (!contact) {
    return res.status(400).json({
      title: "Cannot find",
      message: "Contact not found",
    });
  }

  res.status(200).json({
    title: "Contact found",
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
      title: "Validation Error",
      message: error.details[0].message,
      //...error,
    });
  }

  const deletedContact = await Contact.findOneAndDelete({
    userId,
    _id: contactId,
  });

  if (!deletedContact) {
    return res.status(400).json({
      title: "Cannot delete",
      message: "Contact not found",
    });
  }

  res.status(200).json({
    title: "Contact deleted",
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
      title: "Validation Error",
      message: error.details[0].message,
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
      title: "Contact updated",
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(400).json({
      title: "Cannot update",
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
      title: "Validation Error",
      message: error.details[0].message,
      //...error,
    });
  }

  const contact = new Contact({
    ...req.body,
  });

  try {
    const savedContact = await contact.save();
    res.status(200).json({
      title: "Contact added",
      message: "Contact added successfully",
      contact: savedContact,
    });
  } catch (error) {
    res.status(400).json({
      title: "Cannot add contact",
      message: "Contact already exists",
      error,
    });
  }
};
