import "./App.scss";
import { Modal } from "./components/Modal/Modal";

function App() {
  return (
    <div className="App">
      <Modal show={true} hide={() => console.log("chowanie")}></Modal>
    </div>
  );
}

export default App;
