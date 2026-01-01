// User 관련 타입
export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// Image 관련 타입 (기존 - 추후 제거 예정)
export interface Image {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  userId: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Post 관련 타입 (API 응답 형식)
export interface Post {
  id: string;
  userid: string;
  role: string;
  created: string;
  imgList: string[];
}

export interface PostListResponse {
  post: Post[];
  pageInfo: {
    nextCursor: string | null;
    hasNext: boolean;
  };
}

// Auth 관련 타입
export interface LoginRequest {
  userid: string;
  password: string;
}

export interface RegisterRequest {
  userid: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

// API Response 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Cursor 기반 Pagination 타입
export interface CursorPaginationParams {
  cursor?: string;
  size?: number;
}

// Profile 관련 타입
export interface ProfileUser {
  id: string;
  role: string;
  email: string;
}

export interface ProfilePost {
  id: string;
  imgList: string[];
  status: boolean;
  created: string;
}

export interface ProfileResponse {
  user: ProfileUser;
  post: ProfilePost[];
}
