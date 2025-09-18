import { create } from 'zustand';
import { DashboardStats } from '../types';

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

const mockStats: DashboardStats = {
  totalPatients: 1247,
  todayAppointments: 18,
  newPatientsThisWeek: 24,
  completedAppointmentsToday: 12,
  pendingAppointments: 6,
  recentPatients: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      phone: '+998901234567',
      email: 'john.doe@email.com',
      dateOfBirth: '1985-03-15',
      address: '123 Main St, Tashkent',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '+998907654321',
      notes: 'Regular checkups needed',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ],
  upcomingAppointments: [
    {
      id: '1',
      patientId: '1',
      patient: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        phone: '+998901234567',
        email: 'john.doe@email.com',
        dateOfBirth: '1985-03-15',
        address: '123 Main St, Tashkent',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+998907654321',
        notes: 'Regular checkups needed',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      doctorId: '2',
      doctor: {
        id: '2',
        email: 'doctor@clinic.com',
        firstName: 'Dr. Michael',
        lastName: 'Smith',
        role: 'doctor',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      startAt: '2024-01-25T09:00:00Z',
      endAt: '2024-01-25T09:30:00Z',
      status: 'scheduled',
      reason: 'Regular checkup',
      createdBy: '3',
      createdAt: '2024-01-20T08:00:00Z',
      updatedAt: '2024-01-20T08:00:00Z'
    }
  ]
};

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ stats: mockStats, isLoading: false });
  }
}));