import { Html, Head, Main, NextScript } from "next/document";
/**
 * Document 컴포넌트
 * index.html과 비슷한한 역할
 * 모든 페이지에서 공통적으로 적용되어야하는 next.js앱의
 * HTML 코드를 설정하는 컴포넌트
 * ex) 메타태그 설정, 폰트, 캐릭터셋, 구글 애널리틱스 같은 서드 파티 스크립트 등
 * @returns
 */
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
