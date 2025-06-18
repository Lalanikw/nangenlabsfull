import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, ArrowLeft, CalendarDays, Zap, Brain, Shield, Code } from 'lucide-react';

const AppointmentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: null,
    timeSlot: '',
    clientInfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    }
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service types
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: Code,
      description: 'Custom websites, web applications, and e-commerce solutions',
      duration: '60 min',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'automation',
      title: 'Automation Solutions',
      icon: Zap,
      description: 'Process automation, workflow optimization, and system integration',
      duration: '45 min',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      icon: Brain,
      description: 'AI implementation, machine learning, and intelligent systems',
      duration: '60 min',
      color: 'from-blue-700 to-gray-700'
    },
    {
      id: 'cybersecurity - Pentesting',
      title: 'Cybersecurity Consultation',
      icon: Shield,
      description: 'Security audits, vulnerability assessments, and protection strategies',
      duration: '45 min',
      color: 'from-gray-700 to-blue-900'
    }
  ];

  // Check if day is disabled (same logic as your CalendarApp)
  const isDayDisabled = (day) => {
    const today = new Date();
    const dayOfWeek = day.getDay();
    return (
      day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) ||
      dayOfWeek === 0 || // Sunday
      dayOfWeek === 6    // Saturday
    );
  };

  // Generate time slots based on day
  const generateTimeSlots = useCallback((selectedDate) => {
    if (!selectedDate) return [];
    
    const dayOfWeek = selectedDate.getDay();
    const timeList = [];
    const currentTime = new Date();

    const isSlotDisabled = (timeStr) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
      
      if (period === "PM" && hour !== 12) hour += 12;
      else if (period === "AM" && hour === 12) hour = 0;
      
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, parseInt(minutes), 0, 0);
      
      const oneHourBefore = new Date(slotTime.getTime() - 60 * 60 * 1000);
      return currentTime >= oneHourBefore;
    };

    if (dayOfWeek === 1 || dayOfWeek === 3) { // Monday or Wednesday
      const startHour = dayOfWeek === 1 ? 2 : 4; // Monday: 2PM, Wednesday: 4PM
      const endHour = dayOfWeek === 1 ? 3 : 5;   // Monday: 3PM, Wednesday: 5PM
      
      for (let i = startHour; i <= endHour; i++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          const time = `${i}:${minutes} PM`;
          timeList.push({ 
            time, 
            disabled: isSlotDisabled(time)
          });
        });
      }
    }
    
    return timeList;
  }, []);

  // Fetch booked slots
  const fetchBookedSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/getBookedSlots");
      if (!response.ok) throw new Error('Failed to fetch booked slots');
      
      const data = await response.json();
      const slots = {};
      
      data.forEach(booking => {
        const bookingDate = new Date(booking.date);
        const localDateKey = bookingDate.toLocaleDateString("en-CA");
        if (!slots[localDateKey]) slots[localDateKey] = [];
        slots[localDateKey].push(booking.timeSlot);
      });
      
      setBookedSlots(slots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if slot is booked
  const isSlotBooked = useCallback((timeStr) => {
    if (!formData.date) return false;
    const dateKey = formData.date.toLocaleDateString("en-CA");
    return bookedSlots[dateKey]?.includes(timeStr);
  }, [formData.date, bookedSlots]);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  useEffect(() => {
    if (formData.date) {
      setTimeSlots(generateTimeSlots(formData.date));
    }
  }, [formData.date, generateTimeSlots]);

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const [time, period] = formData.timeSlot.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
      
      if (period === "PM" && hour !== 12) hour += 12;
      else if (period === "AM" && hour === 12) hour = 0;
      
      const bookingDateTime = new Date(formData.date);
      bookingDateTime.setHours(hour, parseInt(minutes), 0, 0);

      const selectedService = services.find(s => s.id === formData.serviceType);
      
      const bookingData = {
        date: bookingDateTime.toISOString(),
        timeSlot: formData.timeSlot,
        serviceType: selectedService?.title || formData.serviceType,
        clientInfo: formData.clientInfo,
        duration: selectedService?.duration || '60 min'
      };

      const response = await fetch("/api/addBookedSlots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert("This time slot has already been booked. Please select another time.");
          setCurrentStep(2); // Go back to time selection
          await fetchBookedSlots();
          return;
        }
        throw new Error(data.error || 'Failed to book appointment');
      }

      // Success
      setCurrentStep(4); // Success step
      await fetchBookedSlots();
      
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(error.message || "Error booking appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setFormData({ ...formData, serviceType: serviceId });
    setCurrentStep(2);
  };

  const handleDateSelect = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate, timeSlot: '' });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, timeSlot: time });
    setCurrentStep(3);
  };

  const handleClientInfoChange = (field, value) => {
    setFormData({
      ...formData,
      clientInfo: { ...formData.clientInfo, [field]: value }
    });
  };

  const renderServiceSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent mb-4">
          Select Your Service
        </h2>
        <p className="text-gray-600">Choose the consultation type that best fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-3">{service.description}</p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <Clock size={16} className="mr-1" />
                {service.duration}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <button
          onClick={() => setCurrentStep(1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Services
        </button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent mb-4">
          Choose Date & Time
        </h2>
        <p className="text-gray-600">
          Selected: {services.find(s => s.id === formData.serviceType)?.title}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <CalendarDays className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold">Select Date</h3>
          </div>
          
          {/* Simple calendar implementation */}
          <div className="bg-white/70 rounded-2xl p-6 border border-gray-200">
            <div className="text-center mb-4">
              <h4 className="font-semibold text-gray-800">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="font-medium text-gray-500 p-2">{day}</div>
              ))}
              
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - date.getDay() + i);
                const isDisabled = isDayDisabled(new Date(date));
                const isSelected = formData.date && date.toDateString() === formData.date.toDateString();
                const isCurrentMonth = date.getMonth() === new Date().getMonth();
                
                return (
                  <button
                    key={i}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    disabled={isDisabled}
                    className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : isCurrentMonth
                        ? 'hover:bg-blue-100 text-gray-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold">Select Time</h3>
          </div>
          
          {formData.date ? (
            <div className="bg-white/70 rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => !slot.disabled && !isSlotBooked(slot.time) && handleTimeSelect(slot.time)}
                    disabled={slot.disabled || isSlotBooked(slot.time)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.timeSlot === slot.time
                        ? 'bg-blue-600 text-white'
                        : slot.disabled || isSlotBooked(slot.time)
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                    }`}
                  >
                    {slot.time}
                    {isSlotBooked(slot.time) && <div className="text-xs mt-1">Booked</div>}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-2xl p-6 text-center text-gray-500">
              Please select a date first
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderClientInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <button
          onClick={() => setCurrentStep(2)}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Date & Time
        </button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent mb-4">
          Your Information
        </h2>
        <p className="text-gray-600">Please provide your details for the consultation</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white/70 rounded-2xl p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.clientInfo.name}
              onChange={(e) => handleClientInfoChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
              value={formData.clientInfo.email}
              onChange={(e) => handleClientInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
              value={formData.clientInfo.phone}
              onChange={(e) => handleClientInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              value={formData.clientInfo.company}
              onChange={(e) => handleClientInfoChange('company', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Your Company"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare size={16} className="inline mr-1" />
              Project Details
            </label>
            <textarea
              value={formData.clientInfo.message}
              onChange={(e) => handleClientInfoChange('message', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Please describe your project, goals, and any specific requirements..."
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!formData.clientInfo.name || !formData.clientInfo.email || isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Booking...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Confirm Appointment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={40} className="text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Appointment Confirmed!
      </h2>
      
      <div className="max-w-md mx-auto bg-white/70 rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Appointment Details:</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Service:</strong> {services.find(s => s.id === formData.serviceType)?.title}</p>
          <p><strong>Date:</strong> {formData.date?.toLocaleDateString()}</p>
          <p><strong>Time:</strong> {formData.timeSlot}</p>
          <p><strong>Duration:</strong> {services.find(s => s.id === formData.serviceType)?.duration}</p>
        </div>
      </div>
      
      <p className="text-gray-600">
        We'll send you a confirmation email with meeting details and a calendar invite.
      </p>
      
      <button
        onClick={() => {
          setCurrentStep(1);
          setFormData({
            serviceType: '',
            date: null,
            timeSlot: '',
            clientInfo: { name: '', email: '', phone: '', company: '', message: '' }
          });
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
      >
        Book Another Appointment
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step === 4 ? <CheckCircle size={20} /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-2xl">
          {currentStep === 1 && renderServiceSelection()}
          {currentStep === 2 && renderDateTimeSelection()}
          {currentStep === 3 && renderClientInfo()}
          {currentStep === 4 && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;