import { create } from 'zustand';
import { Appointment } from '../types';

interface AppointmentsState {
  appointments: Appointment[];
  isLoading: boolean;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'patient' | 'doctor' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
}

const mockAppointments: Appointment[] = [
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
  },
  {
    id: '2',
    patientId: '2',
    patient: {
      id: '2',
      firstName: 'Maria',
      lastName: 'Garcia',
      gender: 'female',
      phone: '+998901234568',
      email: 'maria.garcia@email.com',
      dateOfBirth: '1992-07-22',
      address: '456 Oak Ave, Tashkent',
      emergencyContact: 'Carlos Garcia',
      emergencyPhone: '+998907654322',
      notes: 'Allergic to penicillin',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z'
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
    startAt: '2024-01-25T14:00:00Z',
    endAt: '2024-01-25T14:30:00Z',
    status: 'scheduled',
    reason: 'Follow-up consultation',
    createdBy: '3',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
];

export const useAppointmentsStore = create<AppointmentsState>((set, get) => ({
  appointments: [],
  isLoading: false,

  fetchAppointments: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ appointments: mockAppointments, isLoading: false });
  },

  addAppointment: async (appointmentData) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      patient: mockAppointments[0].patient,
      doctor: mockAppointments[0].doctor, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      appointments: [...state.appointments, newAppointment]
    }));
  },

  updateAppointment: async (id: string, appointmentData) => {
    set(state => ({
      appointments: state.appointments.map(a => 
        a.id === id 
          ? { ...a, ...appointmentData, updatedAt: new Date().toISOString() }
          : a
      )
    }));
  },

  deleteAppointment: async (id: string) => {
    set(state => ({
      appointments: state.appointments.filter(a => a.id !== id)
    }));
  }
}));