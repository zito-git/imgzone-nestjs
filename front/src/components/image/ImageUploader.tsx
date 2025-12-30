'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/common/Button';
import { formatFileSize } from '@/lib/utils';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>;
  maxSize?: number;
  acceptedTypes?: string[];
}

export default function ImageUploader({
  onUpload,
  maxSize = 10 * 1024 * 1024,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    if (!acceptedTypes.includes(file.type)) {
      setError('JPG, PNG, GIF, WebP 파일만 업로드 가능합니다');
      return false;
    }
    if (file.size > maxSize) {
      setError(`파일 크기는 ${formatFileSize(maxSize)} 이하여야 합니다`);
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      await onUpload(selectedFile);
      setSelectedFile(null);
      setPreview(null);
    } catch {
      setError('업로드에 실패했습니다');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
              ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-indigo-100' : 'bg-slate-200'}`}>
                <svg className={`w-6 h-6 ${isDragging ? 'text-indigo-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-1">
                {isDragging ? '여기에 놓으세요' : '클릭 또는 드래그하여 업로드'}
              </p>
              <p className="text-xs text-slate-400">최대 {formatFileSize(maxSize)}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <p className="text-slate-700 truncate max-w-[200px]">{selectedFile?.name}</p>
                <p className="text-slate-400 text-xs">{selectedFile && formatFileSize(selectedFile.size)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isUploading}>취소</Button>
                <Button variant="primary" size="sm" onClick={handleUpload} isLoading={isUploading}>업로드</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm text-red-500 text-center">
          {error}
        </motion.p>
      )}
    </div>
  );
}
