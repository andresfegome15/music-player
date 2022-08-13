const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const pug = require("pug");
const path = require("path");
const { htmlToText } = require("html-to-text");

dotenv.config({ path: "./config.env" });

class Email {
  constructor(to) {
    this.to = to;
  }

  newTransport() {
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "apikey",
          pass: process.env.SENGRID_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async send(template, subject, mailData) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
      mailData
    );

    await this.newTransport().sendMail({
      from: process.env.MAIL_FROM,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  async sendWelcome(name) {
    await this.send("welcome", "Full satck developer junior", { name });
  }
}

module.exports = { Email };
