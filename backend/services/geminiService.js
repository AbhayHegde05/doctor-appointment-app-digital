const { GoogleGenAI } = require("@google/genai");

// Initialize with your API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.analyzeSymptoms = async (symptoms) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: {
        role: 'user',
        parts: [{ 
          text: `
            Act as a medical triaging assistant. 
            Analyze these symptoms: "${symptoms}".
            
            Return ONLY a raw JSON object (no markdown formatting, no code blocks) with this exact structure:
            {
              "specialist": "Type of doctor (e.g. Cardiologist)",
              "explanation": "Brief reason why",
              "tips": ["Tip 1", "Tip 2", "Tip 3"]
            }
          ` 
        }]
      }
    });

    // Extract text from the response
    // Note: The structure depends on the specific SDK version, this handles the common response path
    let text = "";
    if (response.response && typeof response.response.text === 'function') {
        text = response.response.text();
    } else if (response.data && response.data.candidates && response.data.candidates[0]) {
        text = response.data.candidates[0].content.parts[0].text;
    }

    // CLEANUP: Remove any ```json or ``` markers if the AI adds them
    const jsonStr = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error("Gemini Service Error:", error);
    // Return a safe fallback so the app doesn't crash
    return {
      specialist: "General Physician",
      explanation: "AI service is currently unavailable. Please consult a doctor directly.",
      tips: ["Rest well", "Stay hydrated", "Monitor symptoms"]
    };
  }
};