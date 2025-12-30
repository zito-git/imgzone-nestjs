"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/common/Button";
import { formatFileSize } from "@/lib/utils";

interface ImageUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  maxSize?: number;
  maxFiles?: number;
  acceptedExtensions?: string[];
}

export default function ImageUploader({
  onUpload,
  maxSize = 50 * 1024 * 1024,
  maxFiles = 10,
  acceptedExtensions = [".png", ".jpg", ".jpeg", ".heic", ".heif"],
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedExtensions.includes(ext)) {
      setError(`허용된 확장자: ${acceptedExtensions.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`파일 크기는 ${formatFileSize(maxSize)} 이하여야 합니다`);
      return false;
    }
    return true;
  };

  const handleFiles = (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files);

    if (previews.length + fileArray.length > maxFiles) {
      setError(`최대 ${maxFiles}개까지 업로드 가능합니다`);
      return;
    }

    const validFiles: { file: File; url: string }[] = [];
    for (const file of fileArray) {
      if (validateFile(file)) {
        validFiles.push({ file, url: URL.createObjectURL(file) });
      }
    }

    setPreviews((prev) => [...prev, ...validFiles]);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [previews.length]
  );

  const handleRemove = (index: number) => {
    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].url);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleUpload = async () => {
    if (previews.length === 0) return;
    setIsUploading(true);
    setError(null);
    try {
      await onUpload(previews.map((p) => p.file));
      // 성공 시 미리보기 초기화
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const acceptString = acceptedExtensions
    .map((ext) => {
      const mimeTypes: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".heic": "image/heic",
        ".heif": "image/heif",
      };
      return mimeTypes[ext] || ext;
    })
    .join(",");

  return (
    <div className="w-full">
      {/* 드롭존 */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-slate-300 hover:border-slate-400 bg-slate-50"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptString}
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
              isDragging ? "bg-indigo-100" : "bg-slate-200"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isDragging ? "text-indigo-500" : "text-slate-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-600 mb-1">
            {isDragging ? "여기에 놓으세요" : "클릭 또는 드래그하여 업로드"}
          </p>
          <p className="text-xs text-slate-400">
            최대 {maxFiles}개, {formatFileSize(maxSize)}/파일
          </p>
        </div>
      </motion.div>

      {/* 미리보기 그리드 */}
      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {previews.map((preview, index) => (
                <motion.div
                  key={preview.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group"
                >
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {previews.length}개 선택됨
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isUploading}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleUpload}
                  isLoading={isUploading}
                >
                  업로드
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 에러 메시지 */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
