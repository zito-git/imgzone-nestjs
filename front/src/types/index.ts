// User 관련 타입
export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// Image 관련 타입
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

// Auth 관련 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// API Response 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
