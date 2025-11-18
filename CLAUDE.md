# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React 코어 딥다이브 - React 내부 동작 원리와 Fiber 아키텍처를 설명하는 프레젠테이션 프로젝트입니다. Reveal.js 기반으로 24개의 독립적인 HTML 슬라이드를 iframe으로 로드하는 구조입니다.

## Development Commands

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview

# 코드 포맷팅
pnpm format

# 포맷팅 체크
pnpm format:check
```

## Architecture

### 핵심 구조

이 프로젝트는 **하이브리드 아키텍처**를 사용합니다:

1. **메인 프레젠테이션 (Vite 번들링)**
    - `index.html`: Reveal.js 컨테이너 + 24개 슬라이드의 `<section>` 태그
    - `src/presentation.js`: Reveal.js 초기화 및 포커스 관리 로직 (ESM, 번들링됨)
    - `src/reveal-custom.css`: Reveal.js 커스텀 스타일 (번들링됨)

2. **개별 슬라이드 (정적 파일)**
    - `public/contents/1.html ~ 24.html`: 각 슬라이드의 독립적인 HTML
    - `public/css/common-style.css`: 슬라이드 공통 스타일 (반응형 포함)
    - 각 슬라이드는 `../css/common-style.css`를 직접 참조

3. **발표자 노트**
    - `index.html`의 각 `<section>` 내부에 `<aside class="notes">` 태그로 포함
    - Reveal.js의 speaker view (S 키)에서 표시됨

### 왜 이런 구조인가?

- **iframe 사용 이유**: 각 슬라이드의 CSS 애니메이션과 스타일을 100% 격리하여 보존
- **public/ 디렉토리**: Vite는 `public/` 내용을 빌드 시 `dist/`로 그대로 복사
- **상대 경로 사용**: `contents/1.html`, `../css/common-style.css`는 GitHub Pages의 서브디렉토리 배포를 위해 상대 경로 사용

### 빌드 프로세스

```
src/presentation.js + reveal.js
    ↓ (Vite 번들링)
dist/assets/index-[hash].js

public/contents/*.html
    ↓ (복사)
dist/contents/*.html

public/css/common-style.css
    ↓ (복사)
dist/css/common-style.css
```

빌드된 `dist/index.html`의 모든 절대 경로는 `/react-core-deepdive/` prefix가 자동 추가됨 (`vite.config.js`의 `base` 설정).

## 슬라이드 수정 시 주의사항

### 새 슬라이드 추가

1. `public/contents/XX.html` 생성
2. `public/css/common-style.css` 스타일 사용
3. `index.html`에 `<section><iframe src="contents/XX.html"></iframe></section>` 추가
4. 발표자 노트가 필요하면 `<aside class="notes">` 추가

### CSS 수정

- **슬라이드 공통 스타일**: `public/css/common-style.css` 수정
    - 반응형 브레이크포인트: 1024px, 768px, 640px
    - 애니메이션: fadeInUp, slideInLeft, slideInRight, scaleIn
- **Reveal.js 스타일**: `src/reveal-custom.css` 수정

### 포커스 관리

`src/presentation.js`의 포커스 관리 로직은 iframe 클릭 후에도 키보드 단축키가 작동하도록 합니다. 수정 시 `queueMicrotask`와 `requestAnimationFrame` 타이밍에 주의하세요.

## GitHub Pages 배포

- **자동 배포**: `main` 브랜치에 push 시 GitHub Actions로 자동 배포
- **배포 URL**: `https://chan9yu.github.io/react-core-deepdive/`
- **base path**: `vite.config.js`의 `base: "/react-core-deepdive/"` 설정 필수

### 배포 실패 시 체크리스트

1. `public/` 디렉토리에 모든 정적 파일 존재 확인
2. `index.html`의 iframe 경로가 상대 경로(`contents/XX.html`)인지 확인
3. 슬라이드 파일의 CSS 경로가 `../css/common-style.css`인지 확인
4. GitHub 저장소 Settings → Pages에서 Source가 "GitHub Actions"인지 확인

## 환경 요구사항

- Node.js: >= 24.0.0
- pnpm: >= 10.0.0
- 패키지 매니저는 반드시 pnpm 사용 (`pnpm-lock.yaml` 존재)

## 발표 기능

- **화살표 키**: 슬라이드 이동
- **S 키**: 발표자 모드 (노트, 타이머, 다음 슬라이드 미리보기)
- **F 키**: 전체화면
- **ESC**: 슬라이드 개요 보기
