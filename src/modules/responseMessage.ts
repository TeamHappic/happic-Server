const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NOT_FOUND: '존재하지 않는 자원',
  BAD_REQUEST: '잘못된 요청',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
  INVALID_PASSWORD: '비밀번호 오류',

  CREATED_CHAR_SUCCESS: '캐릭터 생성 성공',
  CHANGE_CHARACTER_SUCCESS: '캐릭터 수정 성공',

  //token
  NULL_VALUE_TOKEN: '토큰이 없습니다',
  INVALID_TOKEN: '더 이상 유효하지 않은 토큰입니다',
  VALID_TOKEN: '유효한 토큰입니다',
  CREATE_TOKEN_SUCCESS: '토큰 재발급 성공',
  EXPIRED_TOKEN: '만료된 토큰이므로 재로그인 필요',

  //social
  UNAUTHORIZED_SOCIAL_USER: '유효하지 않은 소셜 유저입니다',

  //auth
  SIGN_IN_SUCCESS: '로그인 성공!',
  SIGN_UP_SUCCESS: '회원가입 성공!',
  REGISTER_FCM_SUCCESS: 'FCM 토큰 등록 성공',

  // 홈화면
  READ_USER_SUCCESS: '홈화면 조회 성공',

  //마이페이지
  GET_HAPPICREPORT_SUCCESS: '해픽레포트 조회 성공',
  GET_ALL_KEYWORD_SUCCESS: '해픽레포트 키워드 전체 순위 조회 성공',
  GET_ALL_KEYWORD_BY_CATEGORY_SUCCESS:
    '해픽레포트 카테고리별 순위 전체 조회 성공',
  GET_MONTHLY_REPORT_SUCCESS: '월별 해픽레포트 조회 성공',

  // 파일
  CREATE_FILE_SUCCESS: '파일 업로드 성공',

  // 하루 해픽
  CREATE_DAILY_SUCCESS: '하루 해픽 생성 성공',
  GET_POSTED_DAILY: '하루해픽 생성 여부 확인 성공',
  GET_TOP9_KEYWORDS_SUCCESS: '하루해픽 최다 키워드 조회 성공',
  READ_ALLDAILY_SUCCESS: '하루해픽 전체 조회 성공',
  GET_ALLTITLE_SUCCESS: '하루제목 전체 조회 성공',
  READ_DAILY_SUCCESS: '하루해픽 상세 조회 성공',
};

export default message;
