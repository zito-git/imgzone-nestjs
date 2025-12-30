'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '@/components/profile/ProfileCard';
import ImageGrid from '@/components/image/ImageGrid';
import ImageViewer from '@/components/image/ImageViewer';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { User, Image as ImageType } from '@/types';

// 고정된 날짜 사용 (Hydration 에러 방지)
const dummyUser: User = { id: '1', email: 'user@example.com', username: '홍길동', createdAt: '2024-11-20T10:00:00.000Z', updatedAt: '2024-12-20T10:00:00.000Z' };

const dummyImages: ImageType[] = [
  { id: '1', url: 'https://picsum.photos/seed/user1/800/600', thumbnailUrl: 'https://picsum.photos/seed/user1/400/400', title: '첫 번째 이미지', userId: '1', views: 234, createdAt: '2024-12-13T10:00:00.000Z', updatedAt: '2024-12-13T10:00:00.000Z' },
  { id: '2', url: 'https://picsum.photos/seed/user2/800/600', thumbnailUrl: 'https://picsum.photos/seed/user2/400/400', title: '여행 사진', userId: '1', views: 567, createdAt: '2024-12-17T14:00:00.000Z', updatedAt: '2024-12-17T14:00:00.000Z' },
  { id: '3', url: 'https://picsum.photos/seed/user3/800/600', thumbnailUrl: 'https://picsum.photos/seed/user3/400/400', userId: '1', views: 89, createdAt: '2024-12-20T08:00:00.000Z', updatedAt: '2024-12-20T08:00:00.000Z' },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User>(dummyUser);
  const [images] = useState<ImageType[]>(dummyImages);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ username: user.username, email: user.email });

  const handleEditProfile = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser((p) => ({ ...p, username: editForm.username, email: editForm.email }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ProfileCard user={user} imageCount={images.length} onEditProfile={() => setIsEditModalOpen(true)} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">내 이미지</h2>
          <ImageGrid images={images} onImageClick={(image) => setSelectedImage(image)} />
        </motion.div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="프로필 수정" size="sm">
        <div className="space-y-4">
          <Input label="사용자 이름" value={editForm.username} onChange={(e) => setEditForm((p) => ({ ...p, username: e.target.value }))} />
          <Input label="이메일" type="email" value={editForm.email} onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} />
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="flex-1">취소</Button>
            <Button variant="primary" onClick={handleEditProfile} className="flex-1">저장</Button>
          </div>
        </div>
      </Modal>

      {selectedImage && <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
