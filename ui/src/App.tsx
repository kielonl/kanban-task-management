import "./App.scss";
import { TextField } from "./components/TextField/TextField";

function App() {
  return (
    <div className="App">
      <TextField
        value={"value"}
        type="text"
        placeholder="Enter task name"
        error={false}
      />
    </div>
  );
}

export default App;
