import { increment, selectCounter, wrapper } from "@/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TestPage = () => {
  const dispatch = useDispatch();

  const counter = useSelector(selectCounter);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  return (
    <div>
      <h1>
        Test 1: <span style={{ color: "red" }}>{counter}</span>
      </h1>
      <hr />
      <button onClick={() => dispatch(increment())}>increment</button>
      <Link href="/test-2">go to test 2</Link>
    </div>
  );
};

const index = () => <TestPage />;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => (ctx) => {
    return { props: {} };
  }
);

export default index;
