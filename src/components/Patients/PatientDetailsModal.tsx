import React, { useEffect, useState } from 'react';
import { X, User, Phone, Mail, MapPin, AlertCircle, Plus, FileText, Calendar } from 'lucide-react';
import { usePatientsStore } from '../../stores/patientsStore';
import { MedicalRecordModal } from './MedicalRecordModal';
import { Patient } from '../../types';

interface PatientDetailsModalProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ patient, onClose }) => {
  const { medicalRecords, fetchMedicalRecords } = usePatientsStore();
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchMedicalRecords(patient.id);
  }, [patient.id, fetchMedicalRecords]);

  const patientRecords = medicalRecords[patient.id] || [];

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'diagnosis': return 'bg-red-100 text-red-800';
      case 'treatment': return 'bg-blue-100 text-blue-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'note': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm text-gray-600">Patient Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Patient Information
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'records'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Medical Records ({patientRecords.length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{patient.firstName} {patient.lastName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{patient.phone}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{patient.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{patient.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 mt-1 capitalize">{patient.gender}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900 mt-1">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                    <p className="text-gray-900 mt-1">{patient.emergencyContact}</p>
                    <p className="text-gray-600 text-sm">{patient.emergencyPhone}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Patient Since</label>
                    <p className="text-gray-900 mt-1">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {patient.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <label className="text-sm font-medium text-yellow-800">Notes</label>
                  </div>
                  <p className="text-yellow-700">{patient.notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                <button
                  onClick={() => setShowRecordModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Record</span>
                </button>
              </div>

              {patientRecords.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records</h3>
                  <p className="text-gray-600 mb-4">Start by adding the first medical record for this patient.</p>
                  <button
                    onClick={() => setShowRecordModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Record</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {patientRecords.map((record) => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRecordTypeColor(record.type)}`}>
                              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                            </span>
                            <h4 className="font-semibold text-gray-900">{record.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                          {record.prescription && (
                            <div className="bg-green-50 border border-green-200 rounded p-3 mt-3">
                              <p className="text-sm font-medium text-green-800 mb-1">Prescription:</p>
                              <p className="text-sm text-green-700">{record.prescription}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {record.author.firstName} {record.author.lastName}</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showRecordModal && (
        <MedicalRecordModal
          patientId={patient.id}
          onClose={() => setShowRecordModal(false)}
        />
      )}
    </div>
  );
};