'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Image as ImageType } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

interface ImageCardProps {
  image: ImageType;
  onClick?: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
        <Image
          src={image.thumbnailUrl || image.url}
          alt={image.title || '이미지'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {image.title && (
            <p className="text-sm font-medium text-white truncate">{image.title}</p>
          )}
          <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
            <span>{formatRelativeTime(image.createdAt)}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {image.views}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
