import style from "./index.module.css";

/**
 * module css 를 사용하면 자동으로 유니크한 클래스네임을 만들어준다.
 * 각 페이지에 적용시켜야할 css인 경우 module을 사용해야한다.
 * 충돌이 발생할 수 있기 때문이다.
 * @returns
 */
export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}
