# PM으로 성장하기

프로젝트 효율 높이기 (실전편) - 주니어 PM의 실전 경험 공유 세미나 자료입니다.

## 시작하기

```bash
# 패키지 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 브라우저에서 http://localhost:5173 접속
```

## 주요 내용

프로젝트를 효율적으로 관리하기 위한 6가지 핵심 영역과 실전 개선 사례를 다룹니다:

- **커뮤니케이션 체계화** - 요구사항 명확화 및 리뷰 프로세스
- **이슈 관리 효율화** - 로그 추적 및 이슈 정리 체계
- **시각화 개선** - 이슈 현황 대시보드 구축
- **산출물 관리** - 문서 중앙화 및 정보 통합
- **프로세스 개선** - 운영 지식 문서화
- **향후 계획** - 통합 대시보드 및 자동화 로드맵

## 발표 기능

- **화살표 키**: 슬라이드 이동
- **S 키**: 발표자 모드 (노트, 타이머, 다음 슬라이드 미리보기)
- **F 키**: 전체화면
- **ESC**: 슬라이드 개요 보기

## 프로젝트 구조

```
pm-growth-journey/
├── index.html                   # 메인 프레젠테이션 파일
├── src/
│   ├── presentation.js         # 프레젠테이션 로직
│   └── reveal-custom.css       # Reveal.js 커스텀 스타일
├── public/
│   ├── contents/
│   │   └── 1.html ~ 13.html   # 개별 슬라이드
│   ├── css/
│   │   └── common-style.css   # 슬라이드 공통 스타일
│   └── favicon/
│       └── image.png          # 파비콘
└── docs/
    └── script.md              # 발표 스크립트
```

## 기술 스택

- [Reveal.js](https://revealjs.com/) - 프레젠테이션 프레임워크
- [Vite](https://vitejs.dev/) - 빌드 도구
- [Font Awesome](https://fontawesome.com/) - 아이콘 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Noto Sans KR](https://fonts.google.com/noto/specimen/Noto+Sans+KR) - 한글 폰트

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.