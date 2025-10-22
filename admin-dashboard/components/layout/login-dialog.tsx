'use client';

import { useState } from 'react';
import { Mail, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { sendVerificationCode, verifyCode } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入有效的邮箱地址');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await sendVerificationCode(email);
      setIsCodeSent(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('发送验证码失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!code) {
      setError('请输入验证码');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const user = await verifyCode(email, code);
      if (user) {
        login(user);
        onClose();
        setEmail('');
        setCode('');
        setIsCodeSent(false);
      } else {
        setError('验证码错误，请重试');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>登录</DialogTitle>
          <DialogDescription>
            使用邮箱验证码登录系统（测试验证码: 123456）
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱地址</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-9"
                disabled={isCodeSent}
              />
            </div>
          </div>

          {isCodeSent && (
            <div className="space-y-2">
              <Label htmlFor="code">验证码</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input
                  id="code"
                  type="text"
                  placeholder="输入验证码"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="pl-9"
                  maxLength={6}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-2">
            {!isCodeSent ? (
              <Button
                onClick={handleSendCode}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? '发送中...' : '发送验证码'}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || countdown > 0}
                  variant="outline"
                  className="flex-1"
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '重新发送'}
                </Button>
                <Button
                  onClick={handleLogin}
                  disabled={isLoading || !code}
                  className="flex-1"
                >
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
