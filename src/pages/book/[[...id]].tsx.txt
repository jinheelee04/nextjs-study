import { useRouter } from "next/router";

/**
 * optional catch all segment 방식
 * catch all segment에 []대괄호로 한번 더 감싸는 경우
 * book/ 뒤에  url parameter가 없더라도 대응할 수 있다.
 * @returns
 */
export default function Page() {
  const router = useRouter();
  const { id } = router.query; // 배열 형태
  console.log(id);
  return <h1>Book... {id}</h1>;
}
