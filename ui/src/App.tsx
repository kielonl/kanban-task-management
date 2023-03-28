import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Root } from "./Views/Root";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Provider store={rootStore}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <div className="App">
            <Root />
          </div>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
