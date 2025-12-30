'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { User } from '@/types';
import { formatDate } from '@/lib/utils';
import Button from '@/components/common/Button';

interface ProfileCardProps {
  user: User;
  imageCount?: number;
  onEditProfile?: () => void;
}

export default function ProfileCard({ user, imageCount = 0, onEditProfile }: ProfileCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-indigo-400 to-purple-400" />

      <div className="relative px-6 pb-6">
        <div className="absolute -top-10 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
            {user.profileImage ? (
              <Image src={user.profileImage} alt={user.username} width={80} height={80} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {onEditProfile && (
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={onEditProfile}>수정</Button>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-slate-800">{user.username}</h2>
          <p className="text-sm text-slate-500">{user.email}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {imageCount} 이미지
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
