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
