import "./App.scss";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { DropdownItem } from "./components/Dropdown/DropdownItem";

function App() {
  return (
    <div className="App">
      <Dropdown>
        <DropdownItem name={"opcja1"} />
        <DropdownItem name={"opcja2"} />
        <DropdownItem name={"opcja3"} />
        <DropdownItem name={"opcja4"} />
        <DropdownItem name={"opcja5"} />
      </Dropdown>
    </div>
  );
}

export default App;
