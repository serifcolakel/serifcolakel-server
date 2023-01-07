import { RESULT } from "../common/constants.js";
import {
  deleteLanguageSchema,
  languageSchema,
  updateLanguageSchema,
} from "../utils/languageUtil.js";

import Language from "../models/Language.js";

export const getAllLanguage = async (req, res) => {
  const { userId } = req.body;

  const languages = await Language.find({ userId });

  if (!languages) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "languages not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: `${languages.length} languages found`,
    languages,
  });
};

export const createLanguage = async (req, res) => {
  const { error } = languageSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const language = new Language({
    ...req.body,
  });

  try {
    const savedLanguage = await language.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Language added successfully",
      savedLanguage,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Language already exists",
      error,
    });
  }
};

export const updateLanguage = async (req, res) => {
  const { userId, languageId, ...rest } = req.body;

  const { error } = updateLanguageSchema.validate({
    userId,
    languageId,
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
    const updatedLanguage = await Language.findOneAndUpdate(
      { userId, _id: languageId },
      { ...rest },
      { new: true }
    );

    if (!updatedLanguage) {
      return res.status(400).json({
        result: RESULT.ERROR,
        message: "Language not found",
      });
    }

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Language updated successfully",
      updatedLanguage,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteLanguage = async (req, res) => {
  const { userId, languageId } = req.body;

  const { error } = deleteLanguageSchema.validate({
    userId,
    languageId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedLanguage = await Language.findOneAndDelete({
    userId,
    _id: languageId,
  });

  if (!deletedLanguage) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Language not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Language deleted successfully",
    deletedLanguage,
  });
};
