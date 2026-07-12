from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.main import limiter
from app.db.supabase_client import get_client
from app.config import settings


# Pydantic Models
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=20, max_length=2000)


class ContactResponse(BaseModel):
    success: bool
    message: str


# Router
router = APIRouter()


@router.post("/send", response_model=ContactResponse)
@limiter.limit("3/hour")
async def send_contact_message(request: Request, contact: ContactRequest):
    """
    Submit a contact form message.

    Rate limit: 3 requests per hour per IP to prevent spam.
    """
    try:
        # Get Supabase client
        supabase = get_client()

        # Prepare data for insertion
        data = {
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "is_read": False,
        }

        # Insert into Supabase
        result = supabase.table("contact_messages").insert(data).execute()

        # Check if insertion was successful
        if not result.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to save message. Please try again later."
            )

        # Send email notification (non-blocking - don't fail if email fails)
        try:
            if settings.GMAIL_USER and settings.GMAIL_APP_PASSWORD:
                # Create email message
                msg = MIMEMultipart("alternative")
                msg["Subject"] = f"New Contact Form Submission — {contact.subject}"
                msg["From"] = settings.GMAIL_USER
                msg["To"] = settings.NOTIFICATION_EMAIL

                # HTML email body
                html_body = f"""
                <html>
                  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                      <h2 style="color: #6366F1; border-bottom: 2px solid #6366F1; padding-bottom: 10px;">
                        New Contact Form Submission
                      </h2>

                      <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 10px 0;"><strong style="color: #6366F1;">Name:</strong> {contact.name}</p>
                        <p style="margin: 10px 0;"><strong style="color: #6366F1;">Email:</strong> {contact.email}</p>
                        <p style="margin: 10px 0;"><strong style="color: #6366F1;">Subject:</strong> {contact.subject}</p>

                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                          <strong style="color: #6366F1;">Message:</strong>
                          <p style="margin-top: 10px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #6366F1; border-radius: 4px;">
                            {contact.message}
                          </p>
                        </div>

                        <p style="margin-top: 20px; font-size: 12px; color: #888;">
                          <strong>Timestamp:</strong> {datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")}
                        </p>
                      </div>

                      <p style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
                        This is an automated notification from your portfolio contact form.
                      </p>
                    </div>
                  </body>
                </html>
                """

                # Attach HTML body
                msg.attach(MIMEText(html_body, "html"))

                # Send email via Gmail SMTP
                with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                    server.login(settings.GMAIL_USER, settings.GMAIL_APP_PASSWORD)
                    server.send_message(msg)

                print(f"✅ Email notification sent to {settings.NOTIFICATION_EMAIL}")
        except Exception as email_error:
            # Log error but don't fail the API response
            print(f"⚠️ Failed to send email notification: {email_error}")

        return ContactResponse(
            success=True,
            message="Message sent successfully! We'll get back to you soon."
        )

    except ValueError as e:
        # Supabase client initialization error
        print(f"❌ ValueError in contact route: {e}")
        raise HTTPException(
            status_code=500,
            detail="Database service unavailable"
        )
    except Exception as e:
        # Any other error
        print(f"❌ Exception in contact route: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="Failed to send message. Please try again later."
        )
