from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone

from app.main import limiter
from app.db.supabase_client import get_client


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

        return ContactResponse(
            success=True,
            message="Message sent successfully! We'll get back to you soon."
        )

    except ValueError as e:
        # Supabase client initialization error
        raise HTTPException(
            status_code=500,
            detail="Database service unavailable"
        )
    except Exception as e:
        # Any other error
        raise HTTPException(
            status_code=500,
            detail="Failed to send message. Please try again later."
        )
