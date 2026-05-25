import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productName, imageUrl } = await req.json();

  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    const fallback = `${productName} is a premium quality product designed for those who value both style and functionality. Crafted with attention to detail, it delivers exceptional performance and durability. Whether you're looking for everyday use or a special occasion, this product exceeds expectations with its superior build quality and elegant design. Order now and experience the difference.`;
    return NextResponse.json({ description: fallback });
  }

  try {
    const prompt = `Write a compelling product description for: "${productName}". Keep it 2-3 sentences, highlighting key features and benefits. Avoid bullet points. Be enthusiastic but concise.`;

    const body: any = {
      contents: [
        {
          parts: imageUrl
            ? [
                { text: prompt + " Use the provided image for visual context." },
                { inline_data: { mime_type: "image/jpeg", data: "" } },
              ]
            : [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    };

    if (imageUrl) {
      try {
        const imgRes = await fetch(imageUrl);
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
          body.contents[0].parts[1].inline_data = { mime_type: contentType, data: base64 };
        } else {
          body.contents[0].parts = [{ text: prompt }];
        }
      } catch {
        body.contents[0].parts = [{ text: prompt }];
      }
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini error:", err);
      throw new Error("Gemini API error");
    }

    const data = await res.json();
    const description = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    return NextResponse.json({ description });
  } catch (error) {
    console.error("AI description error:", error);
    const fallback = `${productName} is a premium quality product designed for those who value both style and functionality. Crafted with attention to detail, it delivers exceptional performance and durability.`;
    return NextResponse.json({ description: fallback });
  }
}
