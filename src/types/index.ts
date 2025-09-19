export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doktor' | 'foydalanuvchi';
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  authorId: string;
  author: User;
  type: 'diagnosis' | 'treatment' | 'prescription' | 'note';
  title: string;
  description: string;
  prescription?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctor: User;
  startAt: string;
  endAt: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  reason: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  newPatientsThisWeek: number;
  completedAppointmentsToday: number;
  pendingAppointments: number;
  recentPatients: Patient[];
  upcomingAppointments: Appointment[];
}