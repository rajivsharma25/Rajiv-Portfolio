import { Resend } from "resend";
import { NextResponse } from "next/server";

const apiKey = process.env.RESEND_API_KEY;

export async function POST(request) {
  try {
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please try reaching out via direct email or WhatsApp." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_EMAIL || "rajivsharma93056@gmail.com";

    // Escape user input for safe HTML rendering
    const safeName = String(name)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const safeMessage = String(message)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const formattedDate = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email,
      subject: `Portfolio Message: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTime: ${formattedDate}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);">
                  
                  <!-- Header Accent Banner -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%); padding: 32px 36px 28px 36px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; padding: 4px 12px; margin-bottom: 12px;">
                              <span style="font-size: 11px; font-weight: 700; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase;">
                                Portfolio Notification
                              </span>
                            </div>
                            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3;">
                              New Message Received
                            </h1>
                            <p style="margin: 6px 0 0 0; font-size: 13px; color: #e0f2fe;">
                              Someone sent you a note via your portfolio contact form.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content Area -->
                  <tr>
                    <td style="padding: 32px 36px 24px 36px;">
                      
                      <!-- Sender Info Card -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #edf2f7; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 18px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 10px; width: 100%;">
                                  <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                                    Sender Name
                                  </span>
                                  <span style="font-size: 15px; font-weight: 600; color: #0f172a;">
                                    ${safeName}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom: 10px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
                                  <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                                    Email Address
                                  </span>
                                  <a href="mailto:${email}" style="font-size: 14px; font-weight: 600; color: #2563eb; text-decoration: none;">
                                    ${email}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                                  <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                                    Received At
                                  </span>
                                  <span style="font-size: 13px; color: #475569;">
                                    ${formattedDate}
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Message Body -->
                      <div style="margin-bottom: 28px;">
                        <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
                          Message Content
                        </span>
                        <div style="background-color: #ffffff; border-left: 4px solid #2563eb; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 10px 10px 0; padding: 18px 20px;">
                          <p style="margin: 0; font-size: 14.5px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; font-family: inherit;">${safeMessage}</p>
                        </div>
                      </div>

                      <!-- Action CTA -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry%20-%20Rajiv%20Sharma" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 50px; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);">
                              Reply to ${safeName}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Clean Minimal Footer -->
                  <tr>
                    <td style="padding: 20px 36px; background-color: #f8fafc; border-top: 1px solid #edf2f7; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                        Rajiv Sharma • Portfolio Direct Inquiry
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
