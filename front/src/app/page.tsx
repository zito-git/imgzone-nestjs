'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/image/ImageGrid';
import ImageUploader from '@/components/image/ImageUploader';
import ImageViewer from '@/components/image/ImageViewer';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Image as ImageType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// 고정된 날짜 사용 (Hydration 에러 방지)
const dummyImages: ImageType[] = [
  { id: '1', url: 'https://picsum.photos/seed/1/800/600', thumbnailUrl: 'https://picsum.photos/seed/1/400/400', title: '풍경', userId: 'user1', views: 1234, createdAt: '2024-12-20T10:00:00.000Z', updatedAt: '2024-12-20T10:00:00.000Z' },
  { id: '2', url: 'https://picsum.photos/seed/2/800/600', thumbnailUrl: 'https://picsum.photos/seed/2/400/400', title: '야경', userId: 'user2', views: 567, createdAt: '2024-12-19T08:00:00.000Z', updatedAt: '2024-12-19T08:00:00.000Z' },
  { id: '3', url: 'https://picsum.photos/seed/3/800/600', thumbnailUrl: 'https://picsum.photos/seed/3/400/400', userId: 'user1', views: 2891, createdAt: '2024-12-18T12:00:00.000Z', updatedAt: '2024-12-18T12:00:00.000Z' },
  { id: '4', url: 'https://picsum.photos/seed/4/800/600', thumbnailUrl: 'https://picsum.photos/seed/4/400/400', userId: 'user3', views: 123, createdAt: '2024-12-15T14:00:00.000Z', updatedAt: '2024-12-15T14:00:00.000Z' },
  { id: '5', url: 'https://picsum.photos/seed/5/800/600', thumbnailUrl: 'https://picsum.photos/seed/5/400/400', title: '자연', userId: 'user2', views: 892, createdAt: '2024-12-14T16:00:00.000Z', updatedAt: '2024-12-14T16:00:00.000Z' },
  { id: '6', url: 'https://picsum.photos/seed/6/800/600', thumbnailUrl: 'https://picsum.photos/seed/6/400/400', userId: 'user1', views: 445, createdAt: '2024-12-13T18:00:00.000Z', updatedAt: '2024-12-13T18:00:00.000Z' },
  { id: '7', url: 'https://picsum.photos/seed/7/800/600', thumbnailUrl: 'https://picsum.photos/seed/7/400/400', title: '도시', userId: 'user3', views: 667, createdAt: '2024-12-12T20:00:00.000Z', updatedAt: '2024-12-12T20:00:00.000Z' },
  { id: '8', url: 'https://picsum.photos/seed/8/800/600', thumbnailUrl: 'https://picsum.photos/seed/8/400/400', userId: 'user2', views: 234, createdAt: '2024-12-11T22:00:00.000Z', updatedAt: '2024-12-11T22:00:00.000Z' },
];

export default function HomePage() {
  const [images, setImages] = useState<ImageType[]>(dummyImages);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const { isLoggedIn, isLoading } = useAuth();

  const handleUpload = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newImage: ImageType = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      thumbnailUrl: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ''),
      userId: 'currentUser',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setImages([newImage, ...images]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">갤러리</h1>
            <p className="text-sm text-slate-500 mt-1">최근 업로드된 이미지</p>
          </div>
          {/* isLoading 체크로 Hydration 에러 방지 */}
          {!isLoading && isLoggedIn && (
            <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)}>
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              업로드
            </Button>
          )}
        </motion.div>

        <ImageGrid images={images} onImageClick={(image) => setSelectedImage(image)} />
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="이미지 업로드" size="md">
        <ImageUploader onUpload={handleUpload} />
      </Modal>

      {selectedImage && <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
