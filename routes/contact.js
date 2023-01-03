import express from "express";
import Joi from "joi";
import Contact from "../models/Contact.js";

const contactRouter = express.Router();

const contactSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "Link is required",
    "string.uri": "Link must be valid",
  }),
  type: Joi.object()
    .valid("location", "mail", "phone", "linkedin", "website", "github")
    .required()
    .messages({
      "string.empty": "Type is required",
    }),
});

contactRouter.post("/", async (req, res) => {
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
});

contactRouter.post("/update", async (req, res) => {
  const { userId, contactId, ...rest } = req.body;

  const { error } = Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User Id is required",
    }),
    contactId: Joi.string().required().messages({
      "string.empty": "Contact Id is required",
    }),
    name: Joi.string().min(6).max(255).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 6 characters",
      "string.max": "Name must be at most 255 characters",
    }),
    link: Joi.string().uri().required().messages({
      "string.empty": "Link is required",
      "string.uri": "Link must be valid",
    }),
    type: Joi.object()
      .valid("location", "mail", "phone", "linkedin", "website", "github")
      .required()
      .messages({
        "string.empty": "Type is required",
      }),
  }).validate({
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
  
});

contactRouter.post("/delete", async (req, res) => {
  const { userId, contactId } = req.body;

  const { error } = Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User Id is required",
    }),
    contactId: Joi.string().required().messages({
      "string.empty": "Contact Id is required",
    }),
  }).validate({
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
});

contactRouter.get("/", async (req, res) => {
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
});

export default contactRouter;
