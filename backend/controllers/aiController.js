const geminiService = require('../services/geminiService');

exports.diagnose = async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ message: 'Symptoms required' });

    const result = await geminiService.analyzeSymptoms(symptoms);
    res.json(result);
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ 
      specialist: "General Physician",
      explanation: "AI Service unavailable. Please consult a general doctor.",
      tips: ["Rest well", "Stay hydrated"]
    });
  }
};