const { Resend } = require("resend");

const resend = new Resend("re_KbqLhcMt_BpYJuwFJ9nHkggxp7eUTQssY");

const sendVerificationEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const emailContent = `<p>Hello, Shiva</p><p>Please verify your email by clicking.</p>`;

sendVerificationEmail("manishthakur.dev@gmail.com", "Verify Your Email", emailContent);
