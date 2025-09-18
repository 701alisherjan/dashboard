import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: (currentPage: string) => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children(currentPage)}
          </div>
        </main>
      </div>
    </div>
  );
};