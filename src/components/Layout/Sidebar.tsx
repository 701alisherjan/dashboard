import React from 'react';
import { Home, Users, Calendar, FileText, UserCheck, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, allowedRoles: ['admin', 'doctor', 'reception'] },
    { id: 'patients', label: 'Patients', icon: Users, allowedRoles: ['admin', 'doctor', 'reception'] },
    { id: 'appointments', label: 'Appointments', icon: Calendar, allowedRoles: ['admin', 'doctor', 'reception'] },
    { id: 'records', label: 'Medical Records', icon: FileText, allowedRoles: ['admin', 'doctor'] },
    { id: 'users', label: 'User Management', icon: UserCheck, allowedRoles: ['admin'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, allowedRoles: ['admin', 'doctor'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.allowedRoles.includes(user?.role || '')
  );

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Navigation
        </h2>
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-blue-900 mb-1">Medical System</p>
          <p className="text-xs text-blue-700">PatientCare Lite v1.0</p>
        </div>
      </div>
    </div>
  );
};