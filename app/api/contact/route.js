// app/api/contact/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Contact from '../../models/contact';
import { sendContactEmails } from '../../../lib/emailService';

// Validation function
function validateContactData(data) {
  const errors = [];
  
  if (!data.fullname || data.fullname.trim().length < 2) {
    errors.push("Full name is required and must be at least 2 characters");
  }
  
  if (!data.email || !data.email.trim()) {
    errors.push("Email address is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address");
    }
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message is required and must be at least 10 characters");
  }
  
  if (data.phone && data.phone.length > 20) {
    errors.push("Phone number is too long");
  }
  
  if (data.company && data.company.length > 100) {
    errors.push("Company name is too long");
  }
  
  if (data.message && data.message.length > 2000) {
    errors.push("Message is too long (maximum 2000 characters)");
  }
  
  return errors;
}

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    const contactData = await request.json();
    
    // Add request metadata
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Validate the contact data
    const validationErrors = validateContactData(contactData);
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          msg: validationErrors, 
          success: false 
        },
        { status: 400 }
      );
    }
    
    // Create new contact document
    const newContact = new Contact({
      fullname: contactData.fullname.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone?.trim() || '',
      company: contactData.company?.trim() || '',
      subject: contactData.subject?.trim() || '',
      message: contactData.message.trim(),
      ipAddress: clientIP,
      userAgent: userAgent,
      status: 'new'
    });
    
    // Save to database FIRST
    const savedContact = await newContact.save();
    
    // Log the successful database save
    console.log('💾 Contact saved to MongoDB:', {
      id: savedContact._id,
      name: savedContact.fullname,
      email: savedContact.email,
      subject: savedContact.subject || 'General Inquiry',
      timestamp: savedContact.createdAt
    });
    
    // Send emails with the saved contact data (including DB ID and timestamp)
    let emailStatus = { sent: false, error: null };
    
    try {
      const emailResult = await sendContactEmails({
        ...contactData,
        id: savedContact._id,
        createdAt: savedContact.createdAt
      });
      
      if (emailResult.success) {
        emailStatus.sent = true;
        console.log('📧 Both notification and confirmation emails sent successfully');
      } else {
        emailStatus.error = emailResult.error;
        console.error('❌ Failed to send emails:', emailResult.error);
      }
    } catch (emailError) {
      emailStatus.error = emailError.message;
      console.error('❌ Email service error:', emailError);
    }
    
    // Always return success if database save worked (emails are secondary)
    return NextResponse.json(
      { 
        msg: emailStatus.sent 
          ? ["Thank you for your message! We've sent you a confirmation email and will get back to you within 24 hours."]
          : ["Thank you for your message! We'll get back to you within 24 hours. (Note: Confirmation email may be delayed)"], 
        success: true,
        contactId: savedContact._id,
        emailSent: emailStatus.sent
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('💥 Error processing contact form:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const mongoErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          msg: mongoErrors, 
          success: false 
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate email errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          msg: ["This email has already been used for a recent submission."], 
          success: false 
        },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        msg: ["Sorry, there was an error processing your message. Please try again or contact us directly at hello@nangenlabs.com"], 
        success: false 
      },
      { status: 500 }
    );
  }
}

// GET method for admin to retrieve contacts
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    
    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }
    
    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v -ipAddress -userAgent'); // Exclude sensitive fields
    
    const total = await Contact.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}