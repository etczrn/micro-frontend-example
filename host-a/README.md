# Next 14 data fetching with Prisma

- Next.js 14와 Prisma를 활용하여 데이터 패칭과 폼 업데이트 기능을 구현한 간단한 예제
- GET, UPDATE 만 구현
- Next.js의 React Server Components (RSC), Server Actions, App Router 기반 개발에 익숙해지고자 만듦

## 왜 서버 액션을 사용했나?

- React 18 이후 서버 액션은 클라이언트-서버 간의 경계를 단순화시킴
- 폼 처리에 필요한 API 라우트 없이도 서버에서 직접 비즈니스 로직을 실행하게 해줌
- 이 예제에서는 다음과 같은 이유로 서버 액션을 사용:
  - `react-hook-form`, `useState` 등 클라이언트 상태 관리 없이도 폼 데이터를 다룰 수 있음
  - API 라우트 없이 바로 Prisma로 DB 수정
  - 업데이트 후 `revalidatePath`로 자동 캐시 무효화 및 최신 UI 반영
  - 코드가 명확하고 컴포넌트와 폼 로직이 서로 가까워져 유지보수 용이

## 주요 파일 설명

### `/surveys/page.tsx`

- 설문조사 목록을 서버에서 불러와 렌더링하는 서버 컴포넌트
- `getSurveys` 함수에서 Prisma를 통해 데이터 패칭

### `/surveys/components/card.tsx`

#### `Card`

- `isEditing` 상태에 따라 읽기/수정 UI 토글

#### `EditForm`

- 설문조사 제목과 설명을 수정할 수 있는 폼
- `useFormState` 훅으로 서버 액션을 연결
  - [참고] `useFormState` 훅은 React 19 에서 이름이 [`useActionState`](https://ko.react.dev/reference/react/useActionState) 로 변경되었음
  - 별도의 `onChange` 이벤트 핸들러, `useState` 훅, `react-hook-form` 라이브러리 없이 폼 구현 가능

### `/actions/survey.ts`

- 서버 액션 정의 파일

### `updateSurvey`

- 서버에서 직접 Prisma를 사용해 DB 업데이트
- 완료 후 revalidatePath('/')로 메인 리스트 페이지 캐시 무효화
  - 이게 없으면 사용자가 새로고침해야 변경사항이 반영됨

## 개선할 점

- DB 로직을 서비스/레포지토리 레이어로 분리
  - 예: `getSurveys` 함수를 `/repositories/survey` 로 이동
  - 현재는 예제라 단순하게 페이지 내에서 처리
