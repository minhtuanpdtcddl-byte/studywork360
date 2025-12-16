export type Role = 'student' | 'business' | 'school';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Thực tập';
  postedAt: string;
  skills: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  major: string;
  school: string;
  gpa: number;
  completedHours: number;
  totalHours: number;
  skills: string[];
  email?: string;
  phone?: string;
  address?: string;
  dob?: string;
  bio?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
}

export interface SchoolProfile {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface InternshipReport {
  id: string;
  studentName: string;
  date: string;
  hours: number;
  task: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AiSuggestion {
  jobMatches: string[];
  advice: string;
  missingSkills: string[];
}