import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden">

      {children}
    </div>
  );
};

export default Container;
