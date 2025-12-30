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
