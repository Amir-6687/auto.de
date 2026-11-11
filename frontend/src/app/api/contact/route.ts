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

    const backend = process.env.BACKEND_API_URL || "http://localhost:5000";
    const internal = process.env.INTERNAL_API_SECRET;
    if (internal) {
      await fetch(`${backend}/api/internal/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": internal,
        },
        body: JSON.stringify({ name, email, subject, message }),
      }).catch(() => {});
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
