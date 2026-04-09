import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!email || !message) {
      return Response.json(
        { success: false, error: "Email and message are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amirhossein.akbari.de@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // باید App Password بسازی
      },
    });

    await transporter.sendMail({
      from: `"Auto.de Contact" <amirhossein.akbari.de@gmail.com>`,
      replyTo: email,
      to: "amirhossein.akbari.de@gmail.com", // گیرنده ثابت
      subject: subject?.trim()
        ? `[Contact] ${subject.trim()}`
        : `New message from ${name || "Unknown"}`,
      text: `From: ${name || "Unknown"} <${email}>\n\n${message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
