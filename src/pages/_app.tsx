import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
/**
 * 리액트의 App 컴포넌트와 동일한 역활
 * 루트컴포넌트 (모든페이지들의 부모 컴포넌트)
 * Component: page 역할하는 컴포넌트
 * pageProps: component에 전달될 props 들을 모두 객체로 보관
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };
  useEffect(() => {
    // 직접 프리페칭 지정할 경우
    router.prefetch("/test");
  }, []);
  return (
    <>
      <header>
        {/* 프리페칭 pre-fetching
            현재 페이지에서 이동이 가능하 페이지들의 js를 미리 가져온다.
        */}
        <Link href={"/"}>index</Link>&nbsp;
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>&nbsp;
        <div>
          {/* 버튼은 프리페칭 안됨됨 */}
          <button onClick={onClickButton}>/test 페이지 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
