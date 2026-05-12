import { useState } from 'react';
import axios from 'axios';

const useGroq = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyzePrescription = async (imageUrl, language = 'english') => {
    setAnalyzing(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.2-90b-vision-preview',
          messages: [
            {
              role: 'system',
              content: `You are MediLens AI, an expert medical prescription analyzer. Analyze the prescription image provided and return ONLY a valid JSON object with no additional text, no markdown, no backticks. Use this exact structure:
{
  "patient_info": { "name": "", "age": "", "gender": "", "date": "" },
  "doctor_info": { "name": "", "hospital": "", "specialization": "", "license_number": "" },
  "medications": [
    {
      "name": "", "generic_name": "", "category": "", "dosage": "", "frequency": "", "duration": "", "purpose": "",
      "side_effects": [], "precautions": "", "color_code": "blue|green|red|orange|purple"
    }
  ],
  "drug_interactions": [
    { "drugs": [], "severity": "high|moderate|low", "description": "", "recommendation": "" }
  ],
  "plain_language_summary": "",
  "dietary_recommendations": { "recommended": [], "avoid": [], "lifestyle_tips": [] },
  "followup_instructions": "",
  "red_flag_symptoms": [],
  "warnings": [],
  "confidence_score": 0,
  "analysis_language": "${language}"
}
If any field is not visible, set it to null. Never fabricate information. Return ONLY the JSON object.`
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: `Analyze this prescription in ${language} language.` },
                { type: 'image_url', image_url: { url: imageUrl } }
              ]
            }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = JSON.parse(response.data.choices[0].message.content);
      return result;
    } catch (err) {
      console.error("Groq Analysis Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const searchMedicine = async (query, language = 'english') => {
    setAnalyzing(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: `You are a medical assistant. The user will provide a medicine name or symptom. 
              Identify the intended medicine (even with typos). 
              Return a JSON object with exactly 4 medicine entries for comparison.
              The first should be the direct match, the others should be related or alternative medications for comparison.
              JSON Structure:
              {
                "medicines": [
                  {
                    "name": "Medicine Name",
                    "generic_name": "Generic Name",
                    "category": "Category",
                    "common_uses": ["Use 1", "Use 2"],
                    "how_it_works": "Description",
                    "side_effects": ["Side Effect 1"],
                    "warnings": ["Warning 1"],
                    "alternatives": ["Alt 1"]
                  },
                  ... repeat for 4 medicines ...
                ]
              }
              Always respond in ${language}. Return ONLY the JSON.`
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      // Robust JSON extraction
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      const jsonString = content.substring(jsonStart, jsonEnd);
      
      const result = JSON.parse(jsonString);
      return result;
    } catch (err) {
      console.error("Groq Search Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const chatWithAI = async (messages, context = null) => {
    setAnalyzing(true);
    setError(null);
    try {
      const systemMessage = {
        role: 'system',
        content: `You are MediLens AI, a helpful and empathetic medical assistant. 
        You help users understand their prescriptions and medicines. 
        Always answer in clear plain language. 
        Always end medical answers with: This is for informational purposes only. Please consult your doctor for medical advice. 
        Never diagnose conditions. Be supportive and reassuring.
        ${context ? `Context about the user's current medicine/prescription: ${JSON.stringify(context)}` : ''}`
      };

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [systemMessage, ...messages],
          temperature: 0.7,
          max_tokens: 1024
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      if (err.response) {
        console.error("Groq API Error Details:", err.response.data);
      }
      console.error("Groq Chat Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzePrescription, searchMedicine, chatWithAI, analyzing, error };
};

export default useGroq;
