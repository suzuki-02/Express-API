import NavBar from '@/components/shared/NavBar';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import Footer from '@/components/shared/Footer';

const Layout: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
