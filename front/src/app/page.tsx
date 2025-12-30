'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ImageUploader from '@/components/image/ImageUploader';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Post, PostListResponse } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatRelativeTime } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoggedIn, isLoading: authLoading, token } = useAuth();

  // 이미지 리스트 조회
  const fetchPosts = useCallback(async (cursor?: string) => {
    try {
      const params = new URLSearchParams();
      if (cursor) params.set('cursor', cursor);
      params.set('size', '20');

      const response = await fetch(`${API_URL}/member/get-post?${params.toString()}`);

      if (!response.ok) {
        throw new Error('이미지 목록을 불러오는데 실패했습니다');
      }

      const data: PostListResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch posts error:', error);
      throw error;
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.post);
        setHasNext(data.pageInfo.hasNext);
        setNextCursor(data.pageInfo.nextCursor);
      } catch {
        toast.error('이미지 목록을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [fetchPosts]);

  // 더보기
  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const data = await fetchPosts(nextCursor);
      setPosts((prev) => [...prev, ...data.post]);
      setHasNext(data.pageInfo.hasNext);
      setNextCursor(data.pageInfo.nextCursor);
    } catch {
      toast.error('더 불러오는데 실패했습니다');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 이미지 업로드
  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    let response: Response;
    try {
      response = await fetch(`${API_URL}/post/upload`, {
        method: 'POST',
        headers: {
          Authorization: token || '',
        },
        body: formData,
      });
    } catch {
      // 네트워크 에러 (413 시 서버가 연결 끊는 경우 포함)
      throw new Error('파일 용량이 너무 큽니다. 더 작은 파일을 선택해주세요.');
    }

    if (!response.ok) {
      if (response.status === 413) {
        throw new Error('파일 용량이 너무 큽니다. 더 작은 파일을 선택해주세요.');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '업로드에 실패했습니다');
    }

    toast.success('업로드 완료!');
    setIsUploadModalOpen(false);

    // 리스트 새로고침
    setIsLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data.post);
      setHasNext(data.pageInfo.hasNext);
      setNextCursor(data.pageInfo.nextCursor);
    } finally {
      setIsLoading(false);
    }
  };

  // 이미지 URL 생성
  const getImageUrl = (filename: string) => {
    return `${API_URL}/uploads/${filename}`;
  };

  // 이미지 클릭
  const handleImageClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  // 이미지 뷰어 닫기
  const handleCloseViewer = () => {
    setSelectedPost(null);
    setCurrentImageIndex(0);
  };

  // 이전/다음 이미지
  const handlePrevImage = () => {
    if (selectedPost && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedPost && currentImageIndex < selectedPost.imgList.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPost) return;
      if (e.key === 'Escape') handleCloseViewer();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost, currentImageIndex]);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">갤러리</h1>
            <p className="text-sm text-slate-500 mt-1">최근 업로드된 이미지</p>
          </div>
          {!authLoading && isLoggedIn && (
            <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)}>
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              업로드
            </Button>
          )}
        </motion.div>

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          /* 빈 상태 */
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500">아직 업로드된 이미지가 없습니다</p>
          </div>
        ) : (
          /* 이미지 그리드 */
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => handleImageClick(post)}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
                    {post.imgList.length > 0 && (
                      <img
                        src={getImageUrl(post.imgList[0])}
                        alt={`Post ${post.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    {/* 여러 이미지 표시 */}
                    {post.imgList.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        +{post.imgList.length - 1}
                      </div>
                    )}

                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium truncate">{post.userid}</p>
                        <p className="text-white/70 text-xs">{formatRelativeTime(post.created)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            {hasNext && (
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={handleLoadMore} isLoading={isLoadingMore}>
                  더보기
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 업로드 모달 */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="이미지 업로드" size="md">
        <ImageUploader onUpload={handleUpload} />
      </Modal>

      {/* 이미지 뷰어 모달 */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={handleCloseViewer}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={handleCloseViewer}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 이미지 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(selectedPost.imgList[currentImageIndex])}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />

              {/* 이미지 정보 */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-medium">{selectedPost.userid}</p>
                <p className="text-white/70 text-sm">{formatRelativeTime(selectedPost.created)}</p>
              </div>

              {/* 이전 버튼 */}
              {selectedPost.imgList.length > 1 && currentImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* 다음 버튼 */}
              {selectedPost.imgList.length > 1 && currentImageIndex < selectedPost.imgList.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* 이미지 인디케이터 */}
              {selectedPost.imgList.length > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm">
                    {currentImageIndex + 1} / {selectedPost.imgList.length}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
