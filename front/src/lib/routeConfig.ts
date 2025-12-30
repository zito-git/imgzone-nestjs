/**
 * 경로 권한 설정 파일
 *
 * 모든 경로의 접근 권한을 한 곳에서 관리합니다.
 * 새로운 페이지가 추가되면 여기에 등록하세요.
 *
 * 권한 레벨:
 * - 'public': 누구나 접근 가능 (로그인 불필요)
 * - 'auth': 로그인한 사용자만 접근 가능
 * - 'admin': 관리자만 접근 가능 (추후 확장)
 */

export type RouteAccess = 'public' | 'auth' | 'admin';

interface RouteConfig {
  path: string;
  access: RouteAccess;
  redirectTo?: string; // 접근 불가 시 리다이렉트할 경로
}

// 경로별 권한 설정
export const routeConfig: RouteConfig[] = [
  // Public 페이지 (로그인 불필요)
  { path: '/', access: 'public' },
  { path: '/login', access: 'public' },
  { path: '/register', access: 'public' },

  // Auth 페이지 (로그인 필요)
  { path: '/profile', access: 'auth', redirectTo: '/login' },

  // Admin 페이지 (관리자 전용) - 추후 확장
  // { path: '/admin', access: 'admin', redirectTo: '/login' },
];

// 기본 설정: 등록되지 않은 경로는 로그인 필요
export const defaultAccess: RouteAccess = 'auth';
export const defaultRedirect = '/login';

/**
 * 경로에 대한 권한 설정을 가져옵니다.
 */
export function getRouteConfig(pathname: string): RouteConfig | null {
  // 정확히 일치하는 경로 찾기
  const exactMatch = routeConfig.find((route) => route.path === pathname);
  if (exactMatch) return exactMatch;

  // 동적 경로 매칭 (예: /profile/123 → /profile)
  const dynamicMatch = routeConfig.find((route) => {
    if (route.path === '/') return false;
    return pathname.startsWith(route.path + '/') || pathname === route.path;
  });

  return dynamicMatch || null;
}

/**
 * 해당 경로에 접근 가능한지 확인합니다.
 */
export function canAccess(
  pathname: string,
  isLoggedIn: boolean,
  userRole?: string
): { allowed: boolean; redirectTo?: string } {
  const config = getRouteConfig(pathname);
  const access = config?.access || defaultAccess;
  const redirectTo = config?.redirectTo || defaultRedirect;

  switch (access) {
    case 'public':
      return { allowed: true };

    case 'auth':
      return isLoggedIn
        ? { allowed: true }
        : { allowed: false, redirectTo };

    case 'admin':
      return isLoggedIn && userRole === 'ADMIN'
        ? { allowed: true }
        : { allowed: false, redirectTo };

    default:
      return { allowed: false, redirectTo };
  }
}

// 보호된 경로 패턴 (middleware에서 사용)
export const protectedPatterns = ['/profile', '/admin'];
export const publicPatterns = ['/', '/login', '/register'];
