const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"BigiBank" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    throw error;
  }
};

const sendOTPEmail = async (to, name, otp) => {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #F8FAFC; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0B1F3A 0%, #0066FF 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: #FFC107; margin: 0; font-size: 28px; font-weight: 700;">🏦 BigiBank</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Your Trusted Digital Banking Partner</p>
      </div>
      <div style="padding: 40px 30px;">
        <h2 style="color: #0B1F3A; margin-bottom: 16px;">Hello, ${name}! 👋</h2>
        <p style="color: #6B7280; line-height: 1.6;">Your One-Time Password (OTP) for BigiBank verification is:</p>
        <div style="background: linear-gradient(135deg, #0B1F3A, #0066FF); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <span style="color: #FFC107; font-size: 40px; font-weight: 700; letter-spacing: 12px;">${otp}</span>
        </div>
        <p style="color: #EF4444; font-size: 14px;">⚠️ This OTP is valid for <strong>10 minutes only</strong>. Do not share it with anyone.</p>
        <p style="color: #6B7280; font-size: 14px; margin-top: 24px;">If you didn't request this, please ignore this email or contact our support immediately.</p>
      </div>
      <div style="background: #0B1F3A; padding: 20px 30px; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">© 2024 BigiBank. All rights reserved. | Regulated by RBI</p>
      </div>
    </div>
  `;
  return sendEmail({ to, subject: 'BigiBank OTP Verification', html });
};

const sendWelcomeEmail = async (to, name) => {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #F8FAFC; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0B1F3A 0%, #0066FF 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: #FFC107; margin: 0; font-size: 28px; font-weight: 700;">🏦 BigiBank</h1>
      </div>
      <div style="padding: 40px 30px; text-align: center;">
        <h2 style="color: #0B1F3A;">Welcome to BigiBank, ${name}! 🎉</h2>
        <p style="color: #6B7280; line-height: 1.6;">Your account has been created successfully. You now have access to premium digital banking services.</p>
        <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; margin-top: 24px; background: linear-gradient(135deg, #0066FF, #0B1F3A); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Go to Dashboard →
        </a>
      </div>
      <div style="background: #0B1F3A; padding: 20px 30px; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">© 2024 BigiBank. All rights reserved.</p>
      </div>
    </div>
  `;
  return sendEmail({ to, subject: 'Welcome to BigiBank! 🏦', html });
};

module.exports = { sendEmail, sendOTPEmail, sendWelcomeEmail };
