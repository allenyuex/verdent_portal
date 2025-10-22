import { User } from '@/types';

export const sendVerificationCode = async (email: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Verification code sent to ${email}: 123456`);
  return true;
};

export const verifyCode = async (email: string, code: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (code === '123456') {
    return {
      id: 'admin-1',
      email,
      name: 'Admin User',
      avatar: '',
      createdAt: new Date().toISOString(),
    };
  }
  
  return null;
};
