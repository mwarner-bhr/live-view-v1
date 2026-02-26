import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { message, context } = req.body ?? {};

  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const input = context
      ? [
          {
            role: "system",
            content:
              "You are assisting with Time & Attendance operations. Prefer answers grounded in the provided operational context. If context is missing for a requested detail, say what is missing.",
          },
          {
            role: "system",
            content: `Current Time & Attendance context:\n${JSON.stringify(context, null, 2)}`,
          },
          {
            role: "user",
            content: message,
          },
        ]
      : message;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input,
    });

    const text =
      response.output_text ??
      (response.output?.[0] as any)?.content?.[0]?.text ??
      "";

    return res.status(200).json({ text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
