import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System message to guide the chatbot's behavior
const SYSTEM_MESSAGE = `You are a helpful species chatbot that focuses on answering questions about animals and species.
You can provide information about but not limited to:
- Animal habitats and ecosystems
- Diet and feeding habits
- Conservation status and threats
- Physical characteristics
- Behavior and social structures
- Interesting facts and adaptations

If a user asks about something unrelated to animals or species, tell them that you can only help with animal related questions.
Keep responses concise and informative. Use markdown formatting when you can.`;

export async function generateResponse(message: string): Promise<string> {
  try {
    // Basic input validation
    if (!message.trim()) {
      return "Please ask a question about any species or animal.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "I'm having trouble thinking about that right now. Please try again.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}