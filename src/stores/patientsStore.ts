import { create } from 'zustand';
import { Patient, MedicalRecord } from '../types';

interface PatientsState {
  patients: Patient[];
  currentPatient: Patient | null;
  medicalRecords: Record<string, MedicalRecord[]>;
  isLoading: boolean;
  searchQuery: string;
  fetchPatients: () => Promise<void>;
  fetchPatient: (id: string) => Promise<void>;
  fetchMedicalRecords: (patientId: string) => Promise<void>;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePatient: (id: string, patient: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  addMedicalRecord: (patientId: string, record: Omit<MedicalRecord, 'id' | 'patientId' | 'author' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  setSearchQuery: (query: string) => void;
}

// Mock data
const mockPatients: Patient[] = [
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
  },
  {
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
  {
    id: '3',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    gender: 'male',
    phone: '+998901234569',
    email: 'ahmed.hassan@email.com',
    dateOfBirth: '1978-11-08',
    address: '789 Elm St, Tashkent',
    emergencyContact: 'Fatima Hassan',
    emergencyPhone: '+998907654323',
    notes: 'Diabetes patient',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  }
];

export const usePatientsStore = create<PatientsState>((set, get) => ({
  patients: [],
  currentPatient: null,
  medicalRecords: {},
  isLoading: false,
  searchQuery: '',

  fetchPatients: async () => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ patients: mockPatients, isLoading: false });
  },

  fetchPatient: async (id: string) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    const patient = mockPatients.find(p => p.id === id) || null;
    set({ currentPatient: patient, isLoading: false });
  },

  fetchMedicalRecords: async (patientId: string) => {
    const mockRecords: MedicalRecord[] = [
      {
        id: '1',
        patientId,
        authorId: '2',
        author: {
          id: '2',
          email: 'doctor@clinic.com',
          firstName: 'Dr. Michael',
          lastName: 'Smith',
          role: 'doctor',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        type: 'diagnosis',
        title: 'Annual Checkup',
        description: 'Patient appears healthy. Vital signs normal.',
        createdAt: '2024-01-20T11:00:00Z',
        updatedAt: '2024-01-20T11:00:00Z'
      }
    ];
    
    set(state => ({
      medicalRecords: {
        ...state.medicalRecords,
        [patientId]: mockRecords
      }
    }));
  },

  addPatient: async (patientData) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      patients: [...state.patients, newPatient]
    }));
  },

  updatePatient: async (id: string, patientData) => {
    set(state => ({
      patients: state.patients.map(p => 
        p.id === id 
          ? { ...p, ...patientData, updatedAt: new Date().toISOString() }
          : p
      ),
      currentPatient: state.currentPatient?.id === id 
        ? { ...state.currentPatient, ...patientData, updatedAt: new Date().toISOString() }
        : state.currentPatient
    }));
  },

  deletePatient: async (id: string) => {
    set(state => ({
      patients: state.patients.filter(p => p.id !== id)
    }));
  },

  addMedicalRecord: async (patientId: string, recordData) => {
    const newRecord: MedicalRecord = {
      ...recordData,
      id: Date.now().toString(),
      patientId,
      author: {
        id: '2',
        email: 'doctor@clinic.com',
        firstName: 'Dr. Michael',
        lastName: 'Smith',
        role: 'doctor',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    set(state => ({
      medicalRecords: {
        ...state.medicalRecords,
        [patientId]: [...(state.medicalRecords[patientId] || []), newRecord]
      }
    }));
  },

  setSearchQuery: (query: string) => set({ searchQuery: query })
}));