import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/SideNavBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pb-24 md:pb-0">
      {/* Shared Dashboard Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCFFFC] to-[#F7FFF9]" />
        <div className="absolute top-[20%] right-[5%] w-[800px] h-[800px] rounded-full bg-radial-gradient from-[rgba(123,255,217,0.12)] to-transparent blur-3xl opacity-80" />
      </div>

      {/* Navigation Layer */}
      <TopNavBar />
      <SideNavBar />

      {/* Main Workspace Frame */}
      <main className="relative z-10 pt-10 md:pt-28 md:pl-28 md:pr-8 px-4 max-w-[1600px] mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
