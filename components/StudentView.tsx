import React, { useState } from 'react';
import { AICareerCoach } from './AICareerCoach';
import { Briefcase, Clock, FileText, CheckCircle, Pencil, Save, X, MapPin, Star, Send, User, Mail, Phone, Calendar } from 'lucide-react';
import { Job, StudentProfile } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Thợ Hàn 3G/6G', company: 'Cơ Khí Đại Lợi', location: 'Buôn Ma Thuột', salary: '8-12 Triệu', type: 'Full-time', postedAt: '2 ngày trước', skills: ['Hàn', 'Cơ khí'] },
  { id: '2', title: 'Thực tập sinh Điện Công nghiệp', company: 'Điện Lực Đắk Lắk', location: 'Buôn Ma Thuột', salary: 'Hỗ trợ 3 Triệu', type: 'Thực tập', postedAt: 'Hôm qua', skills: ['Điện', 'An toàn lao động'] },
  { id: '3', title: 'Kỹ thuật viên sửa chữa ô tô', company: 'Honda Ô tô Đắk Lắk', location: 'Tân An', salary: '7-10 Triệu', type: 'Full-time', postedAt: '5 giờ trước', skills: ['Ô tô', 'Sửa chữa'] },
];

export const StudentView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false); // For the small card
  const [activeModal, setActiveModal] = useState<'timekeeping' | 'report' | 'evaluate' | 'profile' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isEditingModal, setIsEditingModal] = useState(false); // For the big modal
  
  const [profile, setProfile] = useState<StudentProfile>({
    id: 'SV001',
    name: 'Nguyễn Văn A',
    major: 'Công nghệ Ô tô',
    school: 'Cao đẳng Kỹ thuật Đắk Lắk',
    gpa: 3.2,
    completedHours: 120,
    totalHours: 400,
    skills: ['Sửa chữa động cơ', 'Bảo dưỡng định kỳ', 'Tiếng Anh cơ bản'],
    email: 'nguyenvana@email.com',
    phone: '0912 345 678',
    address: 'Buôn Ma Thuột, Đắk Lắk',
    dob: '2003-05-15',
    bio: 'Sinh viên năm cuối nhiệt huyết, đam mê kỹ thuật ô tô và mong muốn tìm kiếm môi trường thực tập chuyên nghiệp.'
  });

  const [editForm, setEditForm] = useState<StudentProfile>(profile);

  // Helper to show temporary notification
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    setIsEditingModal(false);
    showNotification("Đã cập nhật hồ sơ thành công!");
  };

  const handleApply = (jobTitle: string) => {
    showNotification(`Đã gửi hồ sơ ứng tuyển vị trí: ${jobTitle}`);
  };

  const handleCheckIn = () => {
    setActiveModal(null);
    showNotification("✅ Chấm công thành công lúc " + new Date().toLocaleTimeString());
  };

  const handleSubmitReport = () => {
    setActiveModal(null);
    showNotification("📝 Đã gửi báo cáo tuần thành công!");
  };

  const handleSubmitEvaluation = () => {
    setActiveModal(null);
    showNotification("⭐ Đã gửi đánh giá doanh nghiệp!");
  };

  const progress = (profile.completedHours / profile.totalHours) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* MODALS */}
      {activeModal === 'timekeeping' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-orange-500" /> Chấm công
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
              <p className="text-gray-500 text-sm">Thời gian hiện tại</p>
              <p className="text-3xl font-bold text-gray-800">{new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-sm text-gray-600 mt-1">{new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <MapPin className="w-4 h-4" />
              <span>Vị trí: 30 Y Ngông, TP. BMT (Đã xác thực)</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Hủy</button>
              <button onClick={handleCheckIn} className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold">Check-in ngay</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'report' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" /> Báo cáo thực tập
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Công việc đã làm hôm nay</label>
                <textarea className="w-full border rounded-lg p-3 mt-1 h-24 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="- Bảo dưỡng xe Camry...&#10;- Thay nhớt 3 xe..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Khó khăn / Đề xuất</label>
                <textarea className="w-full border rounded-lg p-3 mt-1 h-20 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Không có..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Hủy</button>
              <button onClick={handleSubmitReport} className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">Gửi báo cáo</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'evaluate' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Đánh giá doanh nghiệp
            </h3>
            <p className="text-sm text-gray-600 mb-4">Bạn cảm thấy môi trường làm việc tại <b>Honda Ô tô Đắk Lắk</b> như thế nào?</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
              ))}
            </div>
            <textarea className="w-full border rounded-lg p-3 h-24 mb-4" placeholder="Nhập nhận xét của bạn..." />
            <div className="flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Hủy</button>
              <button onClick={handleSubmitEvaluation} className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">Gửi đánh giá</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'profile' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-start shrink-0">
              <div className="flex items-center gap-4">
                <div className="bg-white p-1 rounded-full">
                  <img src="https://picsum.photos/100/100" alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-indigo-100">{profile.major}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <User className="w-5 h-5 text-indigo-600" /> Hồ sơ cá nhân
                 </h3>
                 {!isEditingModal ? (
                   <button onClick={() => setIsEditingModal(true)} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:underline">
                     <Pencil className="w-4 h-4" /> Chỉnh sửa
                   </button>
                 ) : (
                   <div className="flex gap-2">
                     <button onClick={() => setIsEditingModal(false)} className="text-gray-500 text-sm hover:underline">Hủy</button>
                     <button onClick={handleSave} className="text-green-600 text-sm font-bold hover:underline">Lưu thay đổi</button>
                   </div>
                 )}
               </div>

               <div className="space-y-6">
                 {/* Basic Info */}
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1"><Mail className="w-3 h-3" /> Email</label>
                      {isEditingModal ? (
                        <input className="w-full border rounded p-1.5 text-sm" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                      ) : <p className="text-sm font-medium">{profile.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1"><Phone className="w-3 h-3" /> Số điện thoại</label>
                      {isEditingModal ? (
                        <input className="w-full border rounded p-1.5 text-sm" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                      ) : <p className="text-sm font-medium">{profile.phone}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1"><Calendar className="w-3 h-3" /> Ngày sinh</label>
                      {isEditingModal ? (
                        <input type="date" className="w-full border rounded p-1.5 text-sm" value={editForm.dob} onChange={e => setEditForm({...editForm, dob: e.target.value})} />
                      ) : <p className="text-sm font-medium">{profile.dob}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" /> Địa chỉ</label>
                      {isEditingModal ? (
                        <input className="w-full border rounded p-1.5 text-sm" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                      ) : <p className="text-sm font-medium">{profile.address}</p>}
                    </div>
                 </div>

                 {/* Bio */}
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <label className="text-xs text-gray-500 font-medium block mb-2">Giới thiệu bản thân</label>
                    {isEditingModal ? (
                      <textarea className="w-full border rounded p-2 text-sm" rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} />
                    ) : <p className="text-sm text-gray-700 italic">{profile.bio}</p>}
                 </div>

                 {/* Skills */}
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <label className="text-xs text-gray-500 font-medium block mb-2">Kỹ năng chuyên môn</label>
                    {isEditingModal ? (
                      <input className="w-full border rounded p-2 text-sm" value={editForm.skills.join(', ')} onChange={e => setEditForm({...editForm, skills: e.target.value.split(',').map(s => s.trim())})} placeholder="Nhập kỹ năng, cách nhau dấu phẩy" />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map(s => <span key={s} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">{s}</span>)}
                      </div>
                    )}
                 </div>

                  {/* Education */}
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <label className="text-xs text-gray-500 font-medium block mb-2">Học vấn</label>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">{profile.school}</p>
                        <p className="text-sm text-gray-600">Chuyên ngành: {profile.major}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">GPA: {profile.gpa}</span>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200 flex justify-end gap-3 shrink-0">
               <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Đóng</button>
            </div>
          </div>
        </div>
      )}


      {/* Left Column: Profile & AI */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Chỉnh sửa hồ sơ">
                <Pencil className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="text-green-600 hover:text-green-700 bg-green-50 p-1 rounded">
                  <Save className="w-5 h-5" />
                </button>
                <button onClick={() => { setEditForm(profile); setIsEditing(false); }} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <img src="https://picsum.photos/100/100" alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" />
            <div className="flex-1">
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-500 text-sm">{profile.major}</p>
                  <p className="text-gray-400 text-xs mt-1">{profile.school}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    className="w-full border rounded px-2 py-1 text-sm font-bold"
                    value={editForm.name}
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    placeholder="Họ tên"
                  />
                  <input
                    className="w-full border rounded px-2 py-1 text-xs"
                    value={editForm.major}
                    onChange={e => setEditForm({...editForm, major: e.target.value})}
                    placeholder="Ngành học"
                  />
                  <input
                    className="w-full border rounded px-2 py-1 text-xs"
                    value={editForm.school}
                    onChange={e => setEditForm({...editForm, school: e.target.value})}
                    placeholder="Trường"
                  />
                </div>
              )}
              {!isEditing && (
                 <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">GPA: {profile.gpa}/4.0</span>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="mb-4 space-y-2">
               <div>
                  <label className="text-xs text-gray-500">GPA</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={editForm.gpa}
                    onChange={e => setEditForm({...editForm, gpa: Number(e.target.value)})}
                  />
               </div>
               <div>
                  <label className="text-xs text-gray-500">Kỹ năng (cách nhau dấu phẩy)</label>
                  <textarea
                    className="w-full border rounded px-2 py-1 text-sm"
                    rows={2}
                    value={editForm.skills.join(', ')}
                    onChange={e => setEditForm({...editForm, skills: e.target.value.split(',').map(s => s.trim())})}
                  />
               </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Thực tập:</span>
              <span className="font-medium">{profile.completedHours}/{profile.totalHours} giờ</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            {!isEditing && (
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            )}
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
            <button onClick={() => showNotification("Đã tải thêm việc làm mới")} className="text-indigo-600 text-sm hover:underline">
              Xem tất cả
            </button>
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
                  <button onClick={() => handleApply(job.title)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded transition-colors flex items-center gap-1">
                    <Send className="w-3 h-3" /> Ứng tuyển ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
           <button onClick={() => setActiveModal('timekeeping')} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors transform hover:-translate-y-1">
              <Clock className="w-6 h-6 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Chấm công</span>
           </button>
           <button onClick={() => setActiveModal('report')} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors transform hover:-translate-y-1">
              <FileText className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Viết báo cáo</span>
           </button>
           <button onClick={() => setActiveModal('evaluate')} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors transform hover:-translate-y-1">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Đánh giá</span>
           </button>
           <button onClick={() => setActiveModal('profile')} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors transform hover:-translate-y-1">
              <Briefcase className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Hồ sơ số</span>
           </button>
        </div>
      </div>
    </div>
  );
};