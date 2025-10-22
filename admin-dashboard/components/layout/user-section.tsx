'use client';

import { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import LoginDialog from './login-dialog';

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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-neutral-200 text-neutral-700">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">{user.name}</span>
          <span className="text-xs text-neutral-500">{user.email}</span>
        </div>
      </div>
      <Button
        onClick={logout}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
