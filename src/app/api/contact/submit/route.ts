import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, Email, and Message are required fields.' }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'Portfolio Contact Form Submission',
        message,
      },
    });

    // Create an activity log for visitor contact form submission
    await prisma.activity.create({
      data: {
        action: 'CONTACT_SUBMIT',
        details: `Message received from ${name} (${email}).`,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (err: any) {
    console.error('Error submitting contact form:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit message.' }, { status: 500 });
  }
}
