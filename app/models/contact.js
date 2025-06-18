// app/models/contact.js

import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "Name must be larger than 2 characters"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true,
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  phone: {
    type: String,
    trim: true,
    maxLength: [20, "Phone number must be lesser than 20 characters"],
  },

  company: {
    type: String,
    trim: true,
    maxLength: [100, "Company name must be lesser than 100 characters"],
  },

  subject: {
    type: String,
    trim: true,
    enum: {
      values: [
        "", 
        "Web Development", 
        "Automation Solutions", 
        "AI Solutions", 
        "Penetration Testing", 
        "General Inquiry", 
        "Partnership"
      ],
      message: "Please select a valid subject"
    },
  },

  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
    minLength: [10, "Message must be at least 10 characters"],
    maxLength: [2000, "Message must be lesser than 2000 characters"],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["new", "read", "replied", "archived"],
    default: "new",
  },

  ipAddress: {
    type: String,
    trim: true,
  },

  userAgent: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ date: -1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;