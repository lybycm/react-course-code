import { Reducer, createContext, memo, useCallback, useReducer } from "react";

interface Data {
  result: number;
}

interface Action {
  type: "add" | "minus";
  num: number;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return {
        result: state.result + action.num,
      };
    case "minus":
      return {
        result: state.result - action.num,
      };
  }
}

function App() {
  // const [res, dispatch] = useReducer<Data, [Action]>(reducer, {
  //   result: 1,
  // });

  const [res, dispatch] = useReducer<Data, string, [Action]>(
    reducer,
    "zero",
    (params) => {
      console.log(params, 1111);

      return {
        result: 1,
      };
    }
  );

  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  );
}

export default App;
