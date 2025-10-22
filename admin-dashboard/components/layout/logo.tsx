'use client';

import { Layers } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
        <Layers className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-semibold text-neutral-900">Admin</span>
    </div>
  );
}
