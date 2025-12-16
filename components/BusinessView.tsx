import React, { useState } from 'react';
import { Users, FilePlus, Search, BarChart3, Pencil, Save, X, Trash2, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BusinessProfile, Job } from '../types';

const CANDIDATE_DATA = [
  { name: 'Cơ khí', count: 120 },
  { name: 'Điện', count: 85 },
  { name: 'CNTT', count: 60 },
  { name: 'Du lịch', count: 95 },
  { name: 'Làm đẹp', count: 40 },
];

const MOCK_CANDIDATES = [
  { id: 1, name: 'Nguyễn Văn A', major: 'Cơ khí chế tạo', skills: ['Hàn MIG', 'Đọc bản vẽ'], status: 'Rất tốt' },
  { id: 2, name: 'Trần Thị B', major: 'Kế toán doanh nghiệp', skills: ['Excel', 'MISA'], status: 'Khá' },
  { id: 3, name: 'Lê Văn C', major: 'Công nghệ ô tô', skills: ['Động cơ đốt trong', 'Điện ô tô'], status: 'Xuất sắc' },
  { id: 4, name: 'Phạm Văn D', major: 'Điện công nghiệp', skills: ['PLC', 'Tủ điện'], status: 'Tốt' },
];

export const BusinessView: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  // Business Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState<BusinessProfile>({
    id: 'B001',
    name: 'Công Ty Cơ Khí Đại Lợi',
    industry: 'Cơ khí chế tạo',
    location: 'KCN Tân An, Buôn Ma Thuột',
    description: 'Chuyên sản xuất và gia công các thiết bị cơ khí nông nghiệp công nghệ cao.'
  });
  const [profileForm, setProfileForm] = useState(profile);

  // Job Management State
  const [jobs, setJobs] = useState<Job[]>([
    { id: '1', title: 'Thợ Hàn 3G/6G', company: profile.name, location: 'Buôn Ma Thuột', salary: '8-12 Triệu', type: 'Full-time', postedAt: '2 ngày trước', skills: ['Hàn', 'Cơ khí'] },
    { id: '2', title: 'Kỹ sư thiết kế máy', company: profile.name, location: 'Buôn Ma Thuột', salary: '12-15 Triệu', type: 'Full-time', postedAt: '5 ngày trước', skills: ['SolidWorks', 'AutoCAD'] }
  ]);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({ title: '', salary: '', type: 'Full-time', skills: [] });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveProfile = () => {
    setProfile(profileForm);
    setIsEditingProfile(false);
    showNotification("Đã cập nhật thông tin doanh nghiệp");
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
      setJobs(jobs.filter(j => j.id !== id));
      showNotification("Đã xóa tin tuyển dụng");
    }
  };

  const handleAddJob = () => {
    if (!newJob.title || !newJob.salary) return;
    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title!,
      company: profile.name,
      location: profile.location,
      salary: newJob.salary!,
      type: newJob.type as any,
      postedAt: 'Vừa xong',
      skills: ['Kỹ năng chung'],
    };
    setJobs([job, ...jobs]);
    setIsAddingJob(false);
    setNewJob({ title: '', salary: '', type: 'Full-time', skills: [] });
    showNotification("Đăng tin tuyển dụng thành công!");
  };

  const handleContactCandidate = () => {
    setSelectedCandidate(null);
    showNotification(`Đã gửi lời mời phỏng vấn đến ${selectedCandidate.name}`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white relative">
              <button onClick={() => setSelectedCandidate(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                  <p className="text-indigo-200">{selectedCandidate.major}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Buôn Ma Thuột</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> 09xx xxx xxx</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> email@student.com</div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Kỹ năng nổi bật</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill: string) => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">Đánh giá từ nhà trường</h4>
                <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded border border-yellow-100">
                  "Sinh viên có thái độ học tập tốt, đi học đầy đủ, kỹ năng thực hành mức {selectedCandidate.status}."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button onClick={() => setSelectedCandidate(null)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Đóng</button>
                <button onClick={handleContactCandidate} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold">Mời phỏng vấn</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
        <div className="absolute top-4 right-4">
           {!isEditingProfile ? (
              <button onClick={() => setIsEditingProfile(true)} className="text-gray-400 hover:text-indigo-600">
                <Pencil className="w-5 h-5" />
              </button>
           ) : (
             <div className="flex gap-2">
                <button onClick={handleSaveProfile} className="text-green-600 bg-green-50 p-1 rounded"><Save className="w-5 h-5" /></button>
                <button onClick={() => { setProfileForm(profile); setIsEditingProfile(false); }} className="text-red-500 bg-red-50 p-1 rounded"><X className="w-5 h-5" /></button>
             </div>
           )}
        </div>
        
        {!isEditingProfile ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{profile.industry}</span>
              <span>📍 {profile.location}</span>
            </div>
            <p className="mt-4 text-gray-600">{profile.description}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <input className="w-full text-xl font-bold border rounded p-2" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} placeholder="Tên doanh nghiệp" />
            <div className="grid grid-cols-2 gap-4">
              <input className="border rounded p-2" value={profileForm.industry} onChange={e => setProfileForm({...profileForm, industry: e.target.value})} placeholder="Lĩnh vực" />
              <input className="border rounded p-2" value={profileForm.location} onChange={e => setProfileForm({...profileForm, location: e.target.value})} placeholder="Địa chỉ" />
            </div>
            <textarea className="w-full border rounded p-2" rows={3} value={profileForm.description} onChange={e => setProfileForm({...profileForm, description: e.target.value})} placeholder="Mô tả doanh nghiệp" />
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tin tuyển dụng đang chạy</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{jobs.length}</h3>
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
        <div className="lg:col-span-2 space-y-6">
           {/* Job Management Section */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Quản lý tin tuyển dụng</h3>
                <button onClick={() => setIsAddingJob(!isAddingJob)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700">
                  <Plus className="w-4 h-4" /> Đăng tin mới
                </button>
              </div>

              {isAddingJob && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100 space-y-3">
                  <input className="w-full border p-2 rounded" placeholder="Tiêu đề công việc" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border p-2 rounded" placeholder="Mức lương" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} />
                    <select className="border p-2 rounded" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value as any})}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Thực tập">Thực tập</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsAddingJob(false)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded">Hủy</button>
                    <button onClick={handleAddJob} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Đăng tin</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-800">{job.title}</h4>
                      <p className="text-xs text-gray-500">{job.salary} • {job.type} • {job.postedAt}</p>
                    </div>
                    <button onClick={() => handleDeleteJob(job.id)} className="text-gray-400 hover:text-red-500 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
           </div>

           {/* Candidate Feed */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Ứng viên tiềm năng (Gợi ý bởi AI)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Ứng viên</th>
                    <th className="px-4 py-3">Ngành nghề</th>
                    <th className="px-4 py-3">Đánh giá</th>
                    <th className="px-4 py-3 rounded-tr-lg">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_CANDIDATES.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">{candidate.name.charAt(0)}</div>
                          <span className="font-medium text-gray-800">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{candidate.major}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${candidate.status === 'Xuất sắc' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedCandidate(candidate)} className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">Xem hồ sơ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
        </div>
      </div>
    </div>
  );
};
