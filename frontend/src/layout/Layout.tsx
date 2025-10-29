import NavBar from '@/components/shared/NavBar';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden">
      <NavBar />
      <main className="px-4 py-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
