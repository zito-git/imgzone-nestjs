'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// JWT 토큰에서 payload 디코딩
function decodeJWT(token: string) {
  try {
    // Bearer 제거
    const actualToken = token.replace('Bearer ', '');
    const base64Url = actualToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (userid: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/member/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '로그인에 실패했습니다');
      }

      const data = await response.json();

      // API 응답: { access_token: "Bearer ..." }
      if (data.access_token) {
        const payload = decodeJWT(data.access_token);
        login(data.access_token, { userid, id: payload?.id, role: payload?.role });
      }

      toast.success('로그인 성공!');
      router.push('/');
    } catch (error) {
      toast.error('로그인 실패', {
        description: error instanceof Error ? error.message : '아이디 또는 비밀번호를 확인해주세요',
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <LoginForm onSubmit={handleLogin} />
        </div>
      </motion.div>
    </div>
  );
}
