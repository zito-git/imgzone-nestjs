# ImgZone Backend

ImgZone의 백엔드 API 서버입니다. NestJS 프레임워크 기반으로 구축되었으며, 이미지 호스팅 서비스를 위한 RESTful API를 제공합니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | NestJS 11 |
| Language | TypeScript 5.7 |
| Database | PostgreSQL + Prisma 7 |
| Authentication | JWT + Passport |
| Queue | BullMQ + Redis |
| File Upload | Multer |
| Security | Helmet, bcrypt |
| Runtime | Node.js 22 |

---

## 프로젝트 구조

```
backend/
├── src/
│   ├── auth/                          # 인증 모듈
│   │   ├── decorator/
│   │   │   ├── public.decorator.ts    # @Public() - 인증 제외
│   │   │   └── roles.decorator.ts     # @Roles() - 역할 기반 접근
│   │   ├── guard/
│   │   │   ├── jwt.auth.guard.ts      # JWT 인증 가드
│   │   │   └── role.guard.ts          # 역할 검증 가드
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts            # 로그인/토큰 발급
│   │   ├── jwt.strategy.ts            # JWT 전략
│   │   └── constants.ts               # JWT 시크릿 설정
│   │
│   ├── domain/
│   │   ├── member/                    # 회원 관리
│   │   │   ├── dto/
│   │   │   │   ├── reqLoginDto.ts     # 로그인 요청
│   │   │   │   └── reqRegisterDto.ts  # 회원가입 요청
│   │   │   ├── member.controller.ts
│   │   │   ├── member.service.ts
│   │   │   └── member.module.ts
│   │   │
│   │   ├── post/                      # 이미지/게시물 관리
│   │   │   ├── service/
│   │   │   │   ├── upload.service.ts  # 이미지 업로드
│   │   │   │   └── get-post.service.ts # 이미지 조회
│   │   │   ├── images-entity-to-dto.ts # Entity → DTO 변환
│   │   │   ├── post.controller.ts
│   │   │   └── post.module.ts
│   │   │
│   │   └── information/               # 사용자 정보 관리
│   │       ├── dto/
│   │       │   └── reqPasswordChangeDto.ts
│   │       ├── info.controller.ts
│   │       ├── info.service.ts
│   │       └── info.module.ts
│   │
│   ├── prisma/                        # 데이터베이스
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   ├── filter/
│   │   └── globalExceptionFilter.ts   # 전역 예외 처리
│   │
│   ├── app.module.ts                  # 루트 모듈
│   ├── app.controller.ts
│   └── main.ts                        # 애플리케이션 진입점
│
├── prisma/
│   └── schema.prisma                  # DB 스키마 정의
│
├── uploads/                           # 업로드된 이미지 저장소
├── .env                               # 환경 변수
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## 설치 및 실행

### 사전 요구사항

- Node.js 22 이상
- PostgreSQL 15 이상
- Redis 7 이상

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# Prisma 클라이언트 생성
npx prisma generate

# 개발 서버 실행 (watch 모드)
npm run start:dev
```

### Docker 실행

```bash
# 이미지 빌드 및 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f
```

---

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
# 데이터베이스 연결
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# JWT 시크릿 (최소 32자 이상 권장)
JWT_SECRET="your-secret-key-here"

# Redis 호스트 (BullMQ 연결용)
MY_URL="localhost"

# 서버 포트 (선택사항, 기본값: 3000)
PORT=3000
```

---

## API 엔드포인트

### 인증 불필요 (Public)

| Method | Endpoint | 설명 | Body |
|--------|----------|------|------|
| `GET` | `/` | 헬스 체크 | - |
| `POST` | `/member/login` | 로그인 | `{ userid, password }` |
| `POST` | `/member/register` | 회원가입 | `{ userid, password, email }` |
| `GET` | `/member/get-post` | 이미지 목록 조회 | Query: `cursor`, `size` |

### 인증 필요 (JWT Required)

| Method | Endpoint | 설명 | Body/Notes |
|--------|----------|------|------------|
| `POST` | `/post/upload` | 이미지 업로드 | FormData: `files[]`, `status` |
| `GET` | `/info/mydata` | 내 정보 조회 | - |
| `POST` | `/info/changePw` | 비밀번호 변경 | `{ password }` |
| `POST` | `/info/changeStatus` | 이미지 공개상태 변경 | `{ postId, status }` |

---

## API 상세 명세

### 1. 로그인

```http
POST /member/login
Content-Type: application/json

