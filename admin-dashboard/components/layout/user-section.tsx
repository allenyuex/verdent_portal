'use client';

import { useState } from 'react';
import { LogIn, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import LoginDialog from './login-dialog';
import Link from 'next/link';

export default function UserSection() {
  const { user, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowLoginDialog(true)}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <LogIn className="h-4 w-4" />
          <span>登录</span>
        </Button>
        <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-neutral-100">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-neutral-200 text-neutral-700">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-sm font-medium text-neutral-900">{user.name}</span>
            <span className="text-xs text-neutral-500">{user.email}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/users/profile" className="flex cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>用户设置</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
