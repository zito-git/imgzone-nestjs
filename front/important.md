1. 로그인페이지, 회원가입페이지, 메인페이지, 메인페이지에 이미지 리스트 보기는 로그인이 없어도(jwt토큰이 없어도) 볼 수 있음
2. 회원가입 설명
   userid: string;

password: string;

email: string;

위의 3가지만 넣음
method = post
json형식으로 전송해야함
주소 : /member/register

3. 로그인 설명
   method = post
   경로 : /member/login

로그인 성공시
{
"access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyMjczOGUxLWVjZmMtNGU3Yi1iZGFmLTc1MmEyNDc0OWJmYiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY3MDk2MTg4LCJleHAiOjE3NjcwOTc5ODh9.vqBNswMSxVYuqvcwdtMTHvrNpxPYG1gqQtv8gs8YjMk"
}
이런식으로 반환함 작업한거 claude.md에 다 리스트업해줘

4. 이미지 업로드하기
   주소 : /post/upload
   method : post
   content-type : multipart/form-data
   파라미터 : files로 올릴수 있음/ 여러개 가능 서버에서는 최대 10개까지 받도록 되어있음
   허용하는 확장자 '.png', '.jpg', '.jpeg', '.heic', '.heif' 업로드되면 메인화면 리로드

5. 메인페이지 이미지 리스트 보기
   {
   "post":[
   {
   "id": "70",
   "userid": "321",
   "role": "USER",
   "created": "2025.12.30 14:19:41",
   "imgList":[
   "c8b8ac2b-07ea-4f98-980b-0040bb2fd5af.webp"
   ]
   },
   {"id": "69", "userid": "321", "role": "USER", "created": "2025.12.30 14:10:41",…},
   {"id": "68", "userid": "321", "role": "USER", "created": "2025.12.30 13:48:35",…}
   ],
   "pageInfo":{
   "nextCursor": null,
   "hasNext": false
   }
   }

위의 형식과 같이 커서기반 조회임.
method : get
주소 : /member/get-post?cursor&size=20
파라미터는 cursor와 size 2개임
더미 데이터 제거하고 위의 작업을 해주고 claude.md에 리스트업 해줘

6. 지금 jwt 토큰이 쿠키에서 관리 되고 있는거 같은데, 이거 지금 세션스토리지에서 관리되게 해주고, 제일중요한게 지금 middleware 보면 공개 경로 이외에는 모든 경로에 헤더에 Authorization 이름으로 토큰을 담아서 해당하는 백엔드 경로에 전송해야함.

7. 업로드 시 파일이 어태치 되면 지금 올라온 이미지들의 총 용량을 알려주면 좋을거같고, 50MB가 넘으면 못 올린다고 띄워주기

8. 프로필 조회하기
   주소 : /post/info
   method : get
   반환값
   {
   "user":{
   "id": "test",
   "role": "USER",
   "email": "tsadf@naver.com"
   },
   "post":[
   {
   "id": "83",
   "imgList":[
   "3252bd6f-4a51-4797-b271-d875be11a31d.png",
   "e315d9a6-adcd-4c5c-b7db-d7257280b594.png"
   ],
   "created": "2025-12-30T16:06:13.720Z"
   },
   {
   "id": "82",
   "imgList":[
   "05496a9a-a36e-43e8-ad97-ec459fc0cc86.png",
   "fdc2d972-8f26-4ee4-b70c-f8117edff1e6.png",
   "e812f6a1-c612-412c-a3a8-928de5b3698f.png"
   ],
   "created": "2025-12-30T15:28:27.597Z"
   }
   ]
   }
9. 프로필에서 정보수정에서 암호변경 기능 넣기.
   주소 : /info/changePw
   method : post
   파라미터 : password
   json 형식
   변경되면 로그아웃시키고 로그인화면으로 리다이렉션

10. 메인페이지에서 로드하는데 만약에
    {
    "post":[
    {
    "id": "98",
    "userid": "test",
    "role": "USER",
    "created": "2026.01.02 07:26:26",
    "imgList":["private"]
    }
    ],
    "pageInfo":{
    "nextCursor": null,
    "hasNext": false
    }
    }
    이미지 리스트에 private가 있으면 이거 비밀글이기 떄문에 private라고 깔끔하게 꾸미기.

11. 프로필 조회에 공개랑 비공개가 뭔지 알 수 있게 사진위에 작게 아이콘같은거 넣어주고 공개 비공개 둘의 변동이 용이하도록 한번 고쳐줄래
    조회 페이지 들어가면
    {
    "user": {
    "id": "a123",
    "role": "USER",
    "email": "a123@naver.com"
    },
    "post": [
    {
    "id": "103",
    "imgList": [
    "8846e45d-3911-463e-9c0e-d8fc7d72a6ff.webp"
    ],
    "status": true,
    "created": "2026-01-01T14:44:01.745Z"
    },
    {
    "id": "102",
    "imgList": [
    "c368c53f-97b0-4b71-8c36-26105d040e25.webp"
    ],
    "status": false,
    "created": "2026-01-01T14:43:01.472Z"
    },
    {
    "id": "101",
    "imgList": [
    "f0c1ce6d-7415-42bf-8b06-ebe07531058f.webp"
    ],
    "status": false,
    "created": "2026-01-01T14:38:10.385Z"
    },
    {
    "id": "100",
    "imgList": [
    "c27c5f10-c64c-445f-93c9-77019ae6c8ec.webp"
    ],
    "status": false,
    "created": "2026-01-01T14:36:02.608Z"
    },
    {
    "id": "99",
    "imgList": [
    "be8c679d-aa6c-474d-9b2b-077c15822bed.webp"
    ],
    "status": false,
    "created": "2026-01-01T14:35:56.640Z"
    }
    ]
    }
    이렇게 떠
