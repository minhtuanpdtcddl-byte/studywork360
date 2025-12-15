import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, CheckSquare, AlertCircle } from 'lucide-react';

const DATA_PLACEMENT = [
  { name: 'Đúng chuyên ngành', value: 75, color: '#4f46e5' },
  { name: 'Trái ngành', value: 15, color: '#f59e0b' },
  { name: 'Chưa có việc', value: 10, color: '#ef4444' },
];

export const SchoolView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Tổng quan đào tạo & Thực tập</h2>
          <p className="text-indigo-200">Niên khóa 2024-2025 • Học kỳ II</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Chart */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Tỷ lệ việc làm/Thực tập</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATA_PLACEMENT}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {DATA_PLACEMENT.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-xs mt-2">
                {DATA_PLACEMENT.map(item => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span>{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
           </div>

           {/* Alerts */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" /> Cần chú ý
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">5 Sinh viên chưa nộp báo cáo tuần</p>
                  <p className="text-xs text-red-600 mt-1">Lớp Cơ khí K15 • Hạn chót: Hôm qua</p>
                  <button className="mt-2 text-xs font-bold text-red-700 hover:underline">Gửi nhắc nhở</button>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Doanh nghiệp phản hồi chậm</p>
                  <p className="text-xs text-yellow-600 mt-1">Công ty TNHH ABC chưa duyệt chấm công tháng 10</p>
                </div>
              </div>
           </div>
        </div>

        {/* Real-time feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
             <CheckSquare className="w-5 h-5 text-green-600" /> Báo cáo mới nhất
          </h3>
          <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nguyễn Văn B <span className="text-gray-400 font-normal">đã nộp báo cáo tuần</span></p>
                  <p className="text-xs text-gray-500 mt-0.5">Vừa xong • Công ty Điện lực</p>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 italic border border-gray-100">
                    "Tuần này em đã học được cách đấu nối tủ điện 3 pha..."
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
