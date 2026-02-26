import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { message } = req.body ?? {};

  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: message,
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