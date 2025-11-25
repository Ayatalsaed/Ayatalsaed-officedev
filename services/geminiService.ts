
import { GoogleGenAI } from "@google/genai";
import { getSystemInstruction } from '../constants';
import { Business, BusinessGenome, MatchResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// ... (Keep existing generateBusinessAdvice)
export const generateBusinessAdvice = async (query: string, chatHistory: string[], language: string = 'ar'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let prompt = '';
    if (language === 'ar') {
       prompt = `
      تاريخ المحادثة:
      ${chatHistory.join('\n')}
      
      سؤال المستخدم الحالي: ${query}
      
      قدم إجابة مفيدة وموجزة بصفتك مستشار أعمال خبير في منصة مطورو الاعمال.
      `;
    } else if (language === 'es') {
       prompt = `
      Historial de chat:
      ${chatHistory.join('\n')}
      
      Pregunta actual del usuario: ${query}
      
      Proporcione una respuesta útil y concisa como consultor de negocios experto en la plataforma Business Developers.
      `;
    } else {
      prompt = `
      Chat History:
      ${chatHistory.join('\n')}
      
      Current User Question: ${query}
      
      Provide a helpful and concise answer as an expert business consultant on the Business Developers platform.
      `;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(language),
        temperature: 0.7,
      }
    });

    return response.text || "Error";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};

// ... (Keep existing generateMarketingPitch)
export const generateMarketingPitch = async (businessName: string, category: string, language: string = 'ar'): Promise<string> => {
  try {
    let prompt = '';
    if (language === 'ar') {
      prompt = `اكتب وصفاً تسويقياً قصيراً وجذاباً (تغريدة واحدة) لشركة اسمها "${businessName}" تعمل في مجال "${category}".`;
    } else if (language === 'es') {
      prompt = `Escribe una descripción de marketing corta y atractiva (un tweet) para una empresa llamada "${businessName}" en la categoría "${category}".`;
    } else {
      prompt = `Write a short and catchy marketing pitch (one tweet) for a company named "${businessName}" in the "${category}" industry.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    return "Leading company in its field.";
  }
};

export interface AISearchResponse {
  ids: string[];
  filters: {
    status: 'all' | 'occupied' | 'available';
    categories: string[];
  };
}

// ... (Keep existing searchBusinessesWithAI)
export const searchBusinessesWithAI = async (query: string, businesses: Business[], language: string = 'ar'): Promise<AISearchResponse> => {
  try {
    const simplifiedData = businesses.map(b => ({
      id: b.id,
      name: b.name,
      description: b.description,
      category: b.category,
      services: b.services,
      isOccupied: b.isOccupied
    }));

    const categories = [...new Set(businesses.map(b => b.category).filter(c => c !== 'AVAILABLE'))];

    const prompt = `
      You are an intelligent search engine for the Business Developers District.
      Data: ${JSON.stringify(simplifiedData)}
      Available Categories: ${JSON.stringify(categories)}
      User Query: "${query}"
      Task: Analyze the user's query and return matching IDs and filters.
      Return JSON Object only: {"ids": [], "filters": {"status": "...", "categories": []}}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "{}";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    return {
      ids: result.ids || [],
      filters: {
        status: result.filters?.status || 'all',
        categories: result.filters?.categories || []
      }
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    return { ids: [], filters: { status: 'all', categories: [] } };
  }
};

// --- NEW: Business Genome Matching ---
export const generateBusinessMatches = async (myProfile: BusinessGenome, availableBusinesses: Business[], language: string = 'ar'): Promise<MatchResult[]> => {
  try {
    const simplifiedCandidates = availableBusinesses
        .filter(b => b.isOccupied && b.genomeProfile)
        .map(b => ({
           id: b.id,
           name: b.name,
           genome: b.genomeProfile
        }));

    const prompt = `
      You are the 'Business Genome Matching Engine'. 
      
      My Business Profile:
      ${JSON.stringify(myProfile)}
      
      Candidate Ecosystem (Array of potential partners):
      ${JSON.stringify(simplifiedCandidates)}
      
      Task:
      Analyze the compatibility between My Business and the Candidates.
      
      Return the top 8 matches as a valid JSON array.
      
      Constraints:
      - "companyId" MUST match the exact ID from the candidate list.
      - "score" should be an integer between 0 and 100.
      - "matchReason" should be a concise summary (max 20 words) stating the primary synergy.
      - "collaborationOpportunity" should be a one-sentence actionable suggestion.
      
      - "analysisPoints" must be an array of exactly 3 objects describing the match in detail:
         1. factor: "Industry Sector"
            description: Compare specific sectors. E.g. "Your '${myProfile.industrySector || 'Sector'}' aligns with their 'Real Estate'."
         2. factor: "Services Synergy"
            description: Identify specific overlaps between needs and offers. E.g. "Your need for '${myProfile.servicesNeeded?.[0] || 'Services'}' is met by their offer."
         3. factor: "Strategic Fit"
            description: Compare company size and markets. E.g. "Both target '${myProfile.targetMarkets?.[0] || 'Market'}' and are '${myProfile.companySize}' size."
      
      Output Language: ${language === 'ar' ? 'Arabic' : language === 'es' ? 'Spanish' : 'English'}

      Output format (JSON only):
      [
        {
          "companyId": "id",
          "score": 85,
          "matchReason": "...",
          "sharedInterests": ["Tag1", "Tag2"],
          "collaborationOpportunity": "...",
          "analysisPoints": [
             { "factor": "Industry Sector", "description": "..." },
             { "factor": "Services Synergy", "description": "..." },
             { "factor": "Strategic Fit", "description": "..." }
          ]
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "[]";
    // Robust JSON extraction
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const cleanText = jsonMatch ? jsonMatch[0] : text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText) as MatchResult[];

  } catch (error) {
    console.error("AI Matching Error:", error);
    return [];
  }
};
