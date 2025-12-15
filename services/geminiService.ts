import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCareerAdvice = async (
  skills: string[],
  major: string,
  experience: string
): Promise<{ matches: string[]; advice: string }> => {
  try {
    const prompt = `
      Bạn là một cố vấn nghề nghiệp AI cho nền tảng "Học - Làm 360" dành cho sinh viên nghề tại Việt Nam.
      Sinh viên này học ngành: ${major}.
      Kỹ năng hiện có: ${skills.join(", ")}.
      Kinh nghiệm/Mô tả thêm: ${experience}.

      Hãy đưa ra lời khuyên ngắn gọn và gợi ý 3 vị trí công việc cụ thể phù hợp nhất với họ.
      Trả về định dạng JSON với các trường:
      - matches: Mảng chứa 3 tên công việc.
      - advice: Một đoạn văn ngắn (dưới 50 từ) khuyên họ nên cải thiện gì hoặc điểm mạnh là gì.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            advice: { type: Type.STRING },
          },
        },
      },
    });

    const text = response.text;
    if (!text) return { matches: [], advice: "Không thể phân tích dữ liệu." };
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      matches: ["Kỹ thuật viên bảo trì", "Nhân viên kỹ thuật", "Thực tập sinh"],
      advice: "Hệ thống đang bận, vui lòng thử lại sau để nhận lời khuyên chi tiết.",
    };
  }
};
