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

### 14차 작업 - 이미지 업로드 & 리스트 API 연동
- [x] `src/types/index.ts` 수정
  - Post, PostListResponse 타입 추가
  - 커서 기반 페이지네이션 타입 추가
- [x] `src/components/image/ImageUploader.tsx` 수정
  - 단일 파일 → 다중 파일 업로드 지원 (최대 10개)
  - 허용 확장자: `.png`, `.jpg`, `.jpeg`, `.heic`, `.heif`
  - 미리보기 그리드 UI
  - 개별 파일 삭제 기능
- [x] `src/app/page.tsx` 전면 수정
  - 더미 데이터 제거
  - GET `/member/get-post?cursor&size=20` API 연동
  - POST `/post/upload` (multipart/form-data) API 연동
  - 커서 기반 페이지네이션 (더보기 버튼)
  - 로딩/빈 상태 UI
  - 업로드 후 리스트 새로고침

**API 스펙:**
```
# 이미지 리스트 조회
GET /member/get-post?cursor={cursor}&size=20
Response: { post: Post[], pageInfo: { nextCursor, hasNext } }

# 이미지 업로드
POST /post/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}
Body: files (최대 10개)
```

### 15차 작업 - 이미지 뷰어 & 상대 시간 표시
- [x] `src/lib/utils.ts` 수정
  - parseDate 함수 추가 ("2025.12.30 14:19:41" 형식 지원)
  - formatRelativeTime 개선 (하루 이내: 상대시간 / 하루 이상: 날짜)
- [x] `src/app/page.tsx` 이미지 뷰어 추가
  - 이미지 클릭 시 풀스크린 모달로 확대
  - 여러 이미지일 경우 좌우 화살표로 탐색
  - 키보드 지원 (ESC: 닫기, ←/→: 이전/다음)
  - 이미지 인디케이터 (1/3 형식)
  - 상대 시간 표시

**상대 시간 표시 규칙:**
| 경과 시간 | 표시 |
|----------|------|
| 1분 미만 | 방금 전 |
| 1분 ~ 59분 | N분 전 |
| 1시간 ~ 23시간 | N시간 전 |
| 1일 이상 | 2024년 12월 30일 (날짜 형식) |

### 16차 작업 - 업로드 용량 초과 에러 처리
- [x] `src/app/page.tsx` 수정
  - fetch를 try-catch로 감싸서 네트워크 에러 처리
  - 413 에러 또는 연결 끊김 시 "파일 용량이 너무 큽니다" 메시지 표시

### 17차 작업 - 세션스토리지 & 업로드 용량 제한 & 프로필 조회
- [x] JWT 토큰 관리 방식 변경 (쿠키 → 세션스토리지)
  - `src/contexts/AuthContext.tsx` 수정
    - 쿠키 유틸리티 함수 제거
    - sessionStorage 사용으로 변경
  - `src/lib/api.ts` 수정
    - localStorage → sessionStorage로 변경
    - Authorization 헤더 자동 추가 (기존 기능 유지)
  - `src/middleware.ts` 삭제
    - 세션스토리지는 클라이언트 전용이므로 서버 사이드 Middleware 제거
  - `src/app/profile/page.tsx` 수정
    - useAuth를 사용한 클라이언트 사이드 경로 보호 추가
- [x] 업로드 시 파일 총 용량 제한 기능
  - `src/components/image/ImageUploader.tsx` 수정
    - 총 파일 용량 계산 (50MB 제한)
    - 파일 추가 시 총 용량 체크
    - UI에 총 용량 표시 (현재 용량 / 50MB)
    - 50MB 초과 시:
      - 에러 메시지 표시
      - 업로드 버튼 비활성화
      - 용량 텍스트 빨간색으로 강조
- [x] 프로필 조회 API 연동
  - `src/types/index.ts` 타입 추가
    - ProfileUser, ProfilePost, ProfileResponse 타입 추가
  - `src/app/profile/page.tsx` 전면 수정
    - GET `/post/info` API 연동
    - 더미 데이터 제거
    - 실제 프로필 데이터 표시
    - 이미지 그리드 (사용자가 업로드한 모든 이미지)
    - 이미지 뷰어 (클릭 시 풀스크린, 좌우 탐색)
    - 로딩 상태 UI
    - 로그인하지 않은 경우 리다이렉트

**API 스펙:**
```
# 프로필 조회
GET /post/info
Authorization: Bearer {token}
Response: {
  user: { id, role, email },
  post: [{ id, imgList, created }]
}
```

