'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';
import { User as UserType } from '@/types';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (user: Omit<UserType, 'id' | 'createdAt'>) => void;
}

export default function AddUserModal({ open, onClose, onAdd }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = '请输入用户名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(formData);
      setFormData({ name: '', email: '', phone: '', avatar: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', avatar: '' });
    setErrors({ name: '', email: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加用户</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              用户名 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                id="name"
                placeholder="请输入用户名"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="pl-9"
              />
            </div>
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              邮箱 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="pl-9"
              />
            </div>
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">电话</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="请输入电话号码（可选）"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmit}>添加</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
