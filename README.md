<img src = "https://user-images.githubusercontent.com/80062632/178316819-9873c137-bcbc-4162-afae-095e1a8e99ce.png">  <br>

# happic: 해픽

**Be happy, take a happic:**

> **매일의 추억이 나의 행복이 되어, 해픽** <br>
> 저희는 해픽입니다
>
> SOPT 30th APP JAM <br>
> 프로젝트 기간 : 2022.07.02 ~ 2022.07.23

`추후 릴리즈 예정 `


## 주요 기능 소개


![KakaoTalk_20220722_234934351](https://user-images.githubusercontent.com/78267146/180466639-5bf06199-1cb4-461a-bdd3-4f501f183d0f.jpg)

![KakaoTalk_20220722_234934351_01](https://user-images.githubusercontent.com/78267146/180466650-074c26c8-2191-467a-9f3e-a6d483bb800c.jpg)

![KakaoTalk_20220722_234934351_02](https://user-images.githubusercontent.com/78267146/180466658-40c0fe49-2cde-4eb4-bfa3-70eee4b604d5.jpg)

![KakaoTalk_20220722_234934351_03](https://user-images.githubusercontent.com/78267146/180466675-ee5c00e8-78b7-4608-87c9-1006c6dddd42.jpg)


<br>

## Service workflow

![IA-FLOW@3x](https://user-images.githubusercontent.com/80062632/178763859-26283266-06bc-4469-b121-223da1c52b53.png)
<br>

##  Team happic SERVER Developers
 <img src="https://user-images.githubusercontent.com/69195315/178483597-66729963-bffd-423b-8e89-c725ff4174b3.png" width="500"> | <img src="https://user-images.githubusercontent.com/69195315/178483568-97b1c139-84ee-4cef-817b-456d09dc1db6.png" width="500"> | <img src="https://user-images.githubusercontent.com/69195315/178483535-694834b5-ca8f-4386-8b0f-515f9ef84ac1.png" width="500"> |
 :---------:|:----------:|:---------:
 이서우 | 김동재 | 유송경 |
[dltjdn](https://github.com/dltjdn) | [ehdwoKIM](https://github.com/ehdwoKIM) | [ssong915](https://github.com/ssong915) |

<br>

## 🌲 Git Branch Convention

- main: 배포를 위한 브랜치 ( **최종본** )

- develop: 기능 개발이 완료된 코드들이 모이는 곳 ( **검증된 곳이자 검증할 곳** )

- feature: 기능 개발을 위한 브랜치 ( **feature/본인이름/기능명** )


<br/>

## 💌 Commit Convention

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

## ✨ Coding Convention
<details>
<summary> 명명규칙 (Naming Conventions)</summary>
<div markdown="1">
 
1. 이름으로부터 의도가 읽혀질 수 있게 쓴다.   
2. 오브젝트, 함수, 그리고 인스턴스에는 `camelCase`를 사용한다.    
3. 클래스나 constructor에는 `PascalCase`를 사용한다.    
4. 함수 이름은 동사 + 명사 형태로 작성한다.    
    ex) `postUserInformation()`
 5. 약어 사용은 최대한 지양한다.
 6. 이름에 네 단어 이상이 들어가면 팀원과 상의를 거친 후 사용한다.
 7. 데이터베이스 명은 영어 소문자로 구성한다.
</div>
</details>
<details>
<summary> 블록 (Blocks)</summary>
<div markdown="1">

 1. 복수행의 블록에는 중괄호({})를 사용한다.
 2. 복수행 블록의 if 와 else 를 이용하는 경우 else 는 if 블록 끝의 중괄호( } )와 같은 행에 위치시킨다.

</div>
</details>
<details>
<summary> 코멘트 (Comments)</summary>
<div markdown="1">

1. 복수형의 코멘트는 `/** ... */` 를 사용한다.
2. 단일 행의 코멘트에는 `//` 을 사용하고 코멘트를 추가하고 싶은 코드의 상부에 배치한다. 그리고 코멘트의 앞에 빈 행을 넣는다.

</div>
</details>
<details>
<summary> 문자열 (Strings)</summary>
<div markdown="1">

1. 문자열에는 싱크쿼트 `''` 를 사용한다..
2. 프로그램에서 문자열을 생성하는 경우는 문자열 연결이 아닌 `template strings`를 이용한다.

</div>
</details>
<details>
<summary> 함수 (Functions)</summary>
<div markdown="1">

1. 화살표 함수를 사용한다.
 ```javascript
  var arr1 = [1, 2, 3];
  var pow1 = arr.map(function (x) { // ES5 Not Good
    return x * x;
  });

  const arr2 = [1, 2, 3];
  const pow2 = arr.map(x => x * x); // ES6 Good
 ```
2. 비동기 함수 사용 시
 Promise함수의 사용은 지양하고 **async, await** 를 사용하도록 한다.

</div>
</details>
<details>
<summary> 조건식과 등가식 (Comparsion Operators & Equality)</summary>
<div markdown="1">

1. `==`이나 `!=`보다 `===` 와 `!==`을 사용한다.
2. 단축형을 사용한다.
3. 비동기 함수를 사용할 때 `Promise`함수의 사용은 지양하고 `async, await`를 쓰도록 한다.
 
</div>
</details>
<br/>

## 🗂 Project Foldering

```
📦 config                   
 ┗ 📜 index.ts

📦 controllers               
 ┣ 📜 index.ts

📦 interfaces                
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

📦 models                    
 ┣ 📜 Film.ts
 ┣ 📜 Keyword.ts
 ┗ 📜 User.ts

📦 modules
 ┗ 📜 util.ts
 ┗ 📜 statusCode.ts
 ┗ 📜 responseMessage.ts

📦 routes                    
 ┣ 📜 index.ts

📦 services                  
 ┣ 📜 index.ts
```

<br/>

## 🗒 DB Schema
<details>
<summary> Char</summary>
<div markdown="1">

```typescript
const CharSchema = new mongoose.Schema({
  characterId: {
    type: Number,
    required: true,
  },
  characterName: {
    type: String,
    required: true,
  },
});
```

</div>
</details>
<details>
<summary> File</summary>
<div markdown="1">

```typescript
const FileSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동기록
  }
);
```

</div>
</details>
<details>
<summary> User</summary>
<div markdown="1">

```typescript
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  social: {
    type: String,
    required: true,
    unique: true,
  },
  socialId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  characterId: {
    type: Number,
    required: true,
  },
  characterName: {
    type: String,
    required: true,
  },
  growthRate: {
    type: Number,
    required: true,
    default: 0,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  film: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Film',
    },
  ],
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  fcmToken: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});
```

</div>
</details>
<details>
<summary> Film</summary>
<div markdown="1">

```typescript
const FilmSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    photo: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    keyword: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Keyword',
      },
    ],
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동기록
  }
);
```

</div>
</details>
<details>
<summary> Keyword</summary>
<div markdown="1">

```typescript
const KeywordSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동기록
  }
);
```

</div>
</details>


<br/>

## 🛠 API

- [API 명세서](https://www.notion.so/API-7c20c52cd7444e1391762dc8b502fd1a)

<br />

## 🛠 Dependencies module (package.json)
```json
{
  "name": "node-typescript-init",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start:dev": "node dist/index.js",
    "test": "mocha -r ts-node/register src/test/daily.spec.ts"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.1",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/mocha": "^9.1.1",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.7",
    "@types/multer-s3": "^2.7.12",
    "@types/node": "^17.0.25",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.30.5",
    "@typescript-eslint/parser": "^5.30.5",
    "chai": "^4.3.6",
    "eslint": "^8.19.0",
    "mocha": "^10.0.0",
    "nodemon": "^2.0.15",
    "prettier": "^2.7.1",
    "supertest": "^6.2.4",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.3"
  },
  "dependencies": {
    "aws-sdk": "^2.1143.0",
    "axios": "^0.27.2",
    "bcryptjs": "^2.4.3",
    "bucket": "^0.0.1",
    "dayjs": "^1.11.3",
    "dotenv": "^16.0.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "firebase-admin": "^11.0.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.3.1",
    "multer": "^1.4.4",
    "multer-s3": "^2.10.0",
    "node-schedule": "^2.1.0",
    "winston": "^3.8.1"
  }
}

```


<br />

## 🛠 Server Architecture

- 개발 환경 : Typescript, Express(Node.js)
- 데이터베이스 : MongoDB, AWS S3
- 서버 환경 : AWS EC2, PM2
![180420764-1afac15d-1ef5-4c47-b68e-90cb128c3d7c](https://user-images.githubusercontent.com/69195315/180443174-4fd1612f-f095-4a99-a261-86cd0ddac6f4.png)


<br />
 


---

<img src = "https://user-images.githubusercontent.com/80062632/178400592-f38ba33e-d58e-4ecf-9c1a-96fec9f305a6.png" width="100"> 
