import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productName, imageUrl } = await req.json();

  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey) {
    const fallback = `${productName} is a premium quality product designed for those who value both style and functionality. Crafted with attention to detail, it delivers exceptional performance and durability. Whether you're looking for everyday use or a special occasion, this product exceeds expectations with its superior build quality and elegant design. Order now and experience the difference.`;
    return NextResponse.json({ description: fallback });
  }

  try {
    const messages: any[] = [
      {
        role: "user",
        content: imageUrl
          ? [
              { type: "text", text: `Write a compelling product description for: "${productName}". Use the image for context. Keep it 2-3 sentences, highlighting key features and benefits. Avoid bullet points.` },
              { type: "image_url", image_url: { url: imageUrl } },
            ]
          : `Write a compelling product description for: "${productName}". Keep it 2-3 sentences, highlighting key features and benefits. Avoid bullet points.`,
      },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: imageUrl ? "gpt-4o" : "gpt-4o-mini",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) throw new Error("OpenAI error");
    const data = await res.json();
    const description = data.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ description });
  } catch (error) {
    const fallback = `${productName} is a premium quality product designed for those who value both style and functionality. Crafted with attention to detail, it delivers exceptional performance and durability.`;
    return NextResponse.json({ description: fallback });
  }
}
