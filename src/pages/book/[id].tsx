import fetchOneBook from "@/lib/fetch-one-book";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import style from "./[id].module.css";
import { useRouter } from "next/router";
// const mockData = {
//   id: 1,
//   title: "한 입 크기로 잘라 먹는 리액트",
//   subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
//   description:
//     "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
//   author: "이정환",
//   publisher: "프로그래밍인사이트",
//   coverImgUrl:
//     "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
// };

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // 파라미터 값들은 반드시 문자열로 설정해야 한다.
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // fallback: false, // 대비책, false: path에 설정되지 않은 값이 넘어왔을 경우 not found 페이지가 렌더링된다.
    // fallback: "blocking", // blocking: 존재하지 않는 경로인 경우 실시간으로 사전 렌더링한다.(Like SSR) 페이지 즉시 생성되어 빌드 폴더에 페이지 생성된다.
    fallback: true, // true: 백엔드에서 불러오는 데이터를 무시하고 컴포넌트가 렌더링하는 레이아웃 정도만 렌더링해주기 위해서 props가 없는 폴백상태의 페이지만 바로 반환한다. 추후에 props를 계산하여 따로 반환한다.
  };
};

// export const getServerSideProps = async (
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩중입니다.";
  if (!book) return "문제가 발생했습니다. 다시 시도하세요";
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
        <Image
          src={coverImgUrl}
          alt={title} // 접근성을 위한 alt 속성 추가
          width={300} // 원하는 너비
          height={350} // 원하는 높이
          // fill // 부모 요소 크기에 맞춤
          priority // LCP 개선 (최적화된 로딩)
          className={style.cover_img}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
