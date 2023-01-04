import Reference from "../models/Reference.js";
import {
  deleteReferenceSchema,
  referenceSchema,
  updateReferenceSchema,
} from "../utils/referenceUtil.js";

export const getAllReference = async (req, res) => {
  const { userId } = req.body;

  const reference = await Reference.find({ userId });

  if (!reference) {
    return res.status(400).json({
      title: "Cannot find",
      message: "Reference not found",
    });
  }

  res.status(200).json({
    title: "Reference found",
    message: "Reference found successfully",
    reference,
  });
};

export const createReference = async (req, res) => {
  const { error } = referenceSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      title: "Validation Error",
      message: error.details[0].message,
      //...error,
    });
  }

  const reference = new Reference({
    ...req.body,
  });

  try {
    const savedReference = await reference.save();
    res.status(200).json({
      title: "Reference added",
      message: "Reference added successfully",
      reference: savedReference,
    });
  } catch (error) {
    res.status(400).json({
      title: "Cannot add reference",
      message: "Reference already exists",
      error,
    });
  }
};

export const updateReference = async (req, res) => {
  const { userId, referenceId, ...rest } = req.body;

  const { error } = updateReferenceSchema.validate({
    userId,
    referenceId,
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
    const updatedReference = await Reference.findOneAndUpdate(
      { userId, _id: referenceId },
      { ...rest },
      { new: true }
    );

    res.status(200).json({
      title: "Reference updated",
      message: "Reference updated successfully",
      updatedReference,
    });
  } catch (error) {
    res.status(400).json({
      title: "Cannot update",
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteReference = async (req, res) => {
  const { userId, referenceId } = req.body;

  const { error } = deleteReferenceSchema.validate({
    userId,
    referenceId,
  });
  if (error) {
    return res.status(400).json({
      title: "Validation Error",
      message: error.details[0].message,
      //...error,
    });
  }

  const deletedReference = await Reference.findOneAndDelete({
    userId,
    _id: referenceId,
  });

  if (!deletedReference) {
    return res.status(400).json({
      title: "Cannot delete",
      message: "reference not found",
    });
  }

  res.status(200).json({
    title: "reference deleted",
    message: "reference deleted successfully",
    deletedReference,
  });
};
