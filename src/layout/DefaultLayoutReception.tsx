import React, { useState, ReactNode } from 'react';
import ReceptionSideBar from '@/components/Sidebar/ReceptionSideBar';
import ReceptionHeader from '@/components/Header/ReceptionHeader';

const DefaultLayoutReception: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <ReceptionSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <ReceptionHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main className="bg-dashboardbg">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutReception;
