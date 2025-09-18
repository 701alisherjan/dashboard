import React from 'react';
import { useAuthStore } from './stores/authStore';
import { LoginForm } from './components/Auth/LoginForm';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientsList } from './components/Patients/PatientsList';
import { AppointmentsList } from './components/Appointments/AppointmentsList';

function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderPage = (currentPage: string) => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientsList />;
      case 'appointments':
        return <AppointmentsList />;
      case 'records':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Records</h2>
            <p className="text-gray-600">This section is available within individual patient details.</p>
          </div>
        );
      case 'users':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">User management functionality would be implemented here.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Advanced analytics and reporting would be available here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return <Layout>{renderPage}</Layout>;
}

export default App;