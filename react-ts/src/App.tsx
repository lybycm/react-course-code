interface AaaProps {
  name: string;
  content: React.ReactElement;
}

function Aaa(props: AaaProps) {
  return (
    <div>
      aaa, {props.name}
      {props.content}
    </div>
  );
}

function App() {
  return (
    <div>
      <Aaa name="guang" content={<button>xxxx</button>}></Aaa>
    </div>
  );
}

export default App;
