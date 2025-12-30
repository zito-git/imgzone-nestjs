'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { isValidEmail, checkPasswordStrength } from '@/lib/utils';

interface RegisterFormProps {
  onSubmit: (data: { userid: string; password: string; email: string }) => Promise<void>;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({ userid: '', email: '', password: '', passwordConfirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const passwordStrength = checkPasswordStrength(formData.password);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.userid) newErrors.userid = '아이디를 입력해주세요';
    else if (formData.userid.length < 4) newErrors.userid = '4자 이상 입력해주세요';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.userid)) newErrors.userid = '영문, 숫자, 밑줄만 사용 가능합니다';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    else if (!isValidEmail(formData.email)) newErrors.email = '올바른 이메일 형식이 아닙니다';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    else if (formData.password.length < 8) newErrors.password = '8자 이상 입력해주세요';
    if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSubmit({ userid: formData.userid, password: formData.password, email: formData.email });
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-400';
    if (score <= 2) return 'bg-orange-400';
    if (score <= 3) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">회원가입</h1>
        <p className="text-sm text-slate-500 mt-2">계정을 만들고 시작하세요</p>
      </div>

      <Input type="text" label="아이디" placeholder="userid" value={formData.userid} onChange={handleChange('userid')} error={errors.userid} />
      <Input type="email" label="이메일" placeholder="you@example.com" value={formData.email} onChange={handleChange('email')} error={errors.email} />

      <div>
        <Input type="password" label="비밀번호" placeholder="••••••••" value={formData.password} onChange={handleChange('password')} error={errors.password} />
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength.score ? getStrengthColor(passwordStrength.score) : 'bg-slate-200'}`} />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">{passwordStrength.message}</p>
          </div>
        )}
      </div>

      <Input type="password" label="비밀번호 확인" placeholder="••••••••" value={formData.passwordConfirm} onChange={handleChange('passwordConfirm')} error={errors.passwordConfirm} />

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>가입하기</Button>

      <p className="text-center text-sm text-slate-500">
        이미 계정이 있으신가요? <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-medium">로그인</Link>
      </p>
    </motion.form>
  );
}
