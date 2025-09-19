import { generateResponse } from "@/lib/services/species-chat";
import { NextResponse } from "next/server";

interface ChatRequestBody {
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ChatRequestBody;
    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Message is required and must be a string." },
        { status: 400 }
      );
    }

    // Generate response using OpenAI
    const response = await generateResponse(body.message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 502 }
    );
  }
}