'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface LoginFormProps {
  onSubmit: (userid: string, password: string) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ userid?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { userid?: string; password?: string } = {};
    if (!userid) newErrors.userid = '아이디를 입력해주세요';
    else if (userid.length < 4) newErrors.userid = '4자 이상 입력해주세요';
    if (!password) newErrors.password = '비밀번호를 입력해주세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSubmit(userid, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">로그인</h1>
        <p className="text-sm text-slate-500 mt-2">계정에 로그인하세요</p>
      </div>

      <Input type="text" label="아이디" placeholder="userid" value={userid} onChange={(e) => setUserid(e.target.value)} error={errors.userid} autoComplete="username" />
      <Input type="password" label="비밀번호" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} autoComplete="current-password" />

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>로그인</Button>

      <p className="text-center text-sm text-slate-500">
        계정이 없으신가요? <Link href="/register" className="text-indigo-500 hover:text-indigo-600 font-medium">회원가입</Link>
      </p>
    </motion.form>
  );
}
