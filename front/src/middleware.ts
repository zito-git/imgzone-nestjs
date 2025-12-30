import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware
 *
 * 모든 요청이 페이지에 도달하기 전에 실행됩니다.
 * 서버 사이드에서 쿠키를 확인하여 경로를 보호합니다.
 *
 * 장점:
 * 1. 중앙 집중식 경로 관리 - 한 곳에서 모든 권한 제어
 * 2. 서버 사이드 실행 - 클라이언트 코드 실행 전에 리다이렉트
 * 3. 빠른 응답 - 불필요한 페이지 로딩 방지
 * 4. 확장 용이 - 권한 레벨 추가가 쉬움
 */

// 공개 경로 (로그인 불필요)
const publicPaths = ['/', '/login', '/register'];

// 관리자 전용 경로
const adminPaths = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일, API, _next 경로는 무시
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // 파일 확장자가 있는 경로 (이미지, css 등)
  ) {
    return NextResponse.next();
  }

  // 쿠키에서 토큰 확인
  const token = request.cookies.get('accessToken')?.value;
  const userCookie = request.cookies.get('user')?.value;

  let userRole: string | undefined;
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      userRole = user.role;
    } catch {
      // 파싱 실패 시 무시
    }
  }

  const isLoggedIn = !!token;

  // 공개 경로는 누구나 접근 가능
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 관리자 경로 체크
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // 그 외 모든 경로는 로그인 필요
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    // 로그인 후 원래 페이지로 돌아갈 수 있도록 redirect 파라미터 추가
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// middleware가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 경로에서 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
