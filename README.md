# introduction

마이크로 프론트엔드 개념을 적용한 예시 프로젝트
Let's see if it works!

## Micro frontend

from [Micro-Frontend Architecture: Setup & Key Concepts Explained](https://youtu.be/OmLsV8Dljzo?si=aVDT2NpCB1Hl2kfo)

### 뭘까

- 브라우저에서 작동하는 마이크로 서비스
- 백엔드 마이크로 서비스처럼 프론트엔드 코드를 다른 코드 베이스로 나눌 수 있음
- 책임을 여러 파트로 나누는 게 마이크로 프론트엔드다

### 왜 써야 될까

- 확장성과 재사용성
  - 하나의 마이크로 서비스가 실패했을 때, 전체 애플리케이션에 다 영향을 주는 게 아님
- 기술적인 유연성
  - 어떤 프레임워크에 종속되지 않음
  - 누구는 리액트 쓰고, 누구는 다른 언어나 다른 프레임워크 쓸 수 있음
- 각자의 CI/CD 파이프라인

### 왜 쓰지 말아야 할까

- 과도한 결합이 복잡성을 증가시킴
- 비용 증가

## 각 서비스 기술스택

### Host A

- Next js 14
- React 18

### Host B

- React 18
- Vite 4

### Module (for Host A, B)

- Next 15
- React 19
