// import type { ChangeEvent } from "react";
// function App() {
//   function onChange(event: ChangeEvent<HTMLInputElement>) {
//     console.log(event.target.value);
//   }
//   return <input type="text" defaultValue={"guang"} onChange={onChange} />;
// }

// import { useEffect, useRef } from "react";
// function App() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//     setTimeout(() => {
//       console.log(inputRef.current?.value);
//     }, 2000);
//   }, []);
//   return <input type="text" defaultValue={"guang"} ref={inputRef} />;
// }

import type { ChangeEvent } from "react";

import { useState } from "react";

function App() {
  const [value, setValue] = useState("guang");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setValue(event.target.value);
  }

  return <input type="text" value={value} onChange={onChange} />;
}

export default App;
