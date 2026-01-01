"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ProfileCard from "@/components/profile/ProfileCard";
import ImageGrid from "@/components/image/ImageGrid";
import ImageViewer from "@/components/image/ImageViewer";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ProfileResponse, ProfilePost } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<ProfilePost | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "" });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/info/mydata`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // 401 에러 처리
      if (response.status === 401) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        toast.error("토큰이 만료되었습니다. 다시 로그인해주세요.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("프로필 조회에 실패했습니다");
      }

      const data = await response.json();
      setProfileData(data);
      setEditForm({ username: data.user.id, email: data.user.email });
    } catch (error) {
      toast.error("프로필을 불러오는데 실패했습니다");
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleEditProfile = async () => {
    toast.info("프로필 수정 기능은 준비 중입니다");
    setIsEditModalOpen(false);
  };

  const handlePostClick = (post: ProfilePost) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  const handleCloseViewer = () => {
    setSelectedPost(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev > 0 ? prev - 1 : selectedPost.imgList.length - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev < selectedPost.imgList.length - 1 ? prev + 1 : 0
      );
    }
  };

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-slate-500">로딩 중...</div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-indigo-500">
                {profileData.user.id.charAt(0).toUpperCase()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                프로필 수정
              </Button>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {profileData.user.id}
            </h1>
            <p className="text-slate-500 mb-4">{profileData.user.email}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold text-slate-900">
                  {profileData.post.length}
                </span>
                <span className="text-slate-500 ml-1">게시물</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">
                  {profileData.user.role}
                </span>
                <span className="text-slate-500 ml-1">회원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 포스트 그리드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            내 게시물
          </h2>

          {profileData.post.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              업로드한 게시물이 없습니다
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {profileData.post.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePostClick(post)}
                  className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
                >
                  {/* 대표 이미지 (첫 번째 이미지) */}
                  <img
                    src={`${API_BASE_URL}/uploads/${post.imgList[0]}`}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                  />

                  {/* 이미지 개수 인디케이터 */}
                  {post.imgList.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {post.imgList.length}
                    </div>
                  )}

                  {/* 호버 시 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="프로필 수정"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="사용자 이름"
            value={editForm.username}
            onChange={(e) =>
              setEditForm((p) => ({ ...p, username: e.target.value }))
            }
            disabled
          />
          <Input
            label="이메일"
            type="email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm((p) => ({ ...p, email: e.target.value }))
            }
          />
          <div className="flex gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              variant="primary"
              onClick={handleEditProfile}
              className="flex-1"
            >
              저장
            </Button>
          </div>
        </div>
      </Modal>

      {/* 이미지 뷰어 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={handleCloseViewer}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
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

          {selectedPost.imgList.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[90vh] flex flex-col">
            <img
              src={`${API_BASE_URL}/uploads/${selectedPost.imgList[currentImageIndex]}`}
              alt={`Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {selectedPost.imgList.length > 1 && (
              <p className="text-white text-center mt-4">
                {currentImageIndex + 1} / {selectedPost.imgList.length}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
