import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { MobileDrawer } from './MobileDrawer';
import { GlobalSearch } from '../common/GlobalSearch';

export function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer Menu matching reference */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Global Spotlight Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-10">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar matching reference */}
        <BottomNav
          isDrawerOpen={isDrawerOpen}
          onOpenDrawer={() => setIsDrawerOpen((prev) => !prev)}
          onCloseDrawer={() => setIsDrawerOpen(false)}
        />
      </div>
    </div>
  );
}