**변경 사항 요약:**
- 토큰 저장소: 쿠키 → 세션스토리지 (탭 닫으면 자동 로그아웃)
- 경로 보호: 서버 사이드 Middleware → 클라이언트 사이드 useAuth
- 업로드 제한: 개별 파일 크기만 체크 → 총 용량도 체크 (50MB)
- 프로필 페이지: 더미 데이터 → 실제 API 데이터

### 18차 작업 - 프로필 페이지 포스트별 그룹화
- [x] `src/app/profile/page.tsx` 수정
  - 이미지 개별 표시 → 포스트별 그룹화
  - 각 포스트를 하나의 카드로 표시
  - 첫 번째 이미지를 대표 이미지로 사용
  - 여러 이미지가 있을 경우 오른쪽 상단에 개수 표시 (예: 🖼️ 3)
  - 포스트 카드 클릭 시 해당 포스트의 모든 이미지 뷰어로 표시
  - 호버 시 오버레이 효과

**변경 전:**
- 모든 이미지를 개별적으로 펼쳐서 표시
- Post 1 (이미지 3개) + Post 2 (이미지 2개) = 5개 카드

**변경 후:**
- 포스트별로 그룹화해서 표시
- Post 1 (이미지 3개) + Post 2 (이미지 2개) = 2개 카드
- 각 카드에 이미지 개수 표시

### 19차 작업 - 401 에러 시 자동 로그인 페이지 리다이렉트
- [x] `src/lib/api.ts` 수정
  - handleUnauthorized() 메서드 추가
    - sessionStorage 클리어 (accessToken, user)
    - 로그인 페이지로 리다이렉트
  - request() 메서드에 401 에러 체크 추가
    - response.status === 401 시 handleUnauthorized() 호출
  - uploadFile() 메서드에 401 에러 체크 추가
    - response.status === 401 시 handleUnauthorized() 호출
- [x] `src/app/profile/page.tsx` 수정
  - fetchProfile()에 401 에러 처리 추가
    - sessionStorage 클리어
    - 토스트 메시지 표시
    - 로그인 페이지로 리다이렉트
- [x] `src/app/page.tsx` 수정
  - handleUpload()에 401 에러 처리 추가
    - sessionStorage 클리어
    - 토스트 메시지 표시
    - 로그인 페이지로 리다이렉트

**동작 방식:**
1. API 호출 시 401 에러 발생
2. sessionStorage에서 토큰과 유저 정보 제거
3. 에러 메시지 표시 ("인증이 만료되었습니다. 다시 로그인해주세요.")
4. 자동으로 로그인 페이지로 리다이렉트

**적용 위치:**
- GET /post/info (프로필 조회)
- POST /post/upload (이미지 업로드)
- 기타 api.ts를 통한 모든 API 호출

### 20차 작업 - 401 에러 시 토스트 메시지 개선
- [x] `src/lib/api.ts` 수정
  - sonner import 추가
  - handleUnauthorized()에 토스트 메시지 추가
    - "토큰이 만료되었습니다. 다시 로그인해주세요."
  - 토스트 표시 후 100ms 대기 후 리다이렉트 (토스트가 보이도록)
  - 에러 메시지 통일: "인증이 만료" → "토큰이 만료"
- [x] `src/app/profile/page.tsx` 수정
  - 에러 메시지 변경: "토큰이 만료되었습니다. 다시 로그인해주세요."
- [x] `src/app/page.tsx` 수정
  - 에러 메시지 변경: "토큰이 만료되었습니다. 다시 로그인해주세요."
  - 토스트 표시 후 100ms 대기 후 리다이렉트

**개선 사항:**
- 모든 401 에러에서 일관된 토스트 메시지 표시
- 사용자에게 명확한 피드백 제공
- 토스트가 표시될 시간을 주기 위해 setTimeout 사용
- 메시지 통일: "토큰이 만료되었습니다. 다시 로그인해주세요."

---

## 수정/개선 필요
- [x] 회원가입 API 연동
- [x] 토스트 메시지 (sonner)
- [x] 로그인 API 연동
- [x] 인증 상태 관리 (Context API → Cookie → SessionStorage)
- [x] 로그아웃 기능 연동
- [x] 경로 보호 (Middleware → 클라이언트 사이드)
- [x] 이미지 업로드 API 연동
- [x] 이미지 리스트 API 연동
- [x] 커서 기반 페이지네이션
- [x] 이미지 확대 보기
- [x] 상대 시간 표시
- [x] 업로드 총 용량 제한 (50MB)
- [x] 프로필 조회 API 연동
- [ ] 이미지 삭제 기능
- [ ] SEO 메타데이터 설정

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
