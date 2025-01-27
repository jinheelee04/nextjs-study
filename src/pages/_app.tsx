import { ReactNode } from "react";
import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};
/**
 * 리액트의 App 컴포넌트와 동일한 역활
 * 루트컴포넌트 (모든페이지들의 부모 컴포넌트)
 * Component: page 역할하는 컴포넌트
 * pageProps: component에 전달될 props 들을 모두 객체로 보관
 * @param param0
 * @returns
 */
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
