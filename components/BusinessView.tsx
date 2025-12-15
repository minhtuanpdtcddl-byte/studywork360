import React from 'react';
import { Users, FilePlus, Search, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CANDIDATE_DATA = [
  { name: 'Cơ khí', count: 120 },
  { name: 'Điện', count: 85 },
  { name: 'CNTT', count: 60 },
  { name: 'Du lịch', count: 95 },
  { name: 'Làm đẹp', count: 40 },
];

export const BusinessView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tin tuyển dụng đang chạy</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FilePlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Hồ sơ ứng tuyển mới</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">45</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Thực tập sinh hiện tại</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">8</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Recruitment Feed */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Ứng viên tiềm năng (Gợi ý bởi AI)</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
              Đăng tin mới
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Ứng viên</th>
                  <th className="px-4 py-3">Ngành nghề</th>
                  <th className="px-4 py-3">Đánh giá kỹ năng</th>
                  <th className="px-4 py-3 rounded-tr-lg">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">SV</div>
                        <span className="font-medium text-gray-800">Ứng viên {i}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">Cơ khí chế tạo</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Rất tốt</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">Xem hồ sơ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Nguồn nhân lực sẵn có</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={CANDIDATE_DATA} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
             <h4 className="text-sm font-bold text-yellow-800 mb-1">Xu hướng tuyển dụng</h4>
             <p className="text-xs text-yellow-700">Ngành Du lịch và Cơ khí đang thiếu hụt nhân sự thực tập trong tháng tới.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
