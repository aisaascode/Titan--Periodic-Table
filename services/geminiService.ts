import { ElementData, CompoundInfo } from "../types";

// Configuration for OpenRouter
const API_KEY = "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";
const BASE_URL = "https://openrouter.ai/api/v1";
const MODEL = "xiaomi/mimo-v2-flash:free";

export const fetchElementCompounds = async (element: ElementData): Promise<CompoundInfo[]> => {
  try {
    const prompt = `
      Provide 5 common chemical compounds/formulas involving the element ${element.name} (${element.symbol}).
      For each, include the chemical formula, the common name, the ratio of atoms (e.g., "2:1 Hydrogen to Oxygen"), and a very brief description.
      If the element is a noble gas or generally unreactive, mention that or hypothetical compounds.

      IMPORTANT: Return the result as a raw JSON array of objects. Do not include markdown formatting like \`\`\`json.
      
      Expected JSON format:
      [
        {
          "formula": "H2O",
          "name": "Water",
          "ratio": "2:1 Hydrogen to Oxygen",
          "description": "Essential for life."
        }
      ]
    `;

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://titan-periodic-table.com", // Required by OpenRouter
        "X-Title": "Titan Periodic Table",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
            {
                role: "system",
                content: "You are a helpful chemistry assistant. You output strict JSON."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        console.error("OpenRouter API error:", response.statusText);
        return [];
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "[]";
    
    // Clean up content if it contains markdown code blocks
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        return JSON.parse(cleanContent) as CompoundInfo[];
    } catch (e) {
        console.error("JSON Parse error:", e);
        return [];
    }

  } catch (error) {
    console.error("Error fetching compounds:", error);
    return [];
  }
};

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://titan-periodic-table.com",
        "X-Title": "Titan Periodic Table",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
            {
                role: "system",
                content: "You are Titan, an advanced AI chemistry assistant embedded in an interactive periodic table. Your goal is to help users understand elements, chemical properties, and periodic trends. Keep your answers concise, accurate, and scientifically sound. If asked about non-chemistry topics, politely steer the conversation back to science."
            },
            {
                role: "user",
                content: message
            }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated.";

  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting to the neural network. Please try again later.";
  }
};