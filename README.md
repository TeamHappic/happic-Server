# Happic-Server

- 설계한 Collection (SQL 일 시 ERD 대체)
- 팀 별 역할 분담
- commit, coding convention, branch 전략
- 프로젝트 폴더 구조
- 전체 API 로직 구현 진척도

<br/>

# 🌲 branch 전략

```
💟 main: 배포를 위한 브랜치 (`최최최최종본`)

👾 develop: 기능 개발이 완료된 코드들이 모이는 곳(`검증된 곳이자 검증할 곳`)

🔗feature: 기능 개발을 위한 브랜치 (`feature/자기이름/기능명`)
```

<br/>

# 🗂 프로젝트 폴더 구조

```
📦 config                    // port, mongoURI 등 설정
 ┗ 📜 index.ts

📦 controllers               // service에서 처리된 로직들을 전달 받아 response해줌
 ┣ 📜 index.ts

📦 interfaces                // type interface 정의
 ┗ 📂 film
 ┃ ┗ 📜 FilmInfo.ts
 ┗ 📂 keyword
   ┗ 📜 KeywordInfo.ts
 ┗ 📂 user
   ┗ 📜 UserInfo.ts

📦 loaders
 ┗ 📜 db.ts

📦 middlewares
 ┗ 📜 auth.ts

📦 models                    // mongoose.Schema 정의
 ┣ 📜 Film.ts
 ┣ 📜 Keyword.ts
 ┗ 📜 User.ts

📦 modules
 ┗ 📜 util.ts
 ┗ 📜 statusCode.ts
 ┗ 📜 responseMessage.ts

📦 routes                    // endpoint 정의
 ┣ 📜 index.ts

📦 services                  // 상세 구현, controller로 전달 됨
 ┣ 📜 index.ts
```

<br/>

# 💌 커밋 컨벤션

```
- [ADD] : 새로운 기능 구현
- [FEAT] : ADD 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시
- [CHORE]: 코드 수정, 내부 파일 수정
- [FIX] : 버그, 오류 해결
- [DEL] : 쓸모없는 코드 삭제
- [DOCS] : README나 WIKI 등의 문서 개정
- [MOVE] : 프로젝트 내 파일이나 코드의 이동
- [RENAME] : 파일 이름의 변경
- [STYLE] : 코드가 아닌 스타일 변경을 하는 경우
```

<br/>

# 📄 API

- [API 명세서](https://www.notion.so/API-7c20c52cd7444e1391762dc8b502fd1a)

<br />
