import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { StudentView } from './components/StudentView';
import { BusinessView } from './components/BusinessView';
import { SchoolView } from './components/SchoolView';
import { Role } from './types';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('student');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navigation currentRole={currentRole} setRole={setCurrentRole} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentRole === 'student' && 'Bảng điều khiển Sinh viên'}
            {currentRole === 'business' && 'Cổng thông tin Doanh nghiệp'}
            {currentRole === 'school' && 'Quản lý Đào tạo & Thực tập'}
          </h1>
          <p className="text-gray-500">
            {currentRole === 'student' && 'Quản lý hồ sơ, tìm việc và báo cáo thực tập.'}
            {currentRole === 'business' && 'Tìm kiếm nhân tài và quản lý thực tập sinh.'}
            {currentRole === 'school' && 'Theo dõi tiến độ và đánh giá chất lượng đào tạo.'}
          </p>
        </div>

        <div className="animate-fade-in">
          {currentRole === 'student' && <StudentView />}
          {currentRole === 'business' && <BusinessView />}
          {currentRole === 'school' && <SchoolView />}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 Học – Làm 360. Giải pháp chuyển đổi số cho giáo dục nghề nghiệp Đắk Lắk.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
