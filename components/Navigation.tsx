import React from 'react';
import { Role } from '../types';
import { GraduationCap, LayoutDashboard, Building2, School } from 'lucide-react';

interface Props {
  currentRole: Role;
  setRole: (role: Role) => void;
}

export const Navigation: React.FC<Props> = ({ currentRole, setRole }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 leading-none">Học – Làm 360</span>
              <span className="text-xs text-gray-500 font-medium">Nền tảng việc làm nghề Đắk Lắk</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline mr-2">Chế độ xem:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setRole('student')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentRole === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Sinh viên</span>
              </button>
              <button
                onClick={() => setRole('business')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentRole === 'business' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Doanh nghiệp</span>
              </button>
              <button
                onClick={() => setRole('school')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentRole === 'school' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <School className="w-4 h-4" />
                <span className="hidden sm:inline">Nhà trường</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
