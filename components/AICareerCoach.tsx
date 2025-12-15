import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getCareerAdvice } from '../services/geminiService';

export const AICareerCoach: React.FC<{ major: string }> = ({ major }) => {
  const [skillsInput, setSkillsInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ matches: string[]; advice: string } | null>(null);

  const handleAnalyze = async () => {
    if (!skillsInput.trim()) return;
    setLoading(true);
    const skills = skillsInput.split(',').map(s => s.trim());
    const data = await getCareerAdvice(skills, major, experienceInput);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-300" />
        <h2 className="text-xl font-bold">AI Tư Vấn Nghề Nghiệp</h2>
      </div>
      
      {!result ? (
        <div className="space-y-4">
          <p className="text-blue-100 text-sm">
            Nhập kỹ năng của bạn để AI phân tích và gợi ý việc làm phù hợp nhất tại Đắk Lắk.
          </p>
          <div>
            <label className="block text-xs font-medium text-blue-200 mb-1">Kỹ năng (cách nhau bằng dấu phẩy)</label>
            <input 
              type="text" 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Ví dụ: Hàn MIG, Đọc bản vẽ, AutoCad..."
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-blue-200 mb-1">Mô tả thêm (Sở thích, kinh nghiệm)</label>
            <textarea 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={2}
              placeholder="Tôi thích làm việc ngoài trời, đã từng thực tập..."
              value={experienceInput}
              onChange={(e) => setExperienceInput(e.target.value)}
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading || !skillsInput}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Phân tích ngay'}
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Gợi ý việc làm:</h3>
            <ul className="space-y-2">
              {result.matches.map((job, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <ArrowRight className="w-4 h-4 text-white/70" /> {job}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Lời khuyên:</h3>
            <p className="text-sm text-blue-100 italic">"{result.advice}"</p>
          </div>
          <button 
            onClick={() => setResult(null)}
            className="text-xs text-blue-200 hover:text-white underline"
          >
            Thử lại với thông tin khác
          </button>
        </div>
      )}
    </div>
  );
};
