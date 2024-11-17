import axios from "axios";

const sendEmail = async ({ toEmail, toName, subject, htmlContent }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Pixibble",
          email: "manishthakur231690@gmail.com",
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.EMAIL_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const sendWelcomeEmail = async (userEmail, userName, token) => {
  const subject = "Welcome to Pixibble, Setup your password";
  const htmlContent = `
    <html>
      <head></head> 
      <body>
        <p>Hello ${userName},</p>
        <p>Welcome to Pixibble! Click the link below to set your password:</p>
        <br>
        <a href="${process.env.NEXTAUTH_URL}/auth/setup-password?token=${token}" target="_blank">Set up your password</a>
        <br>
        <p>To unsubscribe from future emails, click <a href="#">here</a>.</p>
      </body>
    </html>
  `;

  await sendEmail({
    toEmail: userEmail,
    toName: userName,
    subject: subject,
    htmlContent: htmlContent,
  });
};

export const sendForgotPasswordEmail = async (userEmail, userName, token) => {
  const subject = "Reset your password, Humix";
  const htmlContent = `
    <html>
      <head></head>
      <body>
        <p>Hello ${userName},</p>
        <p>Welcome to Humix! Click the link below to reset your password:</p>
        <br>
        <a href="${process.env.NEXTAUTH_URL}/auth/setup-password?token=${token}" target="_blank">Reset your password</a>
        <br>
        <p>To unsubscribe from future emails, click <a href="#">here</a>.</p>
      </body>
    </html>
  `;

  await sendEmail({
    toEmail: userEmail,
    toName: userName,
    subject: subject,
    htmlContent: htmlContent,
  });
};
