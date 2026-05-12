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
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are MediLens AI, an expert medical assistant. The user will provide a medicine name or a short description of their symptoms. Identify the medicine or suggest appropriate over-the-counter options if they ask for symptoms. Return ONLY a valid JSON object with this exact structure:
{
  "name": "",
  "generic_name": "",
  "category": "",
  "common_uses": [],
  "how_it_works": "",
  "side_effects": [],
  "warnings": [],
  "alternatives": []
}
Always provide the response in ${language}. Never fabricate information. Return ONLY the JSON object.`
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

      const result = JSON.parse(response.data.choices[0].message.content);
      return result;
    } catch (err) {
      console.error("Groq Search Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzePrescription, searchMedicine, analyzing, error };
};

export default useGroq;
