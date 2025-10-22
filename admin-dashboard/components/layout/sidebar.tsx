'use client';

import { useState } from 'react';
import Logo from './logo';
import Navigation from './navigation';
import UserSection from './user-section';

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <Navigation />
        </nav>
        
        <div className="border-t border-neutral-200 p-4">
          <UserSection />
        </div>
      </div>
    </aside>
  );
}
