'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const routeMap: Record<string, string> = {
  '/': '首页',
  '/users': '用户列表',
  '/users/profile': '用户资料',
  '/orders': '订单列表',
  '/orders/stats': '订单统计',
  '/products': '商品列表',
  '/products/categories': '商品分类',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((_, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    return {
      path,
      label: routeMap[path] || segments[index],
    };
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-neutral-400" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-neutral-900">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.path}
              className="text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