{
  "userid": "testuser",
  "password": "password123"
}
```

**성공 응답 (200)**
```json
{
  "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**실패 응답 (401)**
```json
{
  "message": "아이디 또는 비밀번호가 틀렸습니다.",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### 2. 회원가입

```http
POST /member/register
Content-Type: application/json

{
  "userid": "newuser",
  "password": "password123",
  "email": "user@example.com"
}
```

**성공 응답 (201)**
```json
{
  "message": "회원가입이 완료되었습니다."
}
```

### 3. 이미지 목록 조회

```http
GET /member/get-post?cursor=0&size=20
```

**응답 (200)**
```json
{
  "post": [
    {
      "id": "1",
      "userid": "testuser",
      "role": "USER",
      "created": "2025-01-02T12:00:00+09:00",
      "imgList": ["abc-123.webp", "def-456.webp"]
    }
  ],
  "pageInfo": {
    "nextCursor": "20",
    "hasNext": true
  }
}
```

### 4. 이미지 업로드

```http
POST /post/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: [File, File, ...]
status: "true"  // true: 공개, false: 비공개
```

**성공 응답 (201)**
```json
{
  "id": "123",
  "imgList": ["uuid1.jpg", "uuid2.png"],
  "created": "2025-01-02T12:00:00Z"
}
```

### 5. 내 정보 조회

```http
GET /info/mydata
Authorization: Bearer <token>
```

**응답 (200)**
```json
{
  "user": {
    "id": "uuid-string",
    "role": "USER",
    "email": "user@example.com"
  },
  "post": [
    {
      "id": "1",
      "imgList": ["abc-123.webp"],
      "status": true,
      "created": "2025-01-02T12:00:00+09:00"
    }
  ]
}
```

### 6. 이미지 공개상태 변경

```http
POST /info/changeStatus
Authorization: Bearer <token>
Content-Type: application/json

{
  "postId": "123",
  "status": false
}
```

### 7. 비밀번호 변경

```http
POST /info/changePw
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "newpassword123"
}
```

---

## 인증 방식

### JWT 토큰

- **발급**: `/member/login` 성공 시
- **형식**: `Authorization: Bearer <token>`
- **만료 시간**: 120분
- **Payload 구조**:
  ```json
  {
    "id": "user-uuid",
    "role": "USER"
  }
  ```

### 인증 흐름

```
1. POST /member/login
   └─ Request: { userid, password }
   └─ Response: { access_token: "Bearer eyJhbGc..." }

2. 인증이 필요한 API 요청
   └─ Header: Authorization: Bearer eyJhbGc...
   └─ JWT 검증 후 요청 처리
```

### 데코레이터

```typescript
// 인증 제외 (Public API)
@Public()
@Get('get-post')
getPost() { ... }

// 특정 역할만 접근 허용
@Roles('ADMIN')
@Get('admin-only')
adminOnly() { ... }
```

---

## 데이터베이스 스키마

### member (회원)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BigInt | PK, 자동증가 |
| uuid | UUID | 고유 식별자 |
| userid | VARCHAR(50) | 로그인 ID (Unique) |
| password | VARCHAR(300) | bcrypt 암호화 |
| email | VARCHAR(50) | 이메일 |
| role | VARCHAR(10) | 역할 (기본: USER) |
| created | TIMESTAMPTZ | 생성일시 |

### images (이미지)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BigInt | PK, 자동증가 |
| img | VARCHAR[] | 파일명 배열 |
| member_id | BigInt | FK → member.id |
| status | Boolean | 공개(true)/비공개(false) |
| created | TIMESTAMPTZ | 생성일시 |

### ERD

```
┌─────────────────────┐       ┌─────────────────────┐
│       member        │       │       images        │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │───┐   │ id (PK)             │
│ uuid (UNIQUE)       │   │   │ img[]               │
│ userid (UNIQUE)     │   └──→│ member_id (FK)      │
│ password            │       │ status              │
│ email               │       │ created             │
│ role                │       └─────────────────────┘
│ created             │
└─────────────────────┘
```

---

## 파일 업로드

### 설정

| 항목 | 값 |
|------|-----|
| 최대 파일 수 | 10개 |
| 최대 파일 크기 | 50MB |
| 허용 확장자 | `.png`, `.jpg`, `.jpeg`, `.heic`, `.heif` |
| 저장 위치 | `./uploads/` |
| 파일명 규칙 | `{UUID}.{원본확장자}` |

### 요청 예시

```bash
curl -X POST http://localhost:3000/post/upload \
  -H "Authorization: Bearer <token>" \
  -F "files=@image1.jpg" \
  -F "files=@image2.png" \
  -F "status=true"
