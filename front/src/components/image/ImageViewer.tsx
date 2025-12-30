'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Image as ImageType } from '@/types';
import { formatDate } from '@/lib/utils';
import Button from '@/components/common/Button';

interface ImageViewerProps {
  image: ImageType;
  onClose: () => void;
}

export default function ImageViewer({ image, onClose }: ImageViewerProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(image.url);
    } catch {
      // silent fail
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex flex-col lg:flex-row w-full h-full max-w-6xl mx-auto p-4 gap-4" onClick={(e) => e.stopPropagation()}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full h-full max-h-[70vh] lg:max-h-full">
            <Image src={image.url} alt={image.title || '이미지'} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 70vw" priority />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:w-72 bg-white rounded-xl p-5 shadow-lg">
          {image.title && <h2 className="text-lg font-semibold text-slate-900 mb-4">{image.title}</h2>}

          <div className="space-y-3 text-sm text-slate-500 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(image.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{image.views.toLocaleString()} views</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="primary" fullWidth size="sm" onClick={handleCopyLink}>링크 복사</Button>
            <Button variant="outline" fullWidth size="sm" onClick={() => window.open(image.url, '_blank')}>원본 보기</Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
