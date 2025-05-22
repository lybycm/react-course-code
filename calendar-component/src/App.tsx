import dayjs from "dayjs";

import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar
        // value={dayjs("2023-11-10")}
        defaultValue={dayjs("2023-11-08")}
        locale="zh-CN"
        // dateRender={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "50px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        // dateInnerContent={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "30px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}

        onChange={(date) => {
          alert(date.format("YYYY-MM-DD"));
        }}
      ></Calendar>
    </div>
  );
}

export default App;
