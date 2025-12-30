import { type ClassValue, clsx } from 'clsx';

// 클래스 이름 병합 유틸리티 (tailwind-merge 없이 간단히)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 날짜 포맷팅
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 날짜 문자열 파싱 (다양한 형식 지원)
function parseDate(date: string | Date): Date {
  if (date instanceof Date) return date;

  // "2025.12.30 14:19:41" 형식 지원
  if (/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('.').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  }

  return new Date(date);
}

// 상대적 시간 표시 (하루 이내: "몇분 전", "몇시간 전" / 하루 이상: 날짜)
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = parseDate(date);
  const diff = now.getTime() - d.getTime();

  // 미래 시간인 경우
  if (diff < 0) return '방금 전';

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 하루 이상이면 날짜로 표시
  if (days >= 1) {
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // 하루 이내면 상대 시간
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
}

// 파일 크기 포맷팅
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 이메일 유효성 검사
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 비밀번호 강도 검사
export function checkPasswordStrength(password: string): {
  score: number;
  message: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  const messages = ['매우 약함', '약함', '보통', '강함', '매우 강함'];

  return {
    score,
    message: messages[Math.min(score, messages.length - 1)],
  };
}
