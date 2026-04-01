import NavBar from '@/components/shared/NavBar';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import Footer from '@/components/shared/Footer';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
      <NavBar />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
