# ImgZone Frontend

## 프로젝트 개요
이미지 업로드 및 공유 서비스 (imgur 스타일)

## 기술 스택
- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Language**: TypeScript

## 디자인 시스템
- **Theme**: Light mode (slate 기반)
- **Accent**: Indigo (#6366f1)
- **Typography**: Geist Sans
- **반응형**: Mobile First (sm, md, lg, xl)

---

## 작업 내역

### 1차 작업 - 프로젝트 초기 설정
- [x] Next.js 프로젝트 생성 (TypeScript, TailwindCSS, App Router)
- [x] Framer Motion 설치 (`npm install framer-motion`)
- [x] clsx 설치 (`npm install clsx`)
- [x] 디렉토리 구조 생성
  - `src/components/common/`
  - `src/components/auth/`
  - `src/components/image/`
  - `src/components/profile/`
  - `src/hooks/`
  - `src/lib/`
  - `src/types/`
- [x] next.config.ts 외부 이미지 도메인 설정 (picsum.photos)
- [x] 환경변수 파일 생성 (.env.example, .env.local)

### 2차 작업 - 공통 컴포넌트
- [x] `src/components/common/Button.tsx` - 버튼 컴포넌트
  - variant: primary, secondary, outline, ghost
  - size: sm, md, lg
  - isLoading, fullWidth 지원
  - Framer Motion 애니메이션
- [x] `src/components/common/Input.tsx` - 입력 컴포넌트
  - label, error, helperText 지원
  - 에러 상태 스타일링
- [x] `src/components/common/Modal.tsx` - 모달 컴포넌트
  - size: sm, md, lg, xl
  - ESC 키 닫기
  - 백드롭 클릭 닫기
  - 애니메이션
- [x] `src/components/common/Navbar.tsx` - 네비게이션 바
  - 고정 헤더
  - 모바일 메뉴
  - 로그인/비로그인 상태 분기

### 3차 작업 - 이미지 컴포넌트
- [x] `src/components/image/ImageCard.tsx` - 이미지 카드
  - 호버 효과 (y: -4)
  - 정보 오버레이
  - 조회수, 업로드 시간 표시
- [x] `src/components/image/ImageGrid.tsx` - 이미지 그리드
  - 반응형 그리드 (2/3/4열)
  - stagger 애니메이션
  - 빈 상태 UI
- [x] `src/components/image/ImageUploader.tsx` - 업로더
  - 드래그 앤 드롭
  - 파일 선택
  - 미리보기
  - 파일 유효성 검사
- [x] `src/components/image/ImageViewer.tsx` - 이미지 뷰어
  - 풀스크린 모달
  - 이미지 정보 패널
  - 링크 복사, 원본 보기

### 4차 작업 - 인증/프로필 컴포넌트
- [x] `src/components/auth/LoginForm.tsx` - 로그인 폼
  - 이메일/비밀번호 유효성 검사
  - 로딩 상태
- [x] `src/components/auth/RegisterForm.tsx` - 회원가입 폼
  - 비밀번호 강도 표시
  - 비밀번호 확인
- [x] `src/components/profile/ProfileCard.tsx` - 프로필 카드
  - 커버 이미지
  - 아바타
  - 이미지 수, 가입일 표시

### 5차 작업 - 유틸리티
- [x] `src/types/index.ts` - 타입 정의
  - User, Image, Auth 관련 타입
  - API Response 타입
  - Pagination 타입
- [x] `src/lib/utils.ts` - 유틸리티 함수
  - formatDate, formatRelativeTime
  - formatFileSize
  - isValidEmail
  - checkPasswordStrength
- [x] `src/lib/api.ts` - API 클라이언트
  - GET, POST, PUT, DELETE
  - 파일 업로드
  - 토큰 자동 첨부

### 6차 작업 - 페이지
- [x] `src/app/layout.tsx` - 루트 레이아웃
- [x] `src/app/globals.css` - 글로벌 스타일
- [x] `src/app/page.tsx` - 메인페이지 (갤러리)
- [x] `src/app/login/page.tsx` - 로그인 페이지
- [x] `src/app/register/page.tsx` - 회원가입 페이지
- [x] `src/app/profile/page.tsx` - 프로필 페이지

### 7차 작업 - 디자인 리뉴얼 (다크 → 라이트)
- [x] globals.css 라이트 테마로 변경
- [x] layout.tsx 배경색 변경
- [x] Navbar 라이트 스타일
- [x] Button 라이트 스타일
- [x] Input 라이트 스타일
- [x] Modal 라이트 스타일
- [x] ImageCard 라이트 스타일
- [x] ImageGrid 라이트 스타일
- [x] ImageUploader 라이트 스타일
- [x] ImageViewer 라이트 스타일
- [x] LoginForm 라이트 스타일
- [x] RegisterForm 라이트 스타일
- [x] ProfileCard 라이트 스타일
- [x] 모든 페이지 라이트 스타일 적용

### 8차 작업 - 회원가입 API 연동
- [x] sonner 라이브러리 설치 (`npm install sonner`)
  - 깔끔한 토스트 메시지 UI
  - richColors, closeButton 옵션 적용
- [x] layout.tsx에 Toaster 컴포넌트 추가
  - position: top-center
- [x] RegisterForm.tsx 수정
  - username → userid로 필드명 변경
  - 아이디 유효성 검사 (4자 이상, 영문/숫자/밑줄만 허용)
  - onSubmit 타입 변경: `{ userid, password, email }`
- [x] register/page.tsx API 연동
  - POST /member/register 엔드포인트 호출
  - JSON 형식 전송
  - 성공/실패 토스트 메시지 표시
  - 성공 시 로그인 페이지로 이동

### 9차 작업 - Pretendard 폰트 & 로그인 API 연동
- [x] Pretendard 폰트 적용
  - layout.tsx head에 link 태그로 CDN 추가
  - globals.css에서 font-family 변경
- [x] LoginForm.tsx 수정
  - email → userid로 필드명 변경
  - 이메일 유효성 검사 제거
  - 아이디 유효성 검사 (4자 이상)
- [x] login/page.tsx API 연동
  - POST /member/login 엔드포인트 호출
  - JSON 형식: `{ userid, password }`
  - JWT 토큰 localStorage 저장
  - 성공/실패 토스트 메시지 표시

### 10차 작업 - 인증 상태 관리 (Context API)
- [x] `src/contexts/AuthContext.tsx` 생성
  - AuthProvider: 전역 인증 상태 관리
  - useAuth hook: 인증 상태 접근
  - login(): JWT 토큰 + 유저 정보 저장
  - logout(): 토큰 제거 + 상태 초기화
  - isLoggedIn, isLoading 상태 제공
- [x] layout.tsx에 AuthProvider 추가
- [x] Navbar.tsx 수정
  - 로그인 전: 로그인, 시작하기 버튼
  - 로그인 후: 마이페이지, 유저 아이디, 로그아웃 버튼
  - 로그아웃 시 토스트 메시지 + 메인으로 이동
- [x] page.tsx (메인) 수정
  - 로그인 상태에서만 업로드 버튼 표시
- [x] login/page.tsx 수정
  - AuthContext의 login 함수 사용

### 11차 작업 - 로그인 API 응답 필드 수정
- [x] login/page.tsx 수정
  - API 응답 필드명 수정: `accessToken` → `access_token`
  - JWT 디코딩 함수 추가 (decodeJWT)
  - JWT payload에서 id, role 정보 추출
- [x] AuthContext.tsx 수정
  - User 타입 확장: `{ userid, id?, role? }`
  - token 상태 추가
  - localStorage에 토큰 + 유저 정보 저장

### 12차 작업 - 경로 보호 (ProtectedRoute 컴포넌트 방식)
- [x] ~~ProtectedRoute.tsx 생성~~ (13차에서 제거됨)

### 13차 작업 - 경로 보호 개선 (Middleware 방식)
- [x] `src/lib/routeConfig.ts` 생성
  - 경로별 권한 설정 중앙 관리
  - 권한 레벨: `public`, `auth`, `admin`
  - 확장 가능한 구조
- [x] `src/middleware.ts` 생성
  - Next.js Middleware로 서버 사이드에서 경로 보호
  - 페이지 로딩 전에 리다이렉트 처리
- [x] AuthContext.tsx 수정
  - localStorage → Cookie 기반으로 변경
  - 쿠키 유틸리티 함수 추가 (setCookie, getCookie, deleteCookie)
- [x] ProtectedRoute.tsx 삭제 (더 이상 필요 없음)

**접근 권한 정리:**
| 페이지 | 경로 | 권한 | 비로그인 시 |
|--------|------|------|-------------|
| 메인 (갤러리) | `/` | public | 접근 가능 |
| 로그인 | `/login` | public | 접근 가능 |
| 회원가입 | `/register` | public | 접근 가능 |
| 마이페이지 | `/profile` | auth | → `/login` 리다이렉트 |
| 관리자 | `/admin/*` | admin | → `/login` 리다이렉트 |

**새 페이지 추가 시:**
```typescript
// src/lib/routeConfig.ts 에서
export const routeConfig: RouteConfig[] = [
  // 여기에 추가만 하면 끝!
  { path: '/new-page', access: 'auth', redirectTo: '/login' },
];
```

**Middleware vs ProtectedRoute 비교:**
| 항목 | Middleware | ProtectedRoute |
|------|------------|----------------|
| 실행 위치 | 서버 (Edge) | 클라이언트 |
| 페이지 코드 수정 | 불필요 | 각 페이지마다 감싸야 함 |
| 리다이렉트 속도 | 빠름 (페이지 로딩 전) | 느림 (페이지 로딩 후) |
| 권한 관리 | 중앙 집중 | 분산 |
| 확장성 | 좋음 | 보통 |

---

## 수정/개선 필요
- [x] 회원가입 API 연동
- [x] 토스트 메시지 (sonner)
- [x] 로그인 API 연동
- [x] 인증 상태 관리 (Context API → Cookie)
- [x] 로그아웃 기능 연동
- [x] 경로 보호 (Middleware)
- [ ] 실제 이미지 업로드 구현
- [ ] 이미지 삭제 기능
- [ ] 무한 스크롤 또는 페이지네이션
- [ ] SEO 메타데이터 설정
- [ ] 로딩 상태 UI (Skeleton)

---

## 페이지 구조
```
/                   - 메인페이지 (갤러리)
/login              - 로그인
/register           - 회원가입
/profile            - 내정보
```

## 디렉토리 구조
```
src/
├── middleware.ts          # 경로 보호 (서버 사이드)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── profile/page.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   └── routeConfig.ts     # 경로 권한 설정
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Navbar.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── image/
│   │   ├── ImageCard.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── ImageUploader.tsx
│   │   └── ImageViewer.tsx
│   └── profile/
│       └── ProfileCard.tsx
└── types/
    └── index.ts
```

## 컬러 팔레트 (Light Theme)
```css
--background: #f8fafc (slate-50)
--card: #ffffff (white)
--border: #e2e8f0 (slate-200)
--muted: #64748b (slate-500)
--foreground: #0f172a (slate-900)
--accent: #6366f1 (indigo-500)
```

## 컴포넌트 스타일 가이드
- 카드: `bg-white border border-slate-200 rounded-xl shadow-sm`
- 버튼 Primary: `bg-indigo-500 hover:bg-indigo-600`
- 버튼 Ghost: `text-slate-600 hover:text-slate-900 hover:bg-slate-100`
- Input: `bg-white border-slate-300 focus:ring-indigo-500`
- 네비바: `bg-white/80 backdrop-blur-md border-b border-slate-200`

## 애니메이션
- 페이지 진입: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- 카드 호버: `y: -4`
- 버튼: `scale: 1.01` (hover), `scale: 0.99` (tap)
- 모달: `scale: 0.95` → `scale: 1`
- 리스트: `staggerChildren: 0.05`

## 환경변수
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
