import nodeMailer from "nodemailer";
import { STATUS } from "../common/constants.js";
import dotenv from "dotenv";
dotenv.config();

import { sendEmailSchema } from "../utils/emailUtil.js";

const { NODE_MAILLER_EMAIL, NODE_MAILLER_PASSWORD } = process.env;

export const handleSendEmail = (req, res) => {
  const { fullName, email, message, phone } = req.body;

  // validate
  const { error } = sendEmailSchema.validate({
    fullName,
    email,
    message,
    phone,
  });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message.replace(/"/g, "") });
  }

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: NODE_MAILLER_EMAIL,
      pass: NODE_MAILLER_PASSWORD,
    },
  });
  const mailOptions = {
    from: email,
    to: NODE_MAILLER_EMAIL,
    subject: `Message from ${fullName}`,
    html: `
      <div style=" background-color: #000; color: #000; display: flex; justify-content: center; align-items: center; padding: 120px 0px;">
        <div style="width: 80%;border: 1px solid #000; text-align: center; padding: 10px; border-radius: 20px; background-image: linear-gradient(to right, #FE8D64, #A1705E);">
          <h1 style="font-family: 'Courier New', Courier, monospace; font-size: 20px;">Merhaba Şerif, ben <span style="color: #000;">${fullName}.</span></h1>
          <h2 style="font-family: 'Courier New', Courier, monospace; font-size: 14px;">${message}</h2>
          <div style="margin: 40px;color: #000;">
            <h3 style=" font-family: 'Courier New', Courier, monospace;">Bana Aşağıdaki Linklerden ulaşabilirsiniz.</h3>
            <a href="mailto:${email}" style="background-color: #000; padding: 10px 25px; border-radius: 5px; margin-right: 5px; text-decoration: none;">Yanıtla</a>
            <a href="tel:${phone}" style="background-color: #000; padding: 10px 25px; border-radius: 5px; margin-right: 5px; text-decoration: none;">Arayın</a>
          </div>
        </div>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.status(500).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    } else {
      res.json({
        status: STATUS.SUCCESS,
        message: "Email has been sent, i will contact you as soon as possible.",
      });
    }
  });
};