```

---

## 이미지 변환

업로드된 이미지는 Worker 서비스를 통해 WebP 형식으로 자동 변환됩니다.

### 변환 흐름

```
1. 사용자 → POST /post/upload (원본 파일)
2. Backend → uploads/ 폴더에 저장
3. Backend → BullMQ Queue에 Job 등록
4. Worker → 원본 이미지를 WebP로 변환
5. 조회 시 → .jpg/.png 확장자가 .webp로 자동 변환되어 반환
```

### 공개/비공개 처리

```typescript
// 공개 이미지: 실제 파일명 반환 (확장자 .webp로 변환)
imgList: ["abc-123.webp", "def-456.webp"]

// 비공개 이미지: "private"으로 마스킹
imgList: ["private"]
```

---

## 보안 설정

### 적용된 보안 미들웨어

- **Helmet**: HTTP 보안 헤더 자동 설정
- **bcrypt**: 비밀번호 암호화 (salt rounds: 10)
- **ValidationPipe**: DTO 유효성 검증
- **GlobalExceptionFilter**: 에러 정보 노출 방지

### CORS 설정

```typescript
// main.ts - 현재 설정 (개발용)
app.enableCors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  credentials: true,
});
```

> **주의**: 프로덕션 환경에서는 `origin`을 특정 도메인으로 제한해야 합니다.

---

## 스크립트

```bash
# 개발
npm run start:dev     # 개발 서버 (watch 모드)
npm run start:debug   # 디버그 모드

# 빌드 & 실행
npm run build         # TypeScript 컴파일
npm run start:prod    # 프로덕션 실행

# 테스트
npm run test          # 유닛 테스트
npm run test:watch    # 테스트 watch 모드
npm run test:cov      # 커버리지 리포트
npm run test:e2e      # E2E 테스트

# 코드 품질
npm run lint          # ESLint 검사 및 수정
npm run format        # Prettier 포맷팅

# Prisma
npx prisma generate   # 클라이언트 생성
npx prisma db push    # 스키마 동기화
npx prisma studio     # DB 관리 UI
```

---

## Docker 배포

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]
```

### docker-compose.yml

```yaml
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./uploads:/app/uploads
    networks:
      - app-network
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - MY_URL=${MY_URL}

networks:
  app-network:
    external: true
```

---

## 의존성 상세

### 핵심 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| @nestjs/core | ^11.0.1 | NestJS 프레임워크 |
| @prisma/client | ^7.2.0 | PostgreSQL ORM |
| @nestjs/jwt | ^11.0.2 | JWT 토큰 처리 |
| passport-jwt | ^4.0.1 | JWT 인증 전략 |
| bcrypt | ^6.0.0 | 비밀번호 암호화 |
| bullmq | ^5.66.2 | Redis 작업 큐 |
| helmet | ^8.1.0 | HTTP 보안 헤더 |
| class-validator | ^0.14.3 | DTO 유효성 검증 |

### 개발 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| typescript | ^5.7.3 | TypeScript 컴파일러 |
| jest | ^30.0.0 | 테스트 프레임워크 |
| eslint | ^9.18.0 | 코드 린팅 |
| prettier | ^3.4.2 | 코드 포맷팅 |

---

## 아키텍처

### 전체 시스템 구조

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                    (Next.js - port 4000)                    │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│                   (NestJS - port 3000)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Auth      │  │   Member    │  │    Post     │         │
│  │   Module    │  │   Module    │  │   Module    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                    ┌─────▼─────┐                            │
│                    │  Prisma   │                            │
│                    │  Service  │                            │
│                    └─────┬─────┘                            │
└──────────────────────────┼──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ PostgreSQL  │ │    Redis    │ │   Worker    │
    │             │ │  (BullMQ)   │ │  (Sharp)    │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### 요청 처리 흐름

```
Request → Guard → Controller → Service → Prisma → Database
                                   │
                                   └─→ Queue (BullMQ) → Worker
```

---

## 라이선스

MIT License
