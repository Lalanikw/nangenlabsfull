// lib/emailService.js

import nodemailer from 'nodemailer';

// Email service configuration
const createTransporter = () => {
  // Gmail configuration (easiest for setup)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your-email@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
      },
    });
  }

  // SendGrid configuration (for production)
  if (process.env.EMAIL_SERVICE === 'sendgrid') {
    return nodemailer.createTransporter({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Default SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send contact form emails (notification + confirmation)
export const sendContactEmails = async (contactData) => {
  try {
    const transporter = createTransporter();
    const { fullname, email, phone, company, subject, message, id, createdAt } = contactData;
    
    // 1. NOTIFICATION EMAIL TO YOU (Your inbox alert)
    const notificationEmail = {
      from: {
        name: 'NanGenLabs Contact Form',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 New Contact: ${fullname}${subject ? ` - ${subject}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">NanGenLabs Website</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 30%;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b;">${fullname}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; color: #1e293b;">${phone}</td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Company:</td>
                <td style="padding: 8px 0; color: #1e293b;">${company}</td>
              </tr>
              ` : ''}
              ${subject ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Subject:</td>
                <td style="padding: 8px 0; color: #1e293b;">${subject}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Submitted:</td>
                <td style="padding: 8px 0; color: #1e293b;">${new Date(createdAt).toLocaleString()}</td>
              </tr>
            </table>
            
            <h3 style="color: #1e293b; margin: 25px 0 15px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Message</h3>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #334155;">${message}</p>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="mailto:${email}?subject=Re: ${subject || 'Your inquiry'}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                📧 Reply to ${fullname}
              </a>
            </div>
            
            <div style="background: #e0f2fe; padding: 12px; border-radius: 6px; text-align: center; margin-top: 20px;">
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                <strong>Contact ID:</strong> ${id} | <strong>Database:</strong> MongoDB
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
🔔 NEW CONTACT FORM SUBMISSION - NanGenLabs

CONTACT INFORMATION:
- Name: ${fullname}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}
${company ? `- Company: ${company}` : ''}
${subject ? `- Subject: ${subject}` : ''}
- Submitted: ${new Date(createdAt).toLocaleString()}

MESSAGE:
${message}

REPLY TO: ${email}
CONTACT ID: ${id}
      `
    };

    // 2. CONFIRMATION EMAIL TO USER (Thank you message)
    const confirmationEmail = {
      from: {
        name: 'NanGenLabs',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: email,
      subject: `Thank you for contacting NanGenLabs${subject ? ` - ${subject}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">NanGenLabs</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Thank you for reaching out!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Hello ${fullname}! 👋</h2>
            
            <p style="color: #475569; line-height: 1.6;">
              Thank you for contacting NanGenLabs! We've successfully received your message and appreciate your interest in our technology solutions.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #2563eb; font-size: 18px;">📋 Your Message Details</h3>
              ${subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Submitted:</strong> ${new Date(createdAt).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p style="margin: 8px 0;"><strong>Reference ID:</strong> ${String(id).slice(-8)}</p>
            </div>
            
            <h3 style="color: #1e293b; margin: 25px 0 15px 0;">⏰ What Happens Next?</h3>
            <ul style="color: #64748b; line-height: 1.8; padding-left: 20px;">
              <li>Our team will review your message within <strong>24 hours</strong></li>
              <li>We'll respond directly to this email address</li>
              <li>If needed, we'll schedule a call to discuss your requirements</li>
              <li>You'll receive a detailed response about how we can help</li>
            </ul>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>💡 Need immediate assistance?</strong><br>
                Call us at <strong>+1 (555) 123-4567</strong> during business hours<br>
                <em>Monday & Wednesday: 2:00 PM - 6:00 PM EST</em>
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px;">
              <h4 style="margin: 0 0 15px 0; color: #1e293b;">Ready to get started?</h4>
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">
                Explore our services while you wait for our response
              </p>
              <a href="https://nangenlabs.com/services" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px;">
                🚀 View Our Services
              </a>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px; background: #f1f5f9;">
            <p style="margin: 0 0 10px 0;"><strong>NanGenLabs</strong><br>
            <em>Empowering Digital Transformation with Cutting-Edge Technology</em></p>
            
            <p style="margin: 0;">
              📧 <a href="mailto:hello@nangenlabs.com" style="color: #2563eb;">hello@nangenlabs.com</a> | 
              📱 +1 (555) 123-4567<br>
              🌐 <a href="https://nangenlabs.com" style="color: #2563eb;">www.nangenlabs.com</a>
            </p>
            
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #94a3b8;">
              You received this email because you contacted us through our website.<br>
              Please don't reply to this email - we'll respond from our main email address.
            </p>
          </div>
        </div>
      `,
      text: `
Hello ${fullname}!

Thank you for contacting NanGenLabs! We've successfully received your message and appreciate your interest in our technology solutions.

YOUR MESSAGE DETAILS:
${subject ? `Subject: ${subject}` : ''}
Submitted: ${new Date(createdAt).toLocaleDateString()}
Reference ID: ${String(id).slice(-8)}

WHAT HAPPENS NEXT?
• Our team will review your message within 24 hours
• We'll respond directly to this email address
• If needed, we'll schedule a call to discuss your requirements
• You'll receive a detailed response about how we can help

NEED IMMEDIATE ASSISTANCE?
Call us at +1 (555) 123-4567 during business hours
Monday & Wednesday: 2:00 PM - 6:00 PM EST

Best regards,
NanGenLabs Team

📧 hello@nangenlabs.com | 📱 +1 (555) 123-4567
🌐 www.nangenlabs.com

---
You received this email because you contacted us through our website.
      `
    };

    // Send both emails simultaneously
    const [notificationResult, confirmationResult] = await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(confirmationEmail)
    ]);
    
    console.log('✅ Contact emails sent successfully:', {
      notificationId: notificationResult.messageId,
      confirmationId: confirmationResult.messageId,
      to_admin: process.env.NOTIFICATION_EMAIL,
      to_user: email
    });
    
    return { 
      success: true, 
      notificationId: notificationResult.messageId,
      confirmationId: confirmationResult.messageId
    };
    
  } catch (error) {
    console.error('❌ Error sending contact emails:', error);
    return { success: false, error: error.message };
  }
};