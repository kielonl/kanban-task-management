import "./App.scss";
import { Checkbox } from "./components/Checkbox/Checkbox";

function App() {
  return (
    <div className="App">
      <div className="checkbox-wrapper">
        <Checkbox label="Idle" id="test" isChecked={false} />
        <Checkbox label="Hovered" id="test1" isChecked={false} />
        <Checkbox label="Completed" id="test2" isChecked={true} />
      </div>
    </div>
  );
}

export default App;
