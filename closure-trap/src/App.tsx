import {
  useEffect,
  useState,
  useReducer,
  Reducer,
  useRef,
  useLayoutEffect,
  use,
} from "react";

interface Action {
  type: "add" | "minus";
  num: number;
}
// type Action = {
//   type: "add" | "minus";
//   num: number;
// };

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num;
    case "minus":
      return state - action.num;
  }
}

function App() {
  //  第一种
  //   const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     setInterval(() => {
  //       console.log(count);
  //       setCount((count) => count + 1);
  //     }, 1000);
  //   }, []);

  //   第一种
  //   const [count, dispatch] = useReducer<number, [Action]>(reducer, 0);
  //   useEffect(() => {
  //     console.log(count);
  //     setInterval(() => {
  //       dispatch({ type: "add", num: 1 });
  //     }, 1000);
  //   });

  //   第二种
  //   const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       console.log(count);
  //       setCount(count + 1);
  //     }, 1000);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, [count]);

  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };
  const ref = useRef(updateCount);

  ref.current = updateCount;

  useEffect(() => {
    const timer = setInterval(() => ref.current(), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{count}</div>;
}

export default App;
