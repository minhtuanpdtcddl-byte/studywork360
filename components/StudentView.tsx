import React from 'react';
import { AICareerCoach } from './AICareerCoach';
import { Briefcase, Clock, FileText, CheckCircle } from 'lucide-react';
import { Job, StudentProfile } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Thợ Hàn 3G/6G', company: 'Cơ Khí Đại Lợi', location: 'Buôn Ma Thuột', salary: '8-12 Triệu', type: 'Full-time', postedAt: '2 ngày trước', skills: ['Hàn', 'Cơ khí'] },
  { id: '2', title: 'Thực tập sinh Điện Công nghiệp', company: 'Điện Lực Đắk Lắk', location: 'Buôn Ma Thuột', salary: 'Hỗ trợ 3 Triệu', type: 'Thực tập', postedAt: 'Hôm qua', skills: ['Điện', 'An toàn lao động'] },
  { id: '3', title: 'Kỹ thuật viên sửa chữa ô tô', company: 'Honda Ô tô Đắk Lắk', location: 'Tân An', salary: '7-10 Triệu', type: 'Full-time', postedAt: '5 giờ trước', skills: ['Ô tô', 'Sửa chữa'] },
];

export const StudentView: React.FC = () => {
  const profile: StudentProfile = {
    id: 'SV001',
    name: 'Nguyễn Văn A',
    major: 'Công nghệ Ô tô',
    school: 'Cao đẳng Kỹ thuật Đắk Lắk',
    gpa: 3.2,
    completedHours: 120,
    totalHours: 400,
    skills: ['Sửa chữa động cơ', 'Bảo dưỡng định kỳ', 'Tiếng Anh cơ bản']
  };

  const progress = (profile.completedHours / profile.totalHours) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Profile & AI */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <img src="https://picsum.photos/100/100" alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500 text-sm">{profile.major}</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">GPA: {profile.gpa}/4.0</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Thực tập:</span>
              <span className="font-medium">{profile.completedHours}/{profile.totalHours} giờ</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <AICareerCoach major={profile.major} />
      </div>

      {/* Middle Column: Jobs */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" /> Việc làm gợi ý cho bạn
            </h3>
            <button className="text-indigo-600 text-sm hover:underline">Xem tất cả</button>
          </div>

          <div className="space-y-4">
            {MOCK_JOBS.map(job => (
              <div key={job.id} className="border border-gray-100 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-bold">{job.salary}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">{job.type}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{job.postedAt}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded transition-colors">Ứng tuyển ngay</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
           <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <Clock className="w-6 h-6 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Chấm công</span>
           </button>
           <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <FileText className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Viết báo cáo</span>
           </button>
           <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Đánh giá</span>
           </button>
           <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <Briefcase className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Hồ sơ số</span>
           </button>
        </div>
      </div>
    </div>
  );
};
