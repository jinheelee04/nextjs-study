import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
// import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { BookData } from "../../../types";

/**
 * context에는 현재 브라우저로 부터 받은 요청에 대한 모든 정보가 포함되어 있다.
 * @param context
 * @returns
 */
// export const getServerSideProps = async (
//   // GetStaticProps에는 query 매개변수가 없다.
//   // 빌드 타입에 query string 값을 알 수 없기 때문
// export const getStaticProps = async (context: GetStaticProps) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };
export default function Page() {
  // { books,  }: InferGetServerSidePropsType<typeof getServerSideProps>
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const { q } = router.query;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
