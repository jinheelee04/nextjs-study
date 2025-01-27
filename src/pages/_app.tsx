import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
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
  return (
    <>
      <header>
        <Link href={"/"}>index</Link>&nbsp;
        <Link href={"/search"}>search</Link>&nbsp;
        <Link href={"/book/1"}>book/1</Link>&nbsp;
        <div>
          <button onClick={onClickButton}>/test 페이지 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
