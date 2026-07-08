export interface AgentResponse {
  reply: string;
  language_detected: string;
}

export async function sendMessage(message: string): Promise<AgentResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

  try {
    const response = await fetch(`${backendUrl}/agent/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Retry once after 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch(`${backendUrl}/agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (retryError) {
      // Return fallback error message
      return {
        reply: "Sorry, I am currently unavailable. Please try again later.",
        language_detected: "en"
      };
    }
  }
}
