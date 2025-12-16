import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, CheckSquare, AlertCircle, Pencil, Save, X, Plus, Trash2, User, Send } from 'lucide-react';
import { SchoolProfile, StudentProfile } from '../types';

const DATA_PLACEMENT = [
  { name: 'Đúng chuyên ngành', value: 75, color: '#4f46e5' },
  { name: 'Trái ngành', value: 15, color: '#f59e0b' },
  { name: 'Chưa có việc', value: 10, color: '#ef4444' },
];

export const SchoolView: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  // School Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState<SchoolProfile>({
    id: 'SCH01',
    name: 'Trường Cao đẳng Kỹ thuật Đắk Lắk',
    address: 'Đ. Hoàng Hoa Thám, Tân An, TP. Buôn Ma Thuột',
    phone: '0262 3858 585'
  });
  const [profileForm, setProfileForm] = useState(profile);

  // Student Management State
  const [students, setStudents] = useState<Partial<StudentProfile>[]>([
    { id: 'SV01', name: 'Nguyễn Văn A', major: 'Cơ khí', completedHours: 120, totalHours: 400 },
    { id: 'SV02', name: 'Trần Thị B', major: 'Kế toán', completedHours: 350, totalHours: 400 },
    { id: 'SV03', name: 'Lê Văn C', major: 'Công nghệ ô tô', completedHours: 50, totalHours: 400 },
  ]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', major: '' });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveProfile = () => {
    setProfile(profileForm);
    setIsEditingProfile(false);
    showNotification("Đã cập nhật thông tin nhà trường");
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Xóa sinh viên này khỏi danh sách quản lý?')) {
      setStudents(students.filter(s => s.id !== id));
      showNotification("Đã xóa sinh viên khỏi danh sách");
    }
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.major) return;
    const student = {
      id: `SV${Date.now()}`,
      name: newStudent.name,
      major: newStudent.major,
      completedHours: 0,
      totalHours: 400,
    };
    setStudents([...students, student]);
    setIsAddingStudent(false);
    setNewStudent({ name: '', major: '' });
    showNotification("Đã thêm sinh viên mới");
  };

  const handleSendReminder = () => {
     showNotification("Đã gửi email và tin nhắn nhắc nhở đến 5 sinh viên.");
  };

  return (
    <div className="space-y-6 relative">
      {/* Notifications */}
      {notification && (
        <div className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {/* Editable Header */}
      <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {!isEditingProfile ? (
                <>
                  <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                  <p className="text-indigo-200 text-sm flex gap-4">
                    <span>📍 {profile.address}</span>
                    <span>📞 {profile.phone}</span>
                  </p>
                </>
              ) : (
                <div className="space-y-2 max-w-lg">
                  <input 
                    className="w-full bg-white/10 border border-white/30 rounded px-2 py-1 text-white placeholder-indigo-300" 
                    value={profileForm.name} 
                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      className="bg-white/10 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder-indigo-300" 
                      value={profileForm.address} 
                      onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                    />
                     <input 
                      className="bg-white/10 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder-indigo-300" 
                      value={profileForm.phone} 
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-4">
              {!isEditingProfile ? (
                <button onClick={() => setIsEditingProfile(true)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Pencil className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="p-2 bg-green-500 hover:bg-green-600 rounded-lg"><Save className="w-5 h-5" /></button>
                  <button onClick={() => setIsEditingProfile(false)} className="p-2 bg-red-500 hover:bg-red-600 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           {/* Student Management */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                 <User className="w-5 h-5 text-indigo-600" /> Quản lý Sinh viên
               </h3>
               <button onClick={() => setIsAddingStudent(!isAddingStudent)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700">
                 <Plus className="w-4 h-4" /> Thêm sinh viên
               </button>
             </div>

             {isAddingStudent && (
               <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-2 items-end">
                 <div className="flex-1">
                   <label className="text-xs font-medium text-gray-500">Họ tên</label>
                   <input className="w-full border p-2 rounded text-sm" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} placeholder="Nhập tên SV" />
                 </div>
                 <div className="flex-1">
                   <label className="text-xs font-medium text-gray-500">Ngành học</label>
                   <input className="w-full border p-2 rounded text-sm" value={newStudent.major} onChange={e => setNewStudent({...newStudent, major: e.target.value})} placeholder="Nhập ngành" />
                 </div>
                 <button onClick={handleAddStudent} className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">Lưu</button>
               </div>
             )}

             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                   <tr>
                     <th className="px-4 py-3 text-left">Mã SV</th>
                     <th className="px-4 py-3 text-left">Họ tên</th>
                     <th className="px-4 py-3 text-left">Ngành</th>
                     <th className="px-4 py-3 text-left">Tiến độ thực tập</th>
                     <th className="px-4 py-3 text-right">Xóa</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {students.map((student) => (
                     <tr key={student.id} className="hover:bg-gray-50">
                       <td className="px-4 py-3 text-gray-500">{student.id}</td>
                       <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                       <td className="px-4 py-3 text-gray-600">{student.major}</td>
                       <td className="px-4 py-3">
                         <div className="w-24 bg-gray-200 rounded-full h-1.5">
                           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(student.completedHours! / student.totalHours!) * 100}%` }}></div>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-right">
                         <button onClick={() => handleDeleteStudent(student.id!)} className="text-gray-400 hover:text-red-500">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>

           {/* Stats & Alerts (Existing) */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Tỷ lệ việc làm</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DATA_PLACEMENT} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                        {DATA_PLACEMENT.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" /> Cần chú ý
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">5 Sinh viên chưa nộp báo cáo</p>
                    <button onClick={handleSendReminder} className="mt-1 text-xs font-bold text-red-700 hover:underline flex items-center gap-1">
                      <Send className="w-3 h-3" /> Gửi nhắc nhở
                    </button>
                  </div>
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
                  <p className="text-sm font-medium text-gray-900">Nguyễn Văn B</p>
                  <p className="text-xs text-gray-500 mt-0.5">Vừa xong • Công ty Điện lực</p>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 italic border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => showNotification("Đã mở chi tiết báo cáo")}>
                    "Đã hoàn thành lắp đặt tủ điện..."
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
