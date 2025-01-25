import { useRouter } from "next/router";

/**
 * catch all segment 방식
 * 경로상에 / 로 구분되는 모든 구간을 대응할 수 있는 페이지
 * ex) /book/123/123/fsdf
 * but, url parameter가 없는 경로는 대응 불가능
 * @returns
 */
export default function Page() {
  const router = useRouter();
  const { id } = router.query; // 배열 형태
  console.log(id);
  return <h1>Book... {id}</h1>;
}
