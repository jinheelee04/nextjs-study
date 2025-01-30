import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import { ReactNode } from "react";
import style from "./index.module.css";

// 넥스트에서 약속된 함수를 export하면
// ssr 방식으로 렌더링 되도록 설정된다.
// 서버 환경에서만 실행됨, console.log, window 객체 실행 안됨
// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// export const getServerSideProps = async () => {
export const getStaticProps = async () => {
  // await 으로 조회하면 순차적으로(직렬적으로) 조회함
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  // Promise.all을 사용하면 병렬로 동시에 데이터를 조회해 올 수 있다.

  console.log("인덱스 페이지");
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 3, // 3초 주기로 재검증
  };
};
/**
 * module css 를 사용하면 자동으로 유니크한 클래스네임을 만들어준다.
 * 각 페이지에 적용시켜야할 css인 경우 module을 사용해야한다.
 * 충돌이 발생할 수 있기 때문이다.
 *
 * InferGetServerSidePropsType : 타입을 추론해줌
 * @returns
 */
export default function Home({
  allBooks,
  recoBooks,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  // 서버에서 한번, 브라우저에서 한번 총 2번 실행됨
  // window 객체를 그대로 사용하면 오류남
  // window.location;
  // useEffect는 컴포넌트가 마운트된 다음에 실행되기 때문에
  // 브라우저에서만 실행됨으로 window 객체 사용해도 오류가 안남

  // console.log(allBooks);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
