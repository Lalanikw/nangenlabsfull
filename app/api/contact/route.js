import connectDB from "../../lib/mongodb";
import Contact from "../../models/contact";
import {NextResponse} from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { fullname, email, message } = await req.json();

    // Log a message when the JSON is successfully parsed
    console.log('JSON parsed successfully:', { fullname, email, message });

    try {
      await connectDB();
      console.log('MongoDB connected successfully');

      // Create a new contact document in MongoDB
      await Contact.create({ fullname, email, message });

      // Return a success response
      return NextResponse.json({
        msg: ['Message sent successfully'],
        success: true,
      });
    } catch (connectError) {
      console.error('Error connecting to MongoDB:', connectError);
      return NextResponse.json({
        errors: ['Error connecting to MongoDB'],
        success: false,
      });
    }
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    return NextResponse.json({
      errors: ['Error parsing JSON'],
      success: false,
    });
  }
}
