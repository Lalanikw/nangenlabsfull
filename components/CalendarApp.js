"use client"

import React, { useEffect, useState, useCallback} from 'react';
import { Calendar } from "./ui/calendar"
import { CalendarDays, Clock, Loader2 } from 'lucide-react';
import { Button } from "./ui/button";

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [bookedSlots, setBookedSlots] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  

  const fetchAvailability = async () => {
    try {
      const response = await fetch("/api/getAvailabilityStatus");
      const data = await response.json();
      setIsAvailable(data.isAvailable); // Update the availability status
    } catch (error) {
      console.error("Error fetching availability status:", error);
    } finally {
      setLoadingAvailability(false); // Loading is done
    }
  };
  
  useEffect(() => {
    fetchAvailability();
  }, []);
  
  const isDayDisabled = (day) => {
    const today = new Date();
    const dayOfWeek = day.getDay();
  
    return (
      day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) ||
      dayOfWeek === 0 ||
      dayOfWeek === 2 ||
      dayOfWeek === 4 ||
      dayOfWeek === 5
    );
  };
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const timeStringToDate = (timeStr, baseDate) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    const date = new Date(baseDate);
    let hour = parseInt(hours);
  
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
  
    date.setHours(hour, parseInt(minutes), 0, 0);
    return date;
  };
  
  const getDayType = (date) => {
    const dayOfWeek = date?.getDay();
    if (dayOfWeek === 1) return "Monday";
    if (dayOfWeek === 2) return "Tuesday";
    if (dayOfWeek === 3) return "Wednesday";
    if (dayOfWeek === 4) return "Thursday";
    return null;
  };
  
  const getTime = React.useCallback((day) => {
    const timeList = [];
  
    const isSlotDisabled = (timeStr) => {
      const slotTime = timeStringToDate(timeStr, date);
      const oneHourBefore = new Date(slotTime.getTime() - 60 * 60 * 1000);
      return currentTime >= oneHourBefore;
    };
  
    if (day === "Monday" || day === "Tuesday") {
      for (let i = 2; i <= 3; i++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          const time = `${i}:${minutes} PM`;
          timeList.push({ time, disabled: isSlotDisabled(time) });
        });
      }
    } else if (day === "Wednesday" || day === "Thursday") {
      for (let i = 4; i <= 5; i++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          const time = `${i}:${minutes} PM`;
          timeList.push({ time, disabled: isSlotDisabled(time) });
        });
      }
    }
    if (JSON.stringify(timeList) !== JSON.stringify(timeSlot)) {
      setTimeSlot(timeList);
    }
  }, [currentTime, date, timeSlot]);
  
  useEffect(() => {
    const day = getDayType(date);
    getTime(day);
  }, [date, currentTime, getTime]);
  
  const fetchBookedSlots = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getBookedSlots");
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Convert all dates to local date keys for proper display
      const slots = {};
      data.forEach(booking => {
          
        //Create a map of booked slots by date
        const bookingDate = new Date(booking.date);
        const localDateKey = bookingDate.toLocaleDateString("en-CA");
  
        if (!slots[localDateKey]) {
          slots[localDateKey] = [];
        }
        slots[localDateKey].push(booking.timeSlot);
      });
      
      console.log('Fetched booked slots:', slots);
      setBookedSlots(slots);
      setError(null);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      setError("Failed to load bookings. Please try again later.");
      setBookedSlots({});
    } finally {
      setLoading(false);
    }
  }, []);
    
  //single useeffect for initial load and date changes
  useEffect(() => {
    fetchBookedSlots();
  }, [date, fetchBookedSlots]);
  
  // Updated isSlotBooked function
  const isSlotBooked = useCallback((timeStr) => {
    if (!date) return false;
    const dateKey = date.toLocaleDateString("en-CA");
    const isBooked = bookedSlots[dateKey]?.includes(timeStr);
    console.log(`Checking if ${timeStr} is booked on ${dateKey}: ${isBooked}`); // Debug log
    return isBooked;
  }, [date, bookedSlots]);
  
  // Modified isSlotbooked function with better date handling
  const handleBooking = async () => {
    if (!date || !selectedTimeSlot) {
      alert("Please select a valid date and time slot.");
      return;
    }
  
    setIsBooking(true);
  
    try {
      const [time, period] = selectedTimeSlot.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
    
      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }
  
      const bookingDateTime = new Date(date);
      bookingDateTime.setHours(hour, parseInt(minutes), 0, 0);
  
      const bookingData = {
        date: bookingDateTime.toISOString(),
        timeSlot: selectedTimeSlot,
        userPhone,
        title: `Appointment`
      };
  
      const response = await fetch("/api/addBookedSlots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json(); // Parse the response
  
      if (!response.ok) {
        if (response.status === 409) {
          // Handle conflict (slot already booked)
          alert("This time slot has already been booked. Please select another time.");
          // Refresh the booked slots
          await fetchBookedSlots();
          return;
        }
        throw new Error(data.error || 'Failed to save booking');
      }
  
      //Immediately update local state
      const dateKey = bookingDateTime.toLocaleDateString("en-CA");
      setBookedSlots(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), selectedTimeSlot]
      }));
  
      //Also fetch latest data from server
      await fetchBookedSlots();
  
      // Clear selection
      setSelectedTimeSlot(null);
      alert("Booking successful! See you soon.");
  
    } catch (error) {
      console.error("Error booking slot:", error);
      alert(error.message || "Error booking slot. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };
    
  
  if (loadingAvailability) {
    return <p>Loading availability...</p>;
  }
  
  if (!isAvailable) {
    return (
      <div className="flex justify-center">
        <p className="text-red-500 text-lg">
          We are currently out of the office and not accepting bookings at this time.
        </p>
      </div>
    );
  }


return (
      <div className='flex gap-36 justify-center'>

        {isBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#610e35] mx-auto mb-4" />
              <p className="text-lg font-semibold text-[#610e35]">Processing Your Booking</p>
              <p className="text-sm text-gray-600 mt-2">Please don`t close this window...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Left side*/}
        <div className='pt-5 '>

          <div className='flex flex-col md:flex-row gap-5'>
            {/* Calendar*/}
            <div className='gap-4 pb-4 items-baseline'>
              <p className='flex gap-3 items-center'>
                <CalendarDays className='text-[#610e35] gap-3 ' />
                Select a Date </p>
              <div className='flex'>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isDayDisabled}
                  className="rounded-md border border-[#610e35] custom-calendar "
                />
              </div>
            </div>

            <div className='mt-3 md:mt-0'>
              {/* time slot*/}
              <div>
                <p className='flex gap-3 items-center'>
                  <Clock className='text-[#0C4A6E] gap-3 lg:text-sm md:text-sm sm:text-sm font-semibold' />
                  Select a Time Slot
                </p>
                <div className="grid grid-cols-4 p-2 rounded-md border border-[#0C4A6E] gap-2">
                    {timeSlot?.length > 0 ? (
                      timeSlot.map((item, index) => (
                        <p
                          key={index}
                          onClick={() =>
                            !isSlotBooked(item.time) &&
                            !item.disabled &&
                            setSelectedTimeSlot(item.time)
                          }
                          className={`p-1 border cursor-pointer text-center rounded-md ${
                            isSlotBooked(item.time)
                              ? "bg-red-200 text-gray-600 cursor-not-allowed" // Booked slot style
                              : item.disabled
                              ? "bg-gray-400 text-white cursor-not-allowed" // Disabled slot style
                              : item.time === selectedTimeSlot
                              ? "bg-[#0C4A6E] text-white" // Selected slot style
                              : "hover:bg-[#0C4A6E] hover:text-white" // Available slot style
                          }`}
                        >
                          {item.time}
                        </p>
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-gray-500">No available slots.</p>
                    )}
                  </div>
              </div>
              
            </div>

          </div>
          <div className='flex'>

            {/* button*/}
            <div className='pt-5'>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot ) || isBooking}
                onClick={handleBooking}
                className={`p-5 text-md justify-end ${isBooking
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                  } text-white flex items-center gap-2 transition-colors duration-200`}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Book an Appointment'
                )}
              </Button>
            </div>
          </div>

        </div>

      </div>
    );
  }

export default CalendarApp;