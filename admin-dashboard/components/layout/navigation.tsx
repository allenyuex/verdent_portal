'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { menuItems } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['users', 'orders', 'products']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  return (
    <div className="space-y-1">
      {menuItems.map(item => {
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div key={item.id}>
            <button
              onClick={() => hasChildren && toggleExpand(item.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                'hover:bg-neutral-100',
                !hasChildren && pathname === item.href && 'bg-neutral-100 font-medium'
              )}
            >
              <div className="flex items-center gap-2">
                {getIcon(item.icon)}
                <span className="text-neutral-700">{item.label}</span>
              </div>
              {hasChildren && (
                isExpanded ? <ChevronDown className="h-4 w-4 text-neutral-400" /> : <ChevronRight className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {hasChildren && isExpanded && (
              <div className="ml-6 mt-1 space-y-1 border-l border-neutral-200 pl-2">
                {item.children!.map(child => (
                  <Link
                    key={child.id}
                    href={child.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                      'hover:bg-neutral-100',
                      pathname === child.href ? 'bg-neutral-100 font-medium text-neutral-900' : 'text-neutral-600'
                    )}
                  >
                    {getIcon(child.icon)}
                    <span>{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
