
// This service handles sending emails silently in the background

const EMAIL_ENDPOINT = "https://formsubmit.co/ajax/sagnikm907@gmail.com";

interface EmailData {
  name: string;
  email: string;
  rating: number;
  feedback: string;
  source: string;
}

export const sendEmailSilently = async (data: EmailData): Promise<boolean> => {
  try {
    console.log("Sending email silently to admin:", data);
    
    const response = await fetch(EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        _subject: `New ${data.rating}/5 Review from ${data.name}`,
        _template: "box",
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default { sendEmailSilently };
