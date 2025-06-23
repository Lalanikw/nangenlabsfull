"use client"

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, User } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { msg, success } = await res.json();
      setErrors(msg || []);
      setSuccess(success);

      if (success) {
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      setErrors(["Failed to send message. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-28">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ready to transform your business with cutting-edge technology? 
            Let's discuss your project and explore how we can help you achieve your goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent text-center">
              Send us a Message
            </h3>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center space-x-2">
                <MessageSquare size={16} />
                <span className="text-sm">Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
              </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && !success && (
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
                <ul className="space-y-1 text-sm">
                  {errors.map((error, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                >
                  <option value="">Select a subject...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Automation Solutions">Automation Solutions</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="Penetration Testing">Penetration Testing</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare size={16} className="inline mr-1" />
                  Your Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 resize-none"
                  placeholder="Tell us about your project, requirements, timeline, or any questions you have..."
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
              <Clock size={30} className="text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">Quick Response</h3>
            <p className="text-sm text-gray-600">
              We respond to all inquiries within 24 hours during business days.
            </p>
          </div>

          <div className="text-center bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-blue-700 to-gray-700 rounded-2xl flex items-center justify-center">
              <MessageSquare size={30} className="text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">Detailed Responses</h3>
            <p className="text-sm text-gray-600">
              Get comprehensive answers to your questions and project inquiries.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-1 bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">How quickly do you respond?</h4>
              <p className="text-sm text-gray-600 mb-4">
                We respond to all messages within 24 hours during business days. For urgent matters, please call us directly.
              </p>
              
              <h4 className="font-semibold mb-2 text-gray-800">What information should I include?</h4>
              <p className="text-sm text-gray-600">
                Please describe your project goals, timeline, and any specific requirements you have in mind.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Do you work with small businesses?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Absolutely! We work with businesses of all sizes, from startups to enterprise companies.
              </p>
              
              <h4 className="font-semibold mb-2 text-gray-800">What happens after I contact you?</h4>
              <p className="text-sm text-gray-600">
                We'll review your message, ask any clarifying questions, and provide you with our recommendations and next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}